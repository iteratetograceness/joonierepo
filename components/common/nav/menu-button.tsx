import styles from './index.module.css';

// TODO: Active and Hover state?

type Props = {
  onClick: () => void;
};

export default function MenuButton({ onClick }: Props) {
  return (
    <button className={styles.button} onClick={onClick}>
      x
    </button>
  );
}
