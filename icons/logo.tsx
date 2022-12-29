'use client';

import { motion } from 'framer-motion';
import Text from '../components/common/text';
import styles from './index.module.css';

export default function Logo() {
  const variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { ease: 'easeIn', duration: 0.5 },
    },
  };

  return (
    <motion.div
      className={styles.logo}
      variants={variants}
      initial='hidden'
      animate='show'
    >
      <Text content='*' className={styles.asterisk} heading />
      <Text content='jgy' className={styles.initials} />
    </motion.div>
  );
}
