'use client';

import { AnimatePresence, AnimationControls, motion } from 'framer-motion';
import { MenuLink } from './menu-link';
import { MenuButton } from './menu-button';
import useMediaQuery from '../../../utils/use-media-query';
import { useEffect, useRef, KeyboardEvent, useState } from 'react';
import styles from './index.module.css';
import { getAllFocusableElements } from '../../../utils/get-all-focusable-elements';

const MENU_LINKS = [
  { label: 'Home', href: '/', italics: [1] },
  { label: 'Projects', href: '/projects', italics: [1, 4] },
  { label: 'Bookmarks', href: '/bookmarks', italics: [3, 6] },
  { label: 'Photos', href: '/photos', italics: [1] },
  { label: 'Shop', href: '/shop', italics: [2] },
];

interface Props {
  menuControls: AnimationControls;
}

export function FullMenu({ menuControls }: Props) {
  const shouldHideColors = useMediaQuery('(max-width: 50rem)');
  const [isClosing, setIsClosing] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab' || isClosing || !menuRef.current) return;

    const focusableElements = getAllFocusableElements<HTMLDivElement>({
      parent: menuRef.current,
    });

    const firstFocusableEl = focusableElements?.[0] as HTMLElement;
    const lastFocusableEl = focusableElements?.[
      focusableElements.length - 1
    ] as HTMLElement;

    // Tab forward from last element:
    if (
      !e.shiftKey &&
      firstFocusableEl &&
      lastFocusableEl &&
      document.activeElement === lastFocusableEl
    ) {
      firstFocusableEl.focus();
      return e.preventDefault();
    }

    // Shift + Tab backward from first element
    if (
      e.shiftKey &&
      firstFocusableEl &&
      lastFocusableEl &&
      document.activeElement === firstFocusableEl
    ) {
      lastFocusableEl.focus();
      return e.preventDefault();
    }
  };

  useEffect(() => {
    if (!shouldHideColors) {
      menuControls.start('enter');
    }
  }, [shouldHideColors, menuControls]);

  useEffect(() => {
    if (isClosing && typeof window != 'undefined' && window.document) {
      const scrollY = document.body.style.top;
      document.body.style.overflow = 'unset';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  }, [isClosing]);

  async function onMenuClose() {
    setIsClosing(true);
    menuControls.start('out');
    menuControls.start('closed');
    if (!shouldHideColors) menuControls.start('hide');
  }

  const menuItem = {
    in: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.4, ease: 'easeIn' },
    }),
    out: (i: number) => ({
      opacity: 0,
      x: 20,
      transition: { delay: i * 0.3, duration: 0.4, ease: 'easeOut' },
    }),
  };

  const menu = {
    open: {
      x: '0%',
      zIndex: 1,
      display: 'flex',
      transition: { duration: 1, delayChildren: 0.5 },
    },
    closed: {
      x: '100%',
      transitionEnd: {
        display: 'none',
      },
      transition: { duration: 1, delay: 0.3 },
    },
  };

  const red = {
    closed: {
      left: '100%',
      transition: { duration: 0.5, ease: 'easeIn' },
    },
    enter: {
      left: shouldHideColors ? '100%' : '60%',
      transition: { duration: 1, ease: 'easeInOut', delayChildren: 0.75 },
    },
  };

  const circle = {
    closed: {
      x: '100%',
      transition: { duration: 0.5 },
    },
    enter: {
      x: shouldHideColors ? '100%' : 0,
      transition: { duration: 0.75 },
    },
  };

  const blue = {
    closed: {
      left: '100%',
      transition: { duration: 0.5, ease: 'easeIn' },
    },
    enter: {
      left: shouldHideColors ? '100%' : '80%',
      transition: { delay: 0.25, duration: 0.5, ease: 'easeInOut' },
    },
  };

  const MotionMenuLink = motion(MenuLink);

  return (
    <AnimatePresence>
      <motion.div
        key='menu-open'
        className={styles.menu}
        variants={menu}
        initial='closed'
        exit='closed'
        animate={menuControls}
        onKeyDown={onKeyDown}
      >
        <div className={styles['menu-content']} ref={menuRef}>
          {MENU_LINKS.map((link, i) => (
            <MotionMenuLink
              {...link}
              key={link.href}
              custom={i}
              whileHover={{ scale: 1.07 }}
              onClick={onMenuClose}
              animate={menuControls}
              variants={menuItem}
            />
          ))}
          <MenuButton onClick={onMenuClose} text='Close' />
        </div>
        <motion.div
          key='red'
          className={styles.red}
          initial='closed'
          exit='closed'
          animate={menuControls}
          variants={red}
        >
          <motion.div
            key='circle'
            className={styles.circle}
            animate={menuControls}
            variants={circle}
          />
        </motion.div>
        <motion.div
          key='blue'
          className={styles.blue}
          animate={menuControls}
          variants={blue}
        />
      </motion.div>
    </AnimatePresence>
  );
}
