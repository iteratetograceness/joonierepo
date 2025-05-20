'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ForwardedRef, forwardRef, MouseEventHandler } from 'react';
import { OPACITY_VARIANTS } from '~/utils/animations';
import styles from './index.module.css';

interface Props {
	label: string;
	href: string;
	italics?: number[];
	onClick?: MouseEventHandler;
}

export const MenuLink = forwardRef(function MenuLink(
	{ label, href, italics, onClick }: Props,
	ref: ForwardedRef<HTMLAnchorElement>
) {
	const pathname = usePathname();
	const italicIndexes = new Set(italics);

	return (
		<Link onClick={onClick} href={href} ref={ref}>
			{Array.from(label.toUpperCase()).map((char, index) => {
				if (italicIndexes.has(index)) {
					return (
						<em key={`${char}${index}`} className={styles.char}>
							{char}
						</em>
					);
				} else {
					return (
						<span key={`${char}${index}`} className={styles.char}>
							{char}
						</span>
					);
				}
			})}
			{pathname === href ? (
				<motion.span variants={OPACITY_VARIANTS} className={styles.char}>
					*
				</motion.span>
			) : null}
		</Link>
	);
});
