import Link from 'next/link';
import { SOCIALS } from '~/constants';

export function Footer() {
	return (
		<footer className='flex justify-center gap-2 mt-auto pt-4 text-xs'>
			{SOCIALS.map(({ name, href }) => (
				<Link key={href} href={href}>
					{name}
				</Link>
			))}
		</footer>
	);
}
