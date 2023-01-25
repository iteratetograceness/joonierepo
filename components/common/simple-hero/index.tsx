import { libreCaslonText } from '~/utils/fonts';
import { ItalicText } from '../italic-text';
import styles from './index.module.css';

interface Props {
  heading: string;
  italics?: number[];
  subheading: string;
}
export function SimpleHero({ heading, subheading, italics = [] }: Props) {
  return (
    <section className={styles.container}>
      <h1 className={libreCaslonText.className}>
        <ItalicText text={heading} italics={italics} />
      </h1>
      <h2>{subheading}</h2>
    </section>
  );
}
