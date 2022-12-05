import Star from '../../../icons/star';
import { Gradients } from '../../common/gradients';
import Text from '../../common/text';
import styles from './index.module.css';

const ROLES = ['SOFTWARE ENGINEER', 'DIGITAL CREATOR', 'DOG MOM'] as const;

function Description({ roles }: { roles: typeof ROLES }) {
  return (
    <div className={styles.roles}>
      {roles.map((role) => (
        <span key={role}>
          <Star />
          <Text content={role} />
        </span>
      ))}
    </div>
  );
}

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
      <Description roles={ROLES} />
    </section>
  );
}
