#!/usr/bin/env python3
"""Subset and split Figtree into a preloaded core file and a lazy extended file.

Run by hand (it is not part of `next build`), then commit what it writes:

    python3 -m venv .venv-fonts && .venv-fonts/bin/pip install -r scripts/fonts/requirements.txt
    .venv-fonts/bin/python scripts/fonts/subset_figtree.py

See scripts/fonts/README.md for when it needs rerunning.

Outputs (all generated, do not edit by hand):
  public/fonts/figtree-core.<hash>.woff2   preloaded on every page
  public/fonts/figtree-ext.<hash>.woff2    behind unicode-range, fetched only when a page needs it
  app/fonts/figtree.css                    @font-face rules + the .figtree class
  app/fonts/figtree.ts                     URL of the core file, for the preload link
"""

from __future__ import annotations

import argparse
import hashlib
import io
import re
import sys
import unicodedata
from pathlib import Path

import uharfbuzz as hb
from fontTools import subset
from fontTools.pens.recordingPen import RecordingPen
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / 'scripts/fonts/source/Figtree[wght].ttf'
LICENSE = ROOT / 'scripts/fonts/source/OFL.txt'
# google/fonts ofl/figtree/Figtree[wght].ttf (upstream erikdkennedy/figtree@032dfa7).
# Its outlines, metrics and kerning match what next/font/google served before this change.
SOURCE_SHA256 = '26ad3db9b31ff7dde67a91ff515d022d2f495cd506590699cf264f0bfe6fb714'

FONT_DIR = ROOT / 'public/fonts'
CSS_OUT = ROOT / 'app/fonts/figtree.css'
TS_OUT = ROOT / 'app/fonts/figtree.ts'

# Where the site's text lives. Every non-ASCII character in these files is kept.
CONTENT_GLOBS = ['app/**/*.mdx', 'app/**/*.md', 'app/**/*.tsx', 'components/**/*.tsx', '*.ts', '*.tsx']

# Weights the site renders in Figtree, from computed styles on every page:
#   100 font-thin (the "+" in VercelLogo; clamps to the font's 300 minimum)
#   400 body, 500 h2 (font-medium), 600 h1 / strong (font-semibold), 700 font-bold logos.
# Italic is synthesized from the upright face (no italic file is loaded), at any of these weights.
WGHT_USED = (300, 700)
# The source axis. Limiting it to WGHT_USED (--limit-wght) saves bytes but is not lossless:
# Figtree only has masters at 300 and 900, so the instancer has to store a new 700 master
# with integer coordinates, which moves outlines by up to ~0.4 units and some advances by 1.
WGHT_FULL = (300, 900)

# OpenType features browsers turn on by default (ccmp, kern, mark, mkmk, rvrn), plus tnum,
# which Chrome's UA stylesheet sets on every list ::marker. rvrn swaps the dollar sign
# for its heavy form from about wght 590 up. Nothing on the site enables frac, numr,
# dnom, pnum, case, ordn, sinf, subs, sups, ss01, ss02 or aalt, and locl only applies
# to tr/az/ca/nl/ro/... text while the site is lang="en".
FEATURES = ['ccmp', 'kern', 'mark', 'mkmk', 'rvrn', 'tnum']

ASCII = set(range(0x20, 0x7F))
LATIN1 = set(range(0xA0, 0x100))
LATIN_EXT_A = set(range(0x100, 0x180))
# Punctuation most pages use: curly quotes, en/em dash, ellipsis, and the list bullet
# (U+2022, drawn by ::marker in Figtree on every page with a <ul>).
CORE_PUNCTUATION = {0x2013, 0x2014, 0x2018, 0x2019, 0x201C, 0x201D, 0x2026, 0x2022}
# Latin-1 letters and the three Latin Extended-A characters (ı Œ œ) that Google's "latin"
# file served alongside ASCII. Kerning only applies between glyphs in the same file, so
# keeping them in the core keeps kerning next to accented letters exactly as before.
BASELINE_LATIN_EXTRAS = LATIN1 | {0x131, 0x152, 0x153}
# Combining macron and diaeresis, also in Google's "latin" file. When a macron letter or Ÿ
# (Ā ā Ē ē Ī ī Ō ō Ū ū Ÿ) shares a text run with core characters, Chrome shapes it with the
# core file, which composes it from base letter + mark instead of using the precomposed
# glyph from the extended file (see the face order in main()). Without these two marks
# those letters would switch to the precomposed glyph, whose macron sits slightly differently.
BASELINE_COMBINING = {0x304, 0x308}

