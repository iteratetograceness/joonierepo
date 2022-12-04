import Link from 'next/link';
import styles from './index.module.css';

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <Link href='/'>*</Link>
      <button>=</button>
    </nav>
  );
}
