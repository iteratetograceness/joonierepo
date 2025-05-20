'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface Props {
	children: ReactNode | ReactNode[];
}

export function PageWrapper({ children }: Props) {
	const pathname = usePathname();

	return (
		<AnimatePresence>
			<motion.div
				key={pathname}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.25, delay: 0.1 }}
			>
				{children}
			</motion.div>
		</AnimatePresence>
	);
}
