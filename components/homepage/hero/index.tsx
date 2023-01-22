import { Star } from '../../../icons/star';
import { libreCaslonText } from '../../../utils/fonts';
import { ItalicText } from '../../common/italic-text';
import styles from './index.module.css';

export function HomepageHero() {
  return (
    <div className={styles['hero-container']}>
      <div className={`${libreCaslonText.className} ${styles['hero-text']}`}>
        <div className={styles.year}>
          <em className={libreCaslonText.className}>
            {new Date().getFullYear()}
          </em>
        </div>
        <h1>
          <ItalicText text={`GRACE\nYUN`} italics={[1, 8]} />
        </h1>
      </div>
      <div className={styles.roles}>
        <p>Software&nbsp;Engineer</p>
        <Star width={20} height={20} />
        <p>Illustrator</p>
      </div>
    </div>
  );
}
