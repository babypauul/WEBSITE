import React from 'react';
import { motion } from 'framer-motion';

interface ScrollingMarqueeProps {
  text: string;
  direction?: 'left' | 'right';
  speed?: number;
  className?: string;
}

export const ScrollingMarquee: React.FC<ScrollingMarqueeProps> = ({ 
  text, 
  direction = 'left', 
  speed = 20, 
  className = "" 
}) => {
  return (
    <div className={`flex overflow-hidden whitespace-nowrap select-none pointer-events-none opacity-5 ${className}`}>
      <motion.div
        className="flex gap-10"
        animate={{ x: direction === 'left' ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
      >
        {[...Array(4)].map((_, i) => (
          <span key={i} className="text-[10vw] font-black uppercase text-white/10 tracking-tighter leading-none stroke-text">
            {text}
          </span>
        ))}
      </motion.div>
      <style>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.2);
          color: transparent;
        }
      `}</style>
    </div>
  );
};