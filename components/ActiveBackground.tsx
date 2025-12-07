import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export const ActiveBackground: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`fixed inset-0 z-0 pointer-events-none overflow-hidden transition-colors duration-1000 ${isDark ? 'bg-[#000000]' : 'bg-[#F5F5F7]'}`}>
      
      {/* Massive Glow Blob */}
      <motion.div 
        animate={{ 
            opacity: [0.3, 0.5, 0.3], 
            scale: [1, 1.2, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute top-[-30%] left-[-10%] w-[90vw] h-[90vw] rounded-full blur-[150px] mix-blend-screen transition-colors duration-1000 ${
          isDark ? 'bg-brand-red/20' : 'bg-brand-red/10'
        }`}
      />
      
      {/* Secondary Blob for Contrast */}
      <motion.div 
        animate={{ 
            opacity: [0.1, 0.2, 0.1], 
            scale: [1, 1.1, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute bottom-[-20%] right-[-10%] w-[80vw] h-[80vw] rounded-full blur-[180px] transition-colors duration-1000 ${
          isDark ? 'bg-neutral-800/20 mix-blend-lighten' : 'bg-gray-300/40 mix-blend-multiply'
        }`}
      />

      {/* Rising Embers / Dust */}
      <div className="absolute inset-0 z-[2]">
          {[...Array(15)].map((_, i) => (
             <motion.div
                key={i}
                className={`absolute w-1 h-1 rounded-full transition-colors duration-1000 ${isDark ? 'bg-white shadow-[0_0_10px_white]' : 'bg-black/20'}`}
                initial={{ 
                    x: Math.random() * window.innerWidth, 
                    y: window.innerHeight + 100,
                    opacity: 0,
                    scale: 0.5
                }}
                animate={{
                    y: -100,
                    opacity: [0, isDark ? 0.8 : 0.4, 0],
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

      {/* Heavy Vignette for Dark, Subtle for Light */}
      <div className={`absolute inset-0 transition-opacity duration-1000 z-[3] ${
        isDark 
          ? 'bg-radial-gradient from-transparent via-black/40 to-black opacity-90' 
          : 'bg-radial-gradient from-transparent via-transparent to-gray-200/50 opacity-50'
      }`} />
    </div>
  );
};