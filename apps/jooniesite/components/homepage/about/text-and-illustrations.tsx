'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import useMediaQuery from '~/utils/use-media-query';
import styles from './index.module.css';

const MARKDOWN = [
	'**Product** engineer. **NYU** Gallatin Graduate. Building a more **accessible** web. Currently on the Growth team at **Vercel**. Crafting data-based experiments & features to drive revenue and retention. Previously on the desktop and web app teams at **NZXT**.',
	'Portrait **photography** hobbyist. Sporadic **doodler**. Dog mom to Cooper the Cockapoo. Former North Carolinian living in New Jersey.',
	`**${new Date().getFullYear()}**`
];

const ILLUSTRATIONS = [
	{ src: '/vercel_growth_team.svg', alt: '' },
	{ src: '/nzxt_ecommerce.svg', alt: '' },
	{ src: '/doodling_with_cooper.svg', alt: '' }
];

export function TextAndIllustrations() {
	const isSmallerViewport = useMediaQuery('(max-width: 52rem)');

	const container = {
		hide: { opacity: 0 },
		enter: {
			opacity: 1,
			transition: { staggerChildren: 0.25, delayChildren: 0.5 }
		}
	};

	const markdown = {
		hide: { x: -30, opacity: 0 },
		enter: {
			x: 0,
			opacity: 1,
			transition: { duration: 0.5, ease: 'easeInOut' }
		}
	};

	const svg = {
		hide: { opacity: 0 },
		enter: {
			opacity: 1,
			transition: {
				duration: 0.7,
				ease: 'easeInOut'
			}
		}
	};

	const containerAttributes = isSmallerViewport
		? { initial: { opacity: 1 } }
		: {
				variants: container,
				initial: 'hide',
				whileInView: 'enter',
				viewport: { once: true }
		  };

	const childAttributes = isSmallerViewport
		? {
				initial: 'hide',
				whileInView: 'enter',
				transition: { duration: 1 },
				viewport: { once: true }
		  }
		: null;

	return (
		<motion.div {...containerAttributes} className={styles.grid}>
			{MARKDOWN.map((text, i) => (
				<motion.div {...childAttributes} key={`${text}-${i}`} variants={markdown}>
					<ReactMarkdown>{text}</ReactMarkdown>
				</motion.div>
			))}
			{ILLUSTRATIONS.map(({ src, alt }, i) => (
				<motion.div
					{...childAttributes}
					key={`${src}-${i}`}
					className={styles['image-container']}
					style={{ gridArea: `image-${i + 1}` }}
					variants={svg}
				>
					<div className={styles['inner-image-container']}>
						<Image src={src} alt={alt} fill />
					</div>
				</motion.div>
			))}
		</motion.div>
	);
}
