import React from 'react';
import { motion } from 'framer-motion';

interface GlitchTextProps {
  text: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const GlitchText: React.FC<GlitchTextProps> = ({ text, className = "", size = 'lg' }) => {
  return (
    <div className={`relative inline-block group cursor-default ${className}`}>
      {/* Main Text */}
      <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500">
        {text}
      </span>
      
      {/* Glitch Layers - Only active on hover or interval */}
      <span 
        className="absolute top-0 left-0 -z-10 w-full h-full text-brand-red opacity-0 group-hover:opacity-70 group-hover:animate-pulse group-hover:translate-x-[2px]"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)', transform: 'translate(-2px)' }}
      >
        {text}
      </span>
      <span 
        className="absolute top-0 left-0 -z-10 w-full h-full text-blue-500 opacity-0 group-hover:opacity-70 group-hover:animate-pulse group-hover:-translate-x-[2px]"
        style={{ clipPath: 'polygon(0 80%, 100% 20%, 100% 100%, 0 100%)', transform: 'translate(2px)' }}
      >
        {text}
      </span>
    </div>
  );
};