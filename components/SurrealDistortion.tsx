import React from 'react';
import { motion } from 'framer-motion';

export const SurrealDistortion: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-40 mix-blend-screen">
      {/* 
         SURREAL ATMOSPHERE 
         Large, slow-moving blobs that create a "liquid" feel behind the content.
      */}

      {/* Deep Red Orb - Moves in a figure-8 like pattern */}
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -50, 50, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
          times: [0, 0.33, 0.66, 1]
        }}
        className="absolute top-[-10%] left-[-20%] w-[70vw] h-[70vw] bg-brand-red/10 rounded-full blur-[120px] will-change-transform"
      />

      {/* Spectral White/Gray Orb - Floats oppositely */}
      <motion.div
        animate={{
          x: [0, -100, 50, 0],
          y: [0, 100, -50, 0],
          scale: [1, 1.3, 0.8, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
          times: [0, 0.4, 0.7, 1]
        }}
        className="absolute bottom-[-10%] right-[-20%] w-[80vw] h-[80vw] bg-white/5 rounded-full blur-[150px] mix-blend-overlay will-change-transform"
      />
      
      {/* Center Pulse - Breathing effect */}
      <motion.div
         animate={{
             opacity: [0.05, 0.15, 0.05],
             scale: [0.8, 1.1, 0.8]
         }}
         transition={{
             duration: 10,
             repeat: Infinity,
             ease: "easeInOut"
         }}
         className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-brand-red/5 to-transparent blur-[80px]"
      />
    </div>
  );
};