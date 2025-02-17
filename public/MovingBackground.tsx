'use client'

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface MovingBackgroundProps {
  children: ReactNode;
}

const MovingBackground = ({ children }: MovingBackgroundProps) => {
  return (
    <div className="relative h-full w-full">
      <motion.div
        className="absolute inset-0 bg-[url('/TestPattern4.svg')] bg-repeat z-0"
        animate={{
          backgroundPosition: ['0 0', '100% 100%'],
        }}
        transition={{
          duration: 100, // Speed of the animation
          ease: 'linear',
          repeat: Infinity, // Repeat forever
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default MovingBackground;
