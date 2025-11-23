import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  
  // Mouse position
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Smooth physics for the trailing circle
  const springConfig = { damping: 30, stiffness: 450, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX); 
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check for interactive elements
      const isInteractive = 
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.tagName.toLowerCase() === 'input' ||
        target.tagName.toLowerCase() === 'select' ||
        target.tagName.toLowerCase() === 'textarea' ||
        target.classList.contains('cursor-hover') ||
        window.getComputedStyle(target).cursor === 'pointer';

      setIsHovering(!!isInteractive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseOut = () => setIsHovering(false);

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Main Dot - High z-index, drop shadow for visibility on Red */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-brand-red rounded-full pointer-events-none z-[9999] border-[0.5px] border-white/50 shadow-[0_0_2px_rgba(0,0,0,0.8)]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      
      {/* Glassy Glow Trail */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div 
          className="rounded-full border border-white/20 backdrop-blur-[1px]"
          animate={{
            width: isHovering ? 50 : 20,
            height: isHovering ? 50 : 20,
            backgroundColor: isHovering ? 'rgba(225, 6, 0, 0.15)' : 'rgba(255, 255, 255, 0.01)',
            borderColor: isHovering ? 'rgba(225, 6, 0, 0.5)' : 'rgba(255, 255, 255, 0.15)',
            scale: isClicking ? 0.8 : 1,
            rotate: isHovering ? 45 : 0
          }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        />
        
        {/* Red Glow Bloom */}
        <motion.div
          className="absolute inset-0 rounded-full bg-brand-red blur-xl"
          animate={{
            opacity: isHovering ? 0.4 : 0,
            scale: isHovering ? 1.8 : 0.5,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </>
  );
};