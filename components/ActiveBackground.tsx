import React from 'react';
import { motion } from 'framer-motion';

export const ActiveBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#030303]">
      {/* Base Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] z-[1]" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }} 
      />

      {/* Moving Light Leaks */}
      <motion.div 
        animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-brand-red/10 rounded-full blur-[100px] mix-blend-screen"
      />
      
      <motion.div 
        animate={{ opacity: [0.1, 0.3, 0.1], x: [0, 100, 0] }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-blue-900/10 rounded-full blur-[120px] mix-blend-screen"
      />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] z-0" />
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#000000] opacity-80 z-[2]" />
    </div>
  );
};