# "Figtree Fallback" exactly as next/font/google generated it, so the swap period looks the same.
FALLBACK_FACE = (
	'@font-face {\n'
	"\tfont-family: 'Figtree Fallback';\n"
	"\tsrc: local('Arial');\n"
	'\tascent-override: 94.32%;\n'
	'\tdescent-override: 24.82%;\n'
	'\tline-gap-override: 0%;\n'
	'\tsize-adjust: 100.72%;\n'
	'}\n'
)


def content_codepoints() -> set[int]:
	used: set[int] = set()
	for pattern in CONTENT_GLOBS:
		for path in ROOT.glob(pattern):
			if 'node_modules' in path.parts or '.next' in path.parts:
				continue
			used.update(ord(ch) for ch in path.read_text(encoding='utf-8'))
	return {cp for cp in used if cp >= 0x20}


def check_reserved_font_name(font: TTFont) -> None:
	"""OFL fonts with a Reserved Font Name must be renamed once modified. Figtree declares none."""
	header = LICENSE.read_text(encoding='utf-8').split('This Font Software is licensed', 1)[0]
	copyright_name = font['name'].getDebugName(0) or ''
	if re.search(r'reserved\s+font\s+name', header + copyright_name, re.I):
		sys.exit(
			'The license declares a Reserved Font Name. Subsetting counts as modifying the font, so '
			'rename the family in the name table (IDs 1, 3, 4, 6, 16, 17, 25) before shipping it.'
		)


def unicode_range(cps: set[int]) -> str:
	ranges, run = [], []
	for cp in sorted(cps):
		if run and cp == run[-1] + 1:
			run.append(cp)
			continue
		if run:
			ranges.append(run)
		run = [cp]
	ranges.append(run)
	return ', '.join(
		f'U+{r[0]:X}' if len(r) == 1 else f'U+{r[0]:X}-{r[-1]:X}' for r in ranges
	)


def build(instanced: bytes, cps: set[int]) -> bytes:
	opts = subset.Options()
	opts.flavor = 'woff2'
	opts.layout_features = FEATURES
	opts.hinting = False  # drops prep/fpgm/cvt and glyph programs
	opts.glyph_names = False
	# Family/style names plus copyright, license and license URL (IDs 0, 13, 14) as the OFL asks.
	# The subsetter also keeps any name IDs that fvar instances reference.
	opts.name_IDs = [0, 1, 2, 3, 4, 5, 6, 13, 14]
	# Options.drop_tables is a shared class-level list, so assign instead of using +=.
	opts.drop_tables = opts.drop_tables + ['STAT']  # style metadata only; browsers do not read it
	font = TTFont(io.BytesIO(instanced))
	sub = subset.Subsetter(opts)
	sub.populate(unicodes=cps)
	sub.subset(font)
	out = io.BytesIO()
	font.flavor = 'woff2'
	# fontTools stamps head.modified with the current time on save, which changes the bytes
	# (and the hashed filename) on every run. Keep the source's timestamp so reruns are stable.
	font.recalcTimestamp = False
	font.save(out)
	return out.getvalue()


