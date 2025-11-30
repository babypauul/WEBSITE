import React from 'react';
import { motion } from 'framer-motion';
import { CREDITS_DATA } from '../constants';

export const CreditTicker: React.FC = () => {
    // Duplicate data for seamless loop
    const displayCredits = [...CREDITS_DATA, ...CREDITS_DATA, ...CREDITS_DATA, ...CREDITS_DATA];

    return (
        <div className="w-full overflow-hidden border-y border-white/5 py-12 bg-white/[0.02] relative group">
            {/* Fade Edges */}
            <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />
            
            <motion.div 
                className="flex gap-20 w-max"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
                style={{ willChange: 'transform' }}
            >
                {displayCredits.map((credit, i) => (
                    <div key={i} className="flex flex-col items-center justify-center opacity-40 hover:opacity-100 transition-opacity duration-500 cursor-default">
                        <span className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 stroke-text hover:text-brand-red transition-colors duration-300">
                            {credit.artist}
                        </span>
                        <div className="flex items-center gap-3 mt-2">
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gray">
                                {credit.role}
                            </span>
                            <span className="w-1 h-1 bg-brand-red rounded-full"></span>
                            <span className="text-[10px] font-mono text-brand-red">
                                {credit.year}
                            </span>
                        </div>
                    </div>
                ))}
            </motion.div>

            <style>{`
                .stroke-text {
                    -webkit-text-stroke: 1px rgba(255, 255, 255, 0.1);
                }
                .group:hover .stroke-text {
                     -webkit-text-stroke: 0px;
                }
            `}</style>
        </div>
    )
}