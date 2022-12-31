'use client';

import { motion, useAnimation, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import PaperAirplane from '../../../icons/paper-airplane';
import Sparkle from '../../../icons/sparkle';
import Squiggle from '../../../icons/squiggle';
import inter from '../../../utils/inter';
import { Gradients } from '../gradients';
import Text from '../text';
import styles from './index.module.css';

const LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/gracejueunyun/' },
  { label: 'GitHub', href: 'https://github.com/jueungrace' },
  { label: 'Twitter', href: 'https://twitter.com/jueungraceyun' },
  { label: 'Instagram', href: 'https://www.instagram.com/jueungraceyun/' },
];

const COLORS = {
  blue: { y: 0, x: -250, width: 950, zIndex: -4, hex: '#9CABD2' },
  pink: { y: 240, x: 100, width: 450, zIndex: -1, hex: '#F5ACA8' },
  orange: { y: 150, x: 300, width: 500, zIndex: -2, hex: '#E5954E' },
  yellow: { y: 70, x: 200, width: 900, zIndex: -3, hex: '#F4BB65CC' },
};

export default function Footer() {
  const prefersReducedMotion = useReducedMotion();
  const [animate, setAnimate] = useState(false);

  // Opacity Animation
  const opacityVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.5, delayChildren: 0.5 } },
  };

  // Paper Airplane Animation
  const paperAirplaneControls = useAnimation();
  const paperAirplaneVariants = {
    initial: { rotate: 0, transition: { duration: 0.3 } },
    hover: {
      x: [-2, 2, 0],
      y: [2, -2, 0],
      transition: { duration: 0.5, times: [0.1, 0.7, 1] },
    },
  };

  // Link Animations
  const linksContainerVariants = {
    show: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };
  const linkVariants = {
    show: { opacity: [0, 1], x: [10, 0], transition: { duration: 0.6 } },
  };

  return (
    <motion.footer
      initial='hidden'
      animate='show'
      variants={opacityVariants}
      className={`${styles.footer} ${inter.className}`}
    >
      <Gradients colors={COLORS} className={styles.gradients} opacity={1} />
      <Text content='Contact Me' heading />
      {/* Email */}
      <motion.a
        onHoverStart={() => {
          if (!prefersReducedMotion) {
            paperAirplaneControls.start('hover');
          }
        }}
        onHoverEnd={() => {
          if (!prefersReducedMotion) {
            paperAirplaneControls.start('initial');
          }
        }}
        className={styles.email}
        href='mailto:hello@joonie.dev'
      >
        <motion.div
          animate={paperAirplaneControls}
          variants={paperAirplaneVariants}
        >
          <PaperAirplane width={20} height={20} />
        </motion.div>
        hello@joonie.dev
      </motion.a>
      {/* Social Links */}
      <motion.div
        whileInView='show'
        variants={linksContainerVariants}
        className={styles.links}
      >
        {LINKS.map(({ label, href }) => {
          return (
            <motion.a variants={linkVariants} key={href} href={href}>
              {label}
            </motion.a>
          );
        })}
      </motion.div>
      {/* Squiggle */}
      <motion.div
        onViewportEnter={() => setTimeout(() => setAnimate(true), 500)}
        className={styles.squiggle}
      >
        <Squiggle
          animate={animate}
          width={70}
          strokeWidth={2}
          waveAmplitude={3}
          pointSpacing={0.4}
          numberOfLines={1.8}
          xAdjust={16}
        />
      </motion.div>
      {/* Copyright */}
      <span className={styles.copyright}>
        <Text content='© 2022' />
        <Sparkle width={20} height={20} />
        <Text content='JUEUNGRACEYUN' />
      </span>
    </motion.footer>
  );
}
