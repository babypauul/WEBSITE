import React from 'react';
import { motion } from 'framer-motion';
import { MusicCard } from '../components/MusicCard';
import { MUSIC_DATA } from '../constants';

export const Music: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-screen">
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto mb-24 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-brand-red/20 blur-[80px] rounded-full pointer-events-none"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
           <h2 className="text-brand-red font-bold uppercase tracking-[0.3em] text-sm mb-3">Catalogue</h2>
           <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tight leading-none">
             DISCOGRAPHY
           </h1>
           <div className="w-24 h-1 bg-brand-red mx-auto mb-8 shadow-[0_0_10px_rgba(225,6,0,0.5)]"></div>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-brand-gray text-xl max-w-lg mx-auto leading-relaxed font-light"
        >
          A collection of sonic experiments and studio releases exploring the depths of dark ambient and trap.
        </motion.p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {MUSIC_DATA.map((track, index) => (
          <motion.div
            key={track.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="h-full"
          >
            <MusicCard track={track} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};