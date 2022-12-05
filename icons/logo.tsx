import Text from '../components/common/text';
import styles from './index.module.css';

export default function Logo() {
  return (
    <div className={styles.logo}>
      <Text content='*' className={styles.asterisk} heading />
      <Text content='jgy' className={styles.initials} />
    </div>
  );
}
