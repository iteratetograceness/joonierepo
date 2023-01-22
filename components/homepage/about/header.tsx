'use client';

import { motion } from 'framer-motion';
import { libreCaslonText } from '../../../utils/fonts';
import { ItalicText } from '../../common/italic-text';
import styles from './index.module.css';

export function Header() {
  return (
    <div className={styles.header}>
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: 'backInOut' }}
        className={libreCaslonText.className}
        viewport={{ once: true }}
      >
        <ItalicText text='About&nbsp;Me' italics={[1, 6]} />
      </motion.h1>
    </div>
  );
}
