'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Star from '../../../icons/star';
import { Gradients } from '../../common/gradients';
import Text from '../../common/text';
import styles from './index.module.css';

const ROLES = ['SOFTWARE ENGINEER', 'DIGITAL CREATOR', 'DOG MOM'] as const;

function Description({ roles }: { roles: typeof ROLES }) {
  const prefersReducedMotion = useReducedMotion();
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 0.7,
      transition: prefersReducedMotion
        ? undefined
        : { staggerChildren: 0.25, delayChildren: 0.5 },
    },
  };
  const roleVariants = {
    hidden: { opacity: 0, x: prefersReducedMotion ? 0 : 25 },
    show: {
      opacity: 1,
      x: 0,
      transition: { ease: 'easeOut', duration: 0.5 },
    },
  };

  return (
    <motion.div
      className={styles.roles}
      initial='hidden'
      animate='show'
      variants={containerVariants}
    >
      {roles.map((role) => (
        <motion.span key={role} variants={roleVariants}>
          <Star />
          <Text content={role} />
        </motion.span>
      ))}
    </motion.div>
  );
}

export default function HomepageHero() {
  const prefersReducedMotion = useReducedMotion();

  const textVariants = {
    initial: { y: prefersReducedMotion ? 0 : '5%', opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
    },
  };

  const subtextVariants = {
    initial: { y: prefersReducedMotion ? 0 : '5%', opacity: 0 },
    animate: {
      y: 0,
      opacity: 0.7,
    },
  };

  const MotionText = motion(Text);

  return (
    <section className={styles.container}>
      <Gradients className={styles.gradients} />
      <MotionText
        content='a collection of creations by'
        className={styles.subheading}
        variants={subtextVariants}
        initial='initial'
        animate='animate'
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        mono
      />
      <div className={styles.titleContainer}>
        <MotionText
          content={'jueungraceyun'}
          className={styles.title}
          variants={textVariants}
          initial='initial'
          animate='animate'
          transition={{ delay: 0.2, duration: 0.4, ease: 'easeInOut' }}
          heading
        />
      </div>
      <Description roles={ROLES} />
    </section>
  );
}
