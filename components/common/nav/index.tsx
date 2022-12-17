'use client';

import Link from 'next/link';
import { useState } from 'react';
import Logo from '../../../icons/logo';
import inter from '../../../utils/inter';
import styles from './index.module.css';
import MenuButton from './menu-button';

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      <Link href='/' className={inter.className}>
        <Logo />
      </Link>
      <MenuButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
    </nav>
  );
}
