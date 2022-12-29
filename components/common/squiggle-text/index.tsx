import Squiggle from '../../../icons/squiggle';
import Text from '../text';
import styles from './index.module.css';

type Props = {
  mono?: boolean;
  animate: boolean;
  squiggleIndexes?: number[];
  squiggleColors?: string[];
  text: string;
  alignRight?: boolean;
};

export default function SquiggleText({
  text,
  squiggleIndexes = [],
  squiggleColors = [],
  animate,
  mono = false,
  alignRight = false,
}: Props) {
  let colorIdx = -1;
  const words = text.split(' ').map((word, idx) => {
    if (squiggleIndexes.includes(idx)) {
      colorIdx++;
      const withoutPunctuation = word.replace(/[^\w\s']|_/g, '');
      return (
        <div key={`${text}-${idx}`} className={styles.squiggleContainer}>
          <Text mono={mono} content={word} className={styles.text} />
          <Squiggle
            width={8 * withoutPunctuation.length}
            animate={animate}
            className={styles.squiggle}
            color={squiggleColors[colorIdx]}
          />
        </div>
      );
    } else
      return (
        <Text
          key={`${text}-${idx}`}
          mono={mono}
          content={word}
          className={styles.text}
        />
      );
  });
  return (
    <div
      className={`${styles.container} ${alignRight ? styles.reverse : null}`}
    >
      {words}
    </div>
  );
}
