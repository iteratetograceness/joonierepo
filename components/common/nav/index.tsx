import Link from 'next/link';
import Logo from '../../../icons/logo';
import inter from '../../../utils/inter';
import styles from './index.module.css';
import MenuButton from './menu-button';

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <Link href='/' className={inter.className}>
        <Logo />
      </Link>
      <MenuButton />
    </nav>
  );
}
