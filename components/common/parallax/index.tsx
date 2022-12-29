'use client';

/**
 * https://samuelkraft.com/blog/spring-parallax-framer-motion-guide
 */

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from 'framer-motion';
import { useState, useRef, ReactNode, useEffect } from 'react';
import styles from './index.module.css';

type ParallaxProps = {
  children: ReactNode;
  offset?: number;
};

const Parallax = ({ children, offset = 200 }: ParallaxProps) => {
  const prefersReducedMotion = useReducedMotion();

  const [elementTop, setElementTop] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);
  const ref = useRef(null);

  const { scrollY } = useScroll();

  const initial = elementTop - clientHeight;
  const final = elementTop + offset;

  const yRange = useTransform(scrollY, [initial, final], [offset, -offset]);
  const y = useSpring(yRange, { stiffness: 400, damping: 90 });

  useEffect(() => {
    const element = ref.current;

    const onResize = () => {
      if (element) {
        setElementTop(
          (element as unknown as HTMLElement).getBoundingClientRect().top +
            window.scrollY || window.pageYOffset,
        );
      }
      setClientHeight(window.innerHeight);
    };

    onResize();
    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, [ref]);

  if (prefersReducedMotion) {
    return <div>{children}</div>;
  }

  return (
    <motion.div ref={ref} style={{ y }} className={styles.container}>
      {children}
    </motion.div>
  );
};

export default Parallax;
