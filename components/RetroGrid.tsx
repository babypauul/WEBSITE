import React from "react";

export const RetroGrid: React.FC = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden [perspective:200px] z-0">
      {/* Grid Container */}
      <div className="absolute inset-0 [transform:rotateX(35deg)] origin-top">
        <div
          className="animate-grid [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_0),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_0)] [background-size:60px_60px] [height:400%] [width:100%]"
        />
      </div>

      {/* Fade Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
      
      <style>{`
        @keyframes grid {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        .animate-grid {
          animation: grid 20s linear infinite;
        }
      `}</style>
    </div>
  );
};