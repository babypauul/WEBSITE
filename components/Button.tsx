import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  ...props 
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = e.clientX - (left + width / 2);
    const y = e.clientY - (top + height / 2);
    setPosition({ x: x * 0.2, y: y * 0.2 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  // Apple Glass / Premium Styles
  const baseStyles = "relative inline-flex items-center justify-center px-8 py-4 font-sans font-bold text-sm tracking-[0.15em] uppercase transition-all duration-300 focus:outline-none rounded-lg overflow-hidden cursor-hover group";
  
  const variants = {
    primary: `
      text-white
      bg-brand-red/80
      border border-white/10
      backdrop-blur-xl
      shadow-[0_8px_32px_rgba(225,6,0,0.25)]
    `,
    outline: `
      text-white
      bg-white/5
      border border-white/10
      backdrop-blur-md
      shadow-[0_8px_32px_rgba(0,0,0,0.1)]
      hover:border-brand-red/30
    `,
    ghost: "text-brand-gray hover:text-white hover:bg-white/5 backdrop-blur-sm"
  };

  return (
    <motion.button 
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props as any} 
    >
      {/* Glass Highlight / Sheen */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-50 pointer-events-none" />
      
      {/* Animated Red Glow Background (for Outline) */}
      {variant === 'outline' && (
        <motion.div 
          className="absolute inset-0 bg-brand-red/0 group-hover:bg-brand-red/10 transition-colors duration-300"
        />
      )}

      {/* Diagonal Shimmer Effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0 pointer-events-none" />
      
      {/* Content */}
      <span className="relative z-10 flex items-center text-shadow-sm">{children}</span>
    </motion.button>
  );
};