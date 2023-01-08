'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ForwardedRef, forwardRef } from 'react';
import Moon from '../../../icons/moon';
import Sun from '../../../icons/sun';
import { useTheme } from '../../../utils/use-theme';
import styles from './index.module.css';

const ThemeButton = forwardRef(function ThemeButton(
  _,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const prefersReducedMotion = useReducedMotion();
  const { theme, toggleTheme } = useTheme();

  const hoverAnimation = {
    rotate: 360,
    opacity: 0.5,
    transition: {
      rotate: { repeat: Infinity, duration: 3, ease: 'linear' },
    },
  };

  return (
    <motion.button
      id='theme-toggle'
      ref={ref}
      className={styles.button}
      whileHover={prefersReducedMotion ? undefined : hoverAnimation}
      onClick={toggleTheme}
    >
      {theme !== null && theme === 'dark' ? <Sun /> : <Moon />}
    </motion.button>
  );
});

export default ThemeButton;
