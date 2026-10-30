import { Analytics } from '@vercel/analytics/react';
import type { Metadata, Viewport } from 'next';
import { ViewTransition } from 'react';
import { preload } from 'react-dom';
import { Footer } from '~/components/footer';
import { Navigation } from '~/components/navigation';
import { figtreeCoreUrl } from './fonts/figtree';
import './fonts/figtree.css';
import './globals.css';

const description =
	'Personal site of Jueun Grace Yun, an engineer at Anthropic. Notes and projects on software, AI, and developer tooling.';

export const metadata: Metadata = {
	metadataBase: new URL('https://joonie.dev'),
	title: {
		default: 'Jueun Grace Yun',
		template: '%s · Jueun Grace Yun'
	},
	description,
	alternates: {
		canonical: '/'
	},
	openGraph: {
		type: 'website',
		siteName: 'Jueun Grace Yun',
		title: 'Jueun Grace Yun',
		description,
		url: '/'
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Jueun Grace Yun',
		description,
		creator: '@jueungraceyun'
	},
	robots: {
		index: true,
		follow: true
	}
};

export const viewport: Viewport = {
	themeColor: '#fcfcfc'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	// Only the core subset is preloaded; the extended file loads via unicode-range when a page needs it.
	preload(figtreeCoreUrl, { as: 'font', type: 'font/woff2', crossOrigin: '' });

	return (
		<html lang='en' className='figtree'>
			<body className='p-7 min-h-screen flex flex-col antialiased'>
				<Navigation />
				<ViewTransition name='crossfade'>{children}</ViewTransition>
				<Footer />
				<Analytics />
			</body>
		</html>
	);
}
