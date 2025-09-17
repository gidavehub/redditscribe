// components/AnimatedSVGPath.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { svgPathProperties } from 'svg-path-properties';
import { PathInstruction } from '../core/JsonToPathParser';

interface AnimatedSVGPathProps {
  instruction: PathInstruction;
  onAnimationComplete?: () => void;
}

const ANIMATION_SPEED_FACTOR = 3;

export const AnimatedSVGPath: React.FC<AnimatedSVGPathProps> = ({ instruction, onAnimationComplete }) => {
  const { d, stroke = '#FFFFFF', fill = 'none', strokeWidth = 4 } = instruction;

  let length = 0;
  try {
    const properties = new svgPathProperties(d);
    length = properties.getTotalLength();
  } catch (e) {
    console.error("Could not parse path data for animation:", d, e);
  }
  
  const durationInSeconds = Math.max(0.15, (length * ANIMATION_SPEED_FACTOR) / 1000);

  return (
    <motion.path
      d={d}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      fill={fill}
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{
        duration: durationInSeconds,
        ease: 'linear',
      }}
      onAnimationComplete={() => onAnimationComplete?.()}
    />
  );
};