'use client';

import Link from 'next/link';
import { Logo } from './logo';

export function Navigation() {
	return (
		<nav className='flex items-center gap-5'>
			<Link href='/'>
				<Logo />
			</Link>
			<Link href='/notes'>notes</Link>
			<Link href='/projects'>projects</Link>
		</nav>
	);
}
