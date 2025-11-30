import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation, Variant } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  className?: string;
}

export const Reveal: React.FC<RevealProps> = ({ children, width = "fit-content", delay = 0.25, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-75px" });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  return (
    <div ref={ref} style={{ position: "relative", width }} className={className}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75, filter: "blur(10px)" },
          visible: { 
            opacity: 1, 
            y: 0, 
            filter: "blur(0px)",
            transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: delay } // Cinematic Easing
          },
        }}
        initial="hidden"
        animate={mainControls}
      >
        {children}
      </motion.div>
    </div>
  );
};