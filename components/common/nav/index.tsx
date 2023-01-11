import Link from 'next/link';
import { useState } from 'react';
import Logo from '../../../icons/logo';
import inter from '../../../utils/inter';
import styles from './index.module.css';
import Menu from './menu';
import MenuButton from './menu-button';

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOnClick = () => {
    if (!isOpen && typeof window != 'undefined' && window.document) {
      // Menu opening:
      document.body.style.overflowY = 'hidden';
    } else {
      // Menu closing:
      document.body.style.overflowY = 'unset';
    }

    setIsOpen(!isOpen);
  };

  return (
    <nav className={styles.nav}>
      <Link href='/' className={inter.className}>
        <Logo />
      </Link>
      <MenuButton isOpen={isOpen} onClick={handleOnClick} />
      <Menu isOpen={isOpen} />
    </nav>
  );
}
