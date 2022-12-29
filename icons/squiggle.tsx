'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { SVGType } from './types';

interface SquiggleType extends SVGType {
  animate: boolean;
  strokeWidth?: number;
  color?: string;
}

export default function Squiggle({
  width = 100,
  height = 15,
  animate,
  className,
  strokeWidth = 1.5,
  color = 'currentColor',
}: SquiggleType) {
  const prefersReducedMotion = useReducedMotion();
  const variant = animate ? 'visible' : 'hidden';
  const draw = {
    hidden: { opacity: 0 },
    visible: (i: number) => {
      const delay = 1 + i * 0.002;
      return {
        opacity: 1,
        transition: {
          opacity: { delay, type: 'spring', duration: 0.1, bounce: 0 },
        },
      };
    },
  };

  const origin = {
    x: -4,
    y: 4,
  };

  const amplitude = 1; // wave amplitude
  const rarity = 0.2; // point spacing
  const freq = 0.1; // angular frequency
  const phase = 0; // phase angle

  const lines = Array(Math.floor(width * 5))
    .fill(0)
    .map((_, i) => {
      return (
        <motion.line
          key={i}
          variants={draw}
          initial='hidden'
          animate={prefersReducedMotion ? 'hidden' : variant}
          x1={(i - 1) * rarity + origin.x}
          y1={Math.sin(freq * (i - 1 + phase)) * amplitude + origin.y}
          x2={i * rarity + origin.x}
          y2={Math.sin(freq * (i + phase)) * amplitude + origin.y}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap='round'
          strokeLinejoin='round'
          custom={i}
        />
      );
    });

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width - 5} ${height}`}
      className={className}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      {lines}
    </svg>
  );
}
