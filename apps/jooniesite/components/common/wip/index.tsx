import { libreCaslonText } from '~/utils/fonts';
import styles from './index.module.css';

export function WorkInProgress() {
  return (
    <div className={styles.container}>
      <h2 className={libreCaslonText.className}>Oops!</h2>
      <p>Things aren&apos;t quite ready here. Come back later.</p>
    </div>
  );
}
