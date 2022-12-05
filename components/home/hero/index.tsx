import { Gradients } from '../../common/gradients';
import Text from '../../common/text';
import styles from './index.module.css';

export default function HomepageHero() {
  return (
    <section className={styles.container}>
      <Gradients />
      <Text
        content='a collection of creations by'
        className={styles.subheading}
        mono
      />
      <Text content={'jueungraceyun'} className={styles.title} heading />
    </section>
  );
}
