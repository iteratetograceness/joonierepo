'use client';

import { useAnimationControls } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MenuButton } from './menu-button';
import styles from './index.module.css';
import { FullMenu } from './full-menu';

export function Navigation() {
  const pathname = usePathname();
  const menuControls = useAnimationControls();

  async function onMenuOpen() {
    if (typeof window != 'undefined' && window.document) {
      document.body.style.overflow = 'hidden';
    }
    menuControls.start('open');
    menuControls.start('in');
    menuControls.start('enter');
  }

  return (
    <nav className={styles.nav}>
      <p className={styles['nav-item']}>{pathname}</p>
      <Link href='/'>Jueun Grace Yun</Link>
      <MenuButton key='menu-btn' onClick={onMenuOpen} />
      <FullMenu menuControls={menuControls} />
    </nav>
  );
}
