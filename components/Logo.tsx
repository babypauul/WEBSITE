import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      aria-label="Babypauul Logo"
    >
      {/* Premium Minimal Geometric Shape (Tunnel/Aperture Concept) */}
      <rect 
        x="15" 
        y="15" 
        width="70" 
        height="70" 
        stroke="currentColor" 
        strokeWidth="8" 
        className="text-brand-red"
      />
      <rect 
        x="38" 
        y="38" 
        width="24" 
        height="24" 
        fill="currentColor"
        className="text-white"
      />
      {/* Accents for 'Tech/Production' feel */}
      <rect x="15" y="45" width="8" height="10" fill="currentColor" className="text-brand-black" />
      <rect x="77" y="45" width="8" height="10" fill="currentColor" className="text-brand-black" />
    </svg>
  );
};