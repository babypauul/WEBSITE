import React from 'react';
import { motion } from 'framer-motion';
import { RetroGrid } from './RetroGrid';

export const ActiveBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#000000]">
      {/* 3D Grid - slightly visible */}
      <div className="absolute bottom-[-10%] w-full h-[80vh] opacity-20 z-[1] mix-blend-screen">
        <RetroGrid />
      </div>

      {/* Massive Red Glow Blob */}
      <motion.div 
        animate={{ 
            opacity: [0.3, 0.5, 0.3], 
            scale: [1, 1.2, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-30%] left-[-10%] w-[90vw] h-[90vw] bg-brand-red/20 rounded-full blur-[150px] mix-blend-screen"
      />
      
      {/* Secondary Cold Blob for Contrast */}
      <motion.div 
        animate={{ 
            opacity: [0.1, 0.2, 0.1], 
            scale: [1, 1.1, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-20%] right-[-10%] w-[80vw] h-[80vw] bg-neutral-800/20 rounded-full blur-[180px] mix-blend-lighten"
      />

      {/* Rising Embers / Sparks */}
      <div className="absolute inset-0 z-[2]">
          {[...Array(15)].map((_, i) => (
             <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_10px_white]"
                initial={{ 
                    x: Math.random() * window.innerWidth, 
                    y: window.innerHeight + 100,
                    opacity: 0,
                    scale: 0.5
                }}
                animate={{
                    y: -100,
                    opacity: [0, 0.8, 0],
                    scale: [0.5, 1, 0]
                }}
                transition={{
                    duration: Math.random() * 15 + 10,
                    repeat: Infinity,
                    ease: "linear",
                    delay: Math.random() * 10
                }}
             />
          ))}
      </div>

      {/* Heavy Vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/40 to-black opacity-90 z-[3]" />
    </div>
  );
};