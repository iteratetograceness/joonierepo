import Link from 'next/link';
import { SOCIALS } from '~/constants';

export function Footer() {
	return (
		<footer className='flex justify-center gap-4 mt-auto pt-4 text-sm opacity-60'>
			{SOCIALS.map(({ name, href }) => (
				<Link key={href} href={href}>
					{name}
				</Link>
			))}
		</footer>
	);
}
