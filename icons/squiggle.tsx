'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { SVGType } from './types';

interface SquiggleType extends SVGType {
  animate: boolean;
  strokeWidth?: number;
  color?: string;
  waveAmplitude?: number;
  originX?: number;
  pointSpacing?: number;
  xAdjust?: number;
  numberOfLines?: number;
  angularFrequency?: number;
}

export default function Squiggle({
  width = 100,
  height = 15,
  animate,
  className,
  strokeWidth = 1.5,
  color = 'currentColor',
  waveAmplitude = 1,
  pointSpacing = 0.2,
  originX = 1,
  xAdjust = 5,
  numberOfLines = 4,
  angularFrequency = 0.1,
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
    x: originX,
    y: 4,
  };

  const amplitude = waveAmplitude; // wave amplitude
  const rarity = pointSpacing; // point spacing
  const freq = angularFrequency; // angular frequency
  const phase = 1; // phase angle

  const lines = Array(Math.floor(width * numberOfLines))
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
    <motion.svg
      width={width}
      height={height}
      viewBox={`0 0 ${width - xAdjust} ${height - 2}`}
      className={className}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      {lines}
    </motion.svg>
  );
}