class Shaper:
	def __init__(self, blob: bytes, wght: int):
		self.font = hb.Font(hb.Face(blob))
		self.font.set_variations({'wght': wght})
		self.outlines: dict[int, tuple] = {}

	def outline(self, gid: int) -> tuple:
		if gid not in self.outlines:
			pen = RecordingPen()
			self.font.draw_glyph_with_pen(gid, pen)
			self.outlines[gid] = tuple(pen.value)
		return self.outlines[gid]

	def __call__(self, text: str) -> list[tuple]:
		buf = hb.Buffer()
		buf.add_str(text)
		buf.guess_segment_properties()
		hb.shape(self.font, buf, {})
		return [
			(self.outline(i.codepoint), p.x_advance, p.y_advance, p.x_offset, p.y_offset)
			for i, p in zip(buf.glyph_infos, buf.glyph_positions)
		]


def verify(name: str, blob: bytes, source_ttf: bytes, cps: set[int], wght_range: tuple[int, int]) -> None:
	"""Font tools have quirks; check the shipped file instead of trusting the options."""
	font = TTFont(io.BytesIO(blob))
	got = set(font.getBestCmap())
	assert got == cps, f'{name}: cmap differs from requested set: {sorted(got ^ cps)}'
	axes = {a.axisTag: (a.minValue, a.maxValue) for a in font['fvar'].axes}
	assert axes == {'wght': wght_range}, f'{name}: unexpected axes {axes}'
	name_ids = {r.nameID for r in font['name'].names}
	for inst in font['fvar'].instances:
		assert inst.subfamilyNameID in name_ids, f'{name}: fvar instance name {inst.subfamilyNameID} dropped'
	for table in ('fpgm', 'prep', 'cvt ', 'cvar', 'hdmx', 'VDMX', 'LTSH'):
		assert table not in font, f'{name}: hinting table {table!r} survived'
	glyf = font['glyf']
	assert not any(getattr(glyf[g], 'program', None) and glyf[g].program.getBytecode() for g in glyf.keys()), \
		f'{name}: glyph instructions survived'
	for tag in ('GSUB', 'GPOS'):
		if tag in font:
			feats = {r.FeatureTag for r in font[tag].table.FeatureList.FeatureRecord}
			assert feats <= set(FEATURES), f'{name}: unexpected {tag} features {feats - set(FEATURES)}'
	src, dst = TTFont(io.BytesIO(source_ttf)), font
	for t, attrs in {'hhea': ('ascent', 'descent', 'lineGap'), 'OS/2': ('sTypoAscender', 'sTypoDescender', 'sTypoLineGap', 'usWinAscent', 'usWinDescent', 'fsSelection'), 'head': ('unitsPerEm',)}.items():
		for a in attrs:
			assert getattr(src[t], a) == getattr(dst[t], a), f'{name}: {t}.{a} changed'
	assert dst['name'].getDebugName(1) == src['name'].getDebugName(1), f'{name}: family name changed'

	# Every character and every pair of characters within the file must shape to the same
	# outlines and positions as the full source font, across the axis (590 is where
	# rvrn swaps the dollar sign). With --limit-wght this is expected to fail; see WGHT_FULL.
	woff = TTFont(io.BytesIO(blob))
	woff.flavor = None
	plain = io.BytesIO()
	woff.save(plain)
	plain_blob = plain.getvalue()
	chars = [chr(cp) for cp in sorted(cps)]
	for wght in (300, 400, 500, 590, 600, 700, 900):
		ours, theirs = Shaper(plain_blob, wght), Shaper(source_ttf, wght)
		for a in chars:
			for b in chars:
				composed = unicodedata.normalize('NFC', a + b)
				if len(composed) == 1 and ord(composed) not in cps:
					continue  # e.g. A + U+0304: drawn as letter + mark here, as Google's file did
				if ours(a + b) != theirs(a + b):
					raise AssertionError(f'{name}: {a!r}{b!r} shapes differently at wght {wght}')


