import { motion, useAnimationControls, useReducedMotion } from 'framer-motion';
import styles from './index.module.css';
interface Props {
  text: string;
  className?: string;
}

export function RotatingText({ text, className }: Props) {
  const prefersReducedMotion = useReducedMotion();
  const animate = useAnimationControls();

  const hoverArea = {
    rotate: { z: 0 },
  };

  const container = {
    rotate: { transition: { staggerChildren: 0.01 } },
  };

  const timing = [0.4, 0.6, 0.7, 0.8, 0.5, 0.4, 0.4, 0.3];

  const wordCopy = prefersReducedMotion
    ? undefined
    : {
        initial: { y: '-120%', rotateX: 90 },
        rotate: (i: number) => ({
          y: ['0%', '40%'],
          rotateX: [0, 90],
          scaleX: [1, 0.4],
          scaleY: [1, 0.4],
          transition: { duration: timing[i] },
        }),
      };

  const word = prefersReducedMotion
    ? undefined
    : {
        initial: { y: '0%', rotateX: 0 },
        rotate: (i: number) => ({
          y: ['-40%', '0%'],
          rotateX: [-90, 0],
          scaleX: [0.4, 1],
          scaleY: [0.4, 1],
          transition: { duration: timing[i] },
        }),
      };

  return (
    <motion.div
      className={`${styles.container} ${className}`}
      variants={hoverArea}
      animate={animate}
      initial='initial'
      whileHover={prefersReducedMotion ? { scale: 1.05 } : undefined}
      onHoverStart={() => animate.start('rotate')}
    >
      {/* Motion Text */}
      <motion.div className={styles.front} variants={container}>
        {Array.from(text).map((char, i) => (
          <motion.span custom={i} key={`${char}${i}`} variants={wordCopy}>
            {char}
          </motion.span>
        ))}
      </motion.div>
      {/* Motion Text Copy */}
      <motion.div className={styles.back} variants={container}>
        {Array.from(text).map((char, i) => (
          <motion.span custom={i} key={`${char}${i}copy`} variants={word}>
            {char}
          </motion.span>
        ))}
      </motion.div>
      {/* Regular Text */}
      <div className={styles.placeholder}>{text}</div>
    </motion.div>
  );
}
