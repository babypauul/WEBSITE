import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext.tsx';

export const ActiveBackground: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`fixed inset-0 z-0 pointer-events-none overflow-hidden transition-colors duration-1000 ${isDark ? 'bg-[#000000]' : 'bg-[#F5F5F7]'}`}>
      
      {/* Primary Glow Blob */}
      <motion.div 
        animate={{ 
            opacity: [0.2, 0.4, 0.2], 
            scale: [1, 1.15, 1],
            x: [0, 50, 0],
            y: [0, -30, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute top-[-30%] left-[-10%] w-[100vw] h-[100vw] rounded-full blur-[160px] mix-blend-screen will-change-transform transition-colors duration-1000 ${
          isDark ? 'bg-brand-red/15' : 'bg-brand-red/5'
        }`}
      />
      
      {/* Secondary Depth Blob */}
      <motion.div 
        animate={{ 
            opacity: [0.1, 0.15, 0.1], 
            scale: [1, 1.05, 1],
            x: [0, -30, 0],
            y: [0, 50, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute bottom-[-30%] right-[-10%] w-[80vw] h-[80vw] rounded-full blur-[180px] will-change-transform transition-colors duration-1000 ${
          isDark ? 'bg-neutral-800/10' : 'bg-gray-300/20'
        }`}
      />

      {/* Atmospheric Particles */}
      <div className="absolute inset-0 z-[2]">
          {[...Array(12)].map((_, i) => (
             <motion.div
                key={i}
                className={`absolute w-1 h-1 rounded-full will-change-transform transition-colors duration-1000 ${isDark ? 'bg-white shadow-[0_0_10px_white]' : 'bg-black/10'}`}
                initial={{ 
                    x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
                    y: (typeof window !== 'undefined' ? window.innerHeight : 1000) + 100,
                    opacity: 0
                }}
                animate={{
                    y: -100,
                    opacity: [0, isDark ? 0.6 : 0.2, 0]
                }}
                transition={{
                    duration: Math.random() * 20 + 15,
                    repeat: Infinity,
                    ease: "linear",
                    delay: Math.random() * 15
                }}
             />
          ))}
      </div>

      {/* Finishing Overlay */}
      <div className={`absolute inset-0 transition-opacity duration-1000 z-[3] ${
        isDark 
          ? 'bg-radial-gradient from-transparent via-black/30 to-black opacity-80' 
          : 'bg-radial-gradient from-transparent via-transparent to-gray-100/30 opacity-40'
      }`} />
    </div>
  );
};