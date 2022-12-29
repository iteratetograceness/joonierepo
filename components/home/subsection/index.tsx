'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import ArrowDown from '../../../icons/arrow-down';
import Parallax from '../../common/parallax';
import SquiggleText from '../../common/squiggle-text';
import styles from './index.module.css';

export type Props = {
  illustration: string; // "me.png"
  alt: string;
  caption: string;
  reverse?: boolean;
  underlineIndexes?: number[];
  underlineColors?: string[];
  isLastIndex?: boolean;
};

export default function SubSection({
  illustration,
  alt,
  caption,
  reverse = false,
  underlineIndexes,
  underlineColors,
  isLastIndex,
}: Props) {
  const [animate, setAnimate] = useState(false);
  const [showArrow, setShowArrow] = useState(false);

  const MotionArrowDown = motion(ArrowDown);
  const arrowVariant = showArrow ? 'show' : 'hidden';
  const arrowVariants = {
    hidden: { opacity: 0, y: '10%' },
    show: {
      opacity: 1,
      y: ['0%', '5%', '0%'],
      transition: {
        delay: 1.5,
        y: {
          repeat: 1,
          duration: 0.5,
          bounce: 1,
          velocity: 3,
          ease: 'easeInOut',
        },
      },
    },
  };

  return (
    <>
      <Parallax>
        <section className={styles.container}>
          <Image
            src={`/${illustration}`}
            alt={alt}
            width={300}
            height={300}
            style={{
              order: reverse ? 1 : undefined,
            }}
          />
          <motion.div
            className={styles.textContainer}
            onViewportEnter={() => {
              if (!animate) setAnimate(true);
              if (!showArrow) setShowArrow(true);
            }}
          >
            <SquiggleText
              text={caption}
              animate={animate}
              squiggleIndexes={underlineIndexes}
              squiggleColors={underlineColors}
              alignRight={reverse}
              mono
            />
          </motion.div>
          {!isLastIndex && (
            <MotionArrowDown
              className={styles.arrow}
              variants={arrowVariants}
              initial='hidden'
              animate={arrowVariant}
              width={50}
              height={50}
            />
          )}
        </section>
      </Parallax>
    </>
  );
}
