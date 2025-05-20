'use client';

import { Analytics } from '@vercel/analytics/react';
import { Figtree } from 'next/font/google';
import { unstable_ViewTransition as ViewTransition } from 'react';
import { Footer } from '~/components/common/footer';
import { Navigation } from '~/components/common/navigation';
import './globals.css';

const figtree = Figtree({
	subsets: ['latin'],
	display: 'swap',
	preload: true
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en' className={figtree.className}>
			<body className='p-7 min-h-screen flex flex-col'>
				<Navigation />
				<ViewTransition>{children}</ViewTransition>
				<Footer />
				<Analytics />
			</body>
		</html>
	);
}
