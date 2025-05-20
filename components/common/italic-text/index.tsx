'use client';

import { useMemo } from 'react';

interface Props {
	text: string;
	italics?: number[];
}

export function ItalicText({ text, italics = [] }: Props) {
	const hasItalics = useMemo(() => italics.length > 0, [italics]);

	return (
		<>
			{Array.from(text).map((char, i) => {
				if (hasItalics && italics.includes(i)) {
					return <em key={`${char}-${i}`}>{char}</em>;
				} else return char;
			})}
		</>
	);
}
