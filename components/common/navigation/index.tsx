'use client';

import Image from 'next/image';
import Link from 'next/link';

export function Navigation() {
	return (
		<nav className='flex items-center gap-5' style={{ backgroundColor: 'var(--pale-pink)' }}>
			<Link href='/' style={{ color: 'var(--red)' }}>
				<Image
					src='/logo.svg'
					style={{ color: 'var(--red)' }}
					alt='Jueun Grace Yun'
					width={150}
					height={150}
				/>
			</Link>
			<Link href='/notes'>notes</Link>
			<Link href='/projects'>projects</Link>
		</nav>
	);
}
