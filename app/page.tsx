import HomepageHero from '../components/home/hero';
import inter from '../utils/inter';
// import styles from './page.module.css';

export default function Home() {
  return (
    <div className={inter.className}>
      <HomepageHero />
    </div>
  );
}
