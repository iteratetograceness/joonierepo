import { SOCIALS } from '~/constants';
import { libreCaslonText } from '~/utils/fonts';
import styles from './index.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.yellow}>
        <h3 className={libreCaslonText.className}>{'Contact\nMe'}</h3>
        <div className={styles.links}>
          {SOCIALS.map(({ name, href }) => (
            <a key={href} href={href}>
              {name}
            </a>
          ))}
        </div>
      </div>
      <div className={styles.red}>
        <div className={styles.circle} />
      </div>
      <div className={styles.blue} />
    </footer>
  );
}
