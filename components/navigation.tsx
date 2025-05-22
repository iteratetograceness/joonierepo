'use client';

import Link from 'next/link';
import { Logo } from './logo';

export function Navigation() {
	return (
		<nav className='flex items-center gap-7'>
			<Link href='/'>
				<Logo />
			</Link>
			<Link href='/notes' className='opacity-75'>
				notes
			</Link>
			<Link href='/projects' className='opacity-75'>
				projects
			</Link>
		</nav>
	);
}
