'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { KeyboardEvent, useEffect, useState } from 'react';
import Sparkle from '../../../icons/sparkle';
import inter from '../../../utils/inter';
import ThemeButton from '../theme-button';
import styles from './index.module.css';

const SOCIALS = [
  { label: 'hello@joonie.dev', href: 'mailto:hello@joonie.dev' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/gracejueunyun/' },
  { label: 'GitHub', href: 'https://github.com/jueungrace' },
  { label: 'Twitter', href: 'https://twitter.com/jueungraceyun' },
  { label: 'Instagram', href: 'https://www.instagram.com/jueungraceyun/' },
];

const LINKS = [
  {
    title: 'home',
    href: '/',
  },
  {
    title: 'projects',
    href: '/projects',
  },
  {
    title: 'bookmarks',
    href: '/bookmarks',
  },
  {
    title: 'photos',
    href: '/photos',
  },
  {
    title: 'shop',
    href: '/shop',
  },
];

type Props = {
  isOpen: boolean;
};

export default function Menu({ isOpen }: Props) {
  const [firstRender, setFirstRender] = useState(true);

  const onKeyDown = (e: KeyboardEvent) => {
    const menuButton = document.getElementById('menu-button');
    const themeButton = document.getElementById('theme-toggle');

    if (e.key !== 'Tab' || !isOpen) return;

    // Moving forward from last element - themeButton:
    if (!e.shiftKey && document.activeElement === themeButton) {
      menuButton?.focus();
      return e.preventDefault();
    }
  };

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
    }
  }, [firstRender]);

  // MENU CONTAINER:
  const menuVariants = {
    closed: {
      height: 0,
      top: '-3rem',
      transitionEnd: { display: 'none' },
      transition: {
        duration: 2,
        ease: [0.76, 0, 0.24, 1],
        when: 'afterChildren',
        staggerChildren: 0.05,
      },
    },
    open: {
      height: '100vh',
      top: '0',
      display: 'flex',
      transition: {
        duration: 1,
        ease: [0.76, 0, 0.24, 1],
        staggerChildren: 0.15,
        delayChildren: 0.8,
      },
    },
  };

  // LINKS:
  const MotionLink = motion(Link);
  const linkVariants = {
    closed: { opacity: 0, y: 10, transition: { duration: 0.4 } },
    open: { opacity: 1, y: -10, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      initial={firstRender ? 'closed' : !isOpen ? 'open' : 'closed'}
      animate={isOpen ? 'open' : 'closed'}
      variants={menuVariants}
      className={`${styles.menuContainer} ${inter.className}`}
      aria-modal='true'
      onKeyDown={onKeyDown}
      key='menu'
    >
      {LINKS.map(({ title, href }) => {
        return (
          <MotionLink
            key={title}
            href={href}
            variants={linkVariants}
            className={styles.link}
          >
            {title}
          </MotionLink>
        );
      })}
      <motion.div className={styles.socials} variants={linkVariants}>
        {SOCIALS.map(({ label, href }) => {
          return (
            <div className={styles.social} key={label}>
              <Sparkle width={15} height={15} />
              &nbsp;
              <a href={href}>{label.toUpperCase()}</a>
            </div>
          );
        })}
      </motion.div>
      <ThemeButton />
    </motion.div>
  );
}
