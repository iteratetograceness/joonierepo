'use client';

import { motion } from 'framer-motion';
import styles from './index.module.css';

const DEFAULT_VALUES: GradientsData = {
  blue: { y: 100, x: 50, width: 650, zIndex: -4, hex: '#9CABD2' },
  pink: { y: 240, x: 100, width: 450, zIndex: -3, hex: '#F5ACA8' },
  orange: { y: 375, x: 75, width: 250, zIndex: -1, hex: '#E5954E' },
  yellow: { y: 300, x: 150, width: 300, zIndex: -2, hex: '#F4BB65CC' },
};

type GradientData = {
  x: number;
  y: number;
  width: number;
  zIndex: number;
  hex: string;
};

type GradientsData = { [color: string]: GradientData };

type Props = {
  colors?: GradientsData;
  className?: string;
  responsive?: boolean;
  opacity?: number;
};

export function Gradients({
  colors = DEFAULT_VALUES,
  className,
  responsive = false,
  opacity = 0.8,
}: Props) {
  const variants = {
    hidden: { opacity: 0 },
    show: { opacity },
  };

  const containerTransition = {
    staggerChildren: 0.15,
    delayChildren: 0.3,
  };

  const gradientTransition = {
    ease: 'easeIn',
    duration: 0.5,
  };

  return (
    <motion.div
      variants={variants}
      initial='hidden'
      animate='show'
      transition={containerTransition}
      className={`${styles.container} ${className}`}
    >
      {Object.keys(colors).map((color, i) => {
        const { x, y, width, zIndex, hex } =
          colors[color as keyof GradientsData];

        return (
          <motion.div
            variants={variants}
            transition={gradientTransition}
            key={color}
            className={styles.gradient}
            style={{
              top: !responsive ? `${y}px` : `${y}%`,
              left: !responsive ? `${x}px` : `${x}%`,
              width: !responsive ? `${width}px` : `${width}%`,
              zIndex,
              ['--color' as string]: hex,
              ['--animation-order' as string]: i,
              ['--opacity' as string]: opacity,
            }}
          />
        );
      })}
    </motion.div>
  );
}
