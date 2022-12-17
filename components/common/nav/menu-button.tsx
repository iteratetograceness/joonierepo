'use client';

// https://stackoverflow.com/questions/74255356/typeerror-react-createcontext-is-not-a-function-nextjs-13-formik-with-typesc

import styles from './index.module.css';
import { motion } from 'framer-motion';

type Props = {
  onClick: () => void;
  isOpen: boolean;
  size?: number;
};

export default function MenuButton({
  onClick,
  isOpen = false,
  size = 12,
}: Props) {
  const variant = isOpen ? 'opened' : 'closed';

  const top = {
    closed: {
      rotate: 0,
      translateY: 0,
    },
    opened: {
      rotate: 45,
      translateY: 2,
    },
  };

  const bottom = {
    closed: {
      rotate: 0,
      translateY: 0,
    },
    opened: {
      rotate: -45,
      translateY: -2,
    },
  };

  const lineProps = {
    stroke: 'currentColor',
    strokeWidth: 1,
    transition: { type: 'spring', stiffness: 260, damping: 20 },
    vectorEffect: 'non-scaling-stroke',
    initial: 'closed',
    animate: variant,
  };

  return (
    <button className={styles.button} onClick={onClick}>
      <motion.svg
        viewBox={`0 0 4 4`}
        overflow='visible'
        preserveAspectRatio='none'
        width={size}
        height={size}
      >
        <motion.line
          x1={-size / 2 + 4}
          x2={size / 2}
          y1='0'
          y2='0'
          variants={top}
          {...lineProps}
        />
        <motion.line
          x1={-size / 2 + 4}
          x2={size / 2}
          y1='4'
          y2='4'
          variants={bottom}
          {...lineProps}
        />
      </motion.svg>
    </button>
  );
}
