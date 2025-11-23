import React from 'react';
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

  // Motion variants for the button container
  const buttonMotion = {
    rest: { y: 0, scale: 1 },
    hover: { 
      y: -3, 
      scale: 1.02,
      boxShadow: variant === 'primary' 
        ? '0 15px 40px rgba(225,6,0,0.4)' 
        : '0 10px 30px rgba(225,6,0,0.15)',
      transition: { type: "spring", stiffness: 400, damping: 15 }
    },
    tap: { scale: 0.97, y: 0 }
  };

  return (
    <motion.button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      variants={buttonMotion}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      {...props as any} // Cast to any to avoid motion/html prop conflicts
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