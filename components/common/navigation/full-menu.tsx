'use client';

import { AnimatePresence, AnimationControls, motion } from 'framer-motion';
import { MenuLink } from './menu-link';
import { MenuButton } from './menu-button';
import useMediaQuery from '../../../utils/use-media-query';
import { useCallback, useEffect } from 'react';
import styles from './index.module.css';

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

  useEffect(() => {
    if (!shouldHideColors) {
      menuControls.start('enter');
    }
  }, [shouldHideColors, menuControls]);

  const onMenuClose = useCallback(
    async function onMenuClose() {
      if (typeof window != 'undefined' && window.document) {
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.inset = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
      menuControls.start('out');
      menuControls.start('closed');
      if (!shouldHideColors) menuControls.start('hide');
    },
    [window, menuControls, shouldHideColors],
  );

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
    hide: {
      left: '100%',
      transition: { duration: 0.5, ease: 'easeIn' },
    },
    enter: {
      left: '60%',
      transition: { duration: 1, ease: 'easeInOut', delayChildren: 0.75 },
    },
  };

  const circle = {
    hide: {
      x: '100%',
      transition: { duration: 0.5 },
    },
    enter: {
      x: 0,
      transition: { duration: 0.75 },
    },
  };

  const blue = {
    hide: {
      left: '100%',
      transition: { duration: 0.5, ease: 'easeIn' },
    },
    enter: {
      left: '80%',
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
      >
        <div className={styles['menu-content']}>
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
        <AnimatePresence>
          {!shouldHideColors ? (
            <>
              <motion.div
                key='red'
                className={styles.red}
                initial='hide'
                exit='hide'
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
                initial='hide'
                exit='hide'
                animate={menuControls}
                variants={blue}
              />
            </>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