def main() -> None:
	parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
	parser.add_argument(
		'--minimal-core', action='store_true',
		help='Core = ASCII + punctuation only; Latin-1 moves to the extended file. Smaller preload, '
		'but kerning between ASCII and accented Latin-1 letters is lost (a visible change).'
	)
	parser.add_argument(
		'--limit-wght', action='store_true',
		help=f'Cut the weight axis to {WGHT_USED[0]}-{WGHT_USED[1]}. Smaller files, but outlines and '
		'some advances shift slightly (a sub-pixel visible change).'
	)
	parser.add_argument('--skip-verify', action='store_true', help='Skip the slow pair-shaping check.')
	args = parser.parse_args()

	source_ttf = SOURCE.read_bytes()
	digest = hashlib.sha256(source_ttf).hexdigest()
	if digest != SOURCE_SHA256:
		print(f'note: source font changed (sha256 {digest}); re-check the pixel diffs before shipping.')
	source = TTFont(io.BytesIO(source_ttf))
	check_reserved_font_name(source)
	available = set(source.getBestCmap())

	used = content_codepoints()
	missing = sorted(cp for cp in used if cp not in available and cp > 0x7E)
	if missing:
		print('Not in Figtree, rendered by system fonts as today:', ' '.join(f'U+{cp:04X}' for cp in missing))

	wanted = (ASCII | LATIN1 | LATIN_EXT_A | CORE_PUNCTUATION | used) & available
	if not args.minimal_core:
		wanted |= BASELINE_COMBINING & available
	core_set = ASCII | CORE_PUNCTUATION
	if not args.minimal_core:
		core_set |= BASELINE_LATIN_EXTRAS | BASELINE_COMBINING
	core = wanted & core_set
	ext = wanted - core

	wght_range = WGHT_FULL
	instanced_ttf = source_ttf
	if args.limit_wght:
		wght_range = WGHT_USED
		instanced = TTFont(io.BytesIO(source_ttf))
		instantiateVariableFont(instanced, {'wght': WGHT_USED}, inplace=True)
		buf = io.BytesIO()
		instanced.save(buf)
		instanced_ttf = buf.getvalue()

	FONT_DIR.mkdir(parents=True, exist_ok=True)
	for old in FONT_DIR.glob('figtree-*.woff2'):
		old.unlink()

	faces, urls = [], {}
	for name, cps in (('core', core), ('ext', ext)):
		blob = build(instanced_ttf, cps)
		if not (args.skip_verify or args.limit_wght):
			verify(name, blob, source_ttf, cps, wght_range)
		filename = f'figtree-{name}.{hashlib.sha256(blob).hexdigest()[:10]}.woff2'
		(FONT_DIR / filename).write_bytes(blob)
		urls[name] = f'/fonts/{filename}'
		glyphs = TTFont(io.BytesIO(blob))['maxp'].numGlyphs
		print(f'{filename}: {len(blob)} bytes, {len(cps)} characters, {glyphs} glyphs')
		faces.append(
			'@font-face {\n'
			"\tfont-family: 'Figtree';\n"
			'\tfont-style: normal;\n'
			f'\tfont-weight: {wght_range[0]} {wght_range[1]};\n'
			'\tfont-display: swap;\n'
			f"\tsrc: url('{urls[name]}') format('woff2');\n"
			f'\tunicode-range: {unicode_range(cps)};\n'
			'}\n'
		)

	# Declare the extended face first, as next/font did. Chrome tries the last-declared face first
	# when shaping a run, so mixed runs like "Ōsaka" go to the core file and compose Ō from
	# O + U+0304 exactly as before; declaring core first would switch them to the precomposed Ō.
	faces.reverse()
	header = '/* Generated by scripts/fonts/subset_figtree.py. Do not edit; rerun the script. */\n'
	CSS_OUT.parent.mkdir(parents=True, exist_ok=True)
	CSS_OUT.write_text(
		header + '\n' + '\n'.join(faces) + '\n' + FALLBACK_FACE + '\n'
		".figtree {\n\tfont-family: 'Figtree', 'Figtree Fallback';\n\tfont-style: normal;\n}\n"
	)
	TS_OUT.write_text(
		'// Generated by scripts/fonts/subset_figtree.py. Do not edit; rerun the script.\n'
		f"export const figtreeCoreUrl = '{urls['core']}';\n"
	)
	print(f'wrote {CSS_OUT.relative_to(ROOT)} and {TS_OUT.relative_to(ROOT)}')


if __name__ == '__main__':
	main()
