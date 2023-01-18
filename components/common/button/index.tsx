import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './index.module.css';

// TODO: differentiate between text only button and buttons w/ bgs+border

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: boolean;
  children: ReactNode | ReactNode[];
}

export function Button({ children, ...props }: Props) {
  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  );
}
