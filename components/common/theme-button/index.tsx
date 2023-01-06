'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ForwardedRef, forwardRef, useEffect, useState } from 'react';
import Moon from '../../../icons/moon';
import Sun from '../../../icons/sun';
import styles from './index.module.css';

const ThemeButton = forwardRef(function ThemeButton(
  _,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const prefersReducedMotion = useReducedMotion();
  const [theme, setTheme] = useState<'dark' | 'light' | null>(null);

  const toggleDarkMode = (state: boolean) => {
    document.documentElement.classList.toggle('dark-mode', state);
  };

  const toggleTheme = () => {
    if (theme === 'light') {
      toggleDarkMode(true);
      setTheme('dark');
    } else {
      toggleDarkMode(false);
      setTheme('light');
    }
  };

  useEffect(() => {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (event) => {
        const colorScheme = event.matches ? 'dark' : 'light';
        setTheme(colorScheme);
      });
  }, []);

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
      {theme && theme === 'dark' ? <Sun /> : <Moon />}
    </motion.button>
  );
});

export default ThemeButton;
