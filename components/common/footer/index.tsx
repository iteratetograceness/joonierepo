'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Sparkle from '../../../icons/sparkle';
import Squiggle from '../../../icons/squiggle';
import inter from '../../../utils/inter';
import { Gradients } from '../gradients';
import Text from '../text';
import styles from './index.module.css';

const LINKS = [
  { label: 'LinkedIn', href: '' },
  { label: 'GitHub', href: '' },
  { label: 'Twitter', href: '' },
  { label: 'Instagram', href: '' },
];

export default function Footer() {
  const [animate, setAnimate] = useState(false);

  return (
    <footer className={`${styles.footer} ${inter.className}`}>
      <Gradients className={styles.gradients} />
      <Text content='Contact Me' heading />
      <a href='mailto:hello@joonie.dev'>hello@joonie.dev</a>
      <div className={styles.links}>
        {LINKS.map(({ label, href }) => {
          return (
            <a key={href} href={href}>
              {label}
            </a>
          );
        })}
      </div>
      <motion.div onViewportEnter={() => setAnimate(true)}>
        <Squiggle animate={animate} />
      </motion.div>
      <Text content='©2022' />
      <Sparkle />
      <Text content='JUEUNGRACEYUN' />
    </footer>
  );
}
