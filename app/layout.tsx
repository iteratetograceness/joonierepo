import { Analytics } from '@vercel/analytics/react';
import type { Metadata, Viewport } from 'next';
import { Figtree } from 'next/font/google';
import { ViewTransition } from 'react';
import { Footer } from '~/components/footer';
import { Navigation } from '~/components/navigation';
import './globals.css';

const figtree = Figtree({
	subsets: ['latin'],
	display: 'swap',
	preload: true
});

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
	return (
		<html lang='en' className={figtree.className}>
			<body className='p-7 min-h-screen flex flex-col antialiased'>
				<Navigation />
				<ViewTransition name='crossfade'>{children}</ViewTransition>
				<Footer />
				<Analytics />
			</body>
		</html>
	);
}
