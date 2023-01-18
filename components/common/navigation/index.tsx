'use client';

import { useAnimationControls } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { MenuButton } from './menu-button';
import styles from './index.module.css';
import { FullMenu } from './full-menu';

export function Navigation() {
  const pathname = usePathname();
  const menuControls = useAnimationControls();

  const onMenuOpen = useCallback(async function onMenuOpen() {
    if (typeof window != 'undefined' && window.document) {
      document.body.style.position = 'fixed';
      document.body.style.top = `-${window.scrollY}px`;
      document.body.style.inset = '0';
    }
    menuControls.start('open');
    menuControls.start('in');
    menuControls.start('enter');
  }, []);

  const NAVIGATION_ITEMS = useMemo(
    () => [
      pathname,
      <Link key='full-name' href='/'>
        Jueun Grace Yun
      </Link>,
      <MenuButton key='menu-btn' onClick={onMenuOpen} />,
    ],
    [pathname, onMenuOpen],
  );

  return (
    <nav className={styles.nav}>
      {NAVIGATION_ITEMS.map((item, i) => (
        <p key={`nav-item-${i}`} className={styles['nav-item']}>
          {item}
        </p>
      ))}
      {/* Full Page Menu */}
      <FullMenu menuControls={menuControls} />
    </nav>
  );
}
