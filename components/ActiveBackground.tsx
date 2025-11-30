import React from 'react';
import { motion } from 'framer-motion';
import { RetroGrid } from './RetroGrid';

export const ActiveBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#030303]">
      {/* Base Noise Texture */}
      <div className="absolute inset-0 opacity-[0.04] z-[2]" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }} 
      />

      {/* 3D Grid Effect */}
      <div className="absolute bottom-0 w-full h-[60vh] opacity-30 z-[1]">
        <RetroGrid />
      </div>

      {/* Moving Light Leaks - Intensified */}
      <motion.div 
        animate={{ 
            opacity: [0.1, 0.3, 0.1], 
            scale: [1, 1.5, 1],
            rotate: [0, 45, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-brand-red/5 rounded-full blur-[120px] mix-blend-screen"
      />
      
      <motion.div 
        animate={{ 
            opacity: [0.05, 0.2, 0.05], 
            x: [0, -100, 0],
            y: [0, 50, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] right-[-10%] w-[80vw] h-[80vw] bg-blue-900/10 rounded-full blur-[150px] mix-blend-screen"
      />

      {/* Floating Particles / Dust Motes */}
      <div className="absolute inset-0 z-[1]">
          {[...Array(20)].map((_, i) => (
             <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full"
                initial={{ 
                    x: Math.random() * window.innerWidth, 
                    y: Math.random() * window.innerHeight,
                    opacity: Math.random() * 0.5
                }}
                animate={{
                    y: [null, Math.random() * window.innerHeight],
                    opacity: [0, 0.8, 0]
                }}
                transition={{
                    duration: Math.random() * 10 + 10,
                    repeat: Infinity,
                    ease: "linear"
                }}
             />
          ))}
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-[#000000] opacity-90 z-[3]" />
    </div>
  );
};