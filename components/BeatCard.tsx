
import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, ShoppingCart } from 'lucide-react';
import { Track } from '../types';
import { usePlayer } from '../context/PlayerContext';
import { Button } from './Button';

interface BeatCardProps {
  beat: Track;
}

export const BeatCard: React.FC<BeatCardProps> = ({ beat }) => {
  const { currentTrack, isPlaying, playTrack } = usePlayer();
  const isCurrent = currentTrack?.id === beat.id;
  const isActuallyPlaying = isCurrent && isPlaying;

  // Parse description safely
  const parts = beat.description ? beat.description.split('•').map(s => s.trim()) : [];
  const genre = parts[0] || 'Beat';
  const bpm = parts[1] || '';
  const musicKey = parts[2] || '';

  const handlePurchase = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    if (beat.checkoutUrl) {
      window.open(beat.checkoutUrl, '_blank');
    } else {
      console.warn("No checkout URL configured for track:", beat.title);
      // Fallback or alert if needed
    }
  };

  return (
    <motion.div 
      className="relative bg-white/[0.02] backdrop-blur-sm border border-white/5 rounded-xl p-5 flex flex-col sm:flex-row items-center gap-6 group cursor-hover overflow-hidden"
      whileHover={{ 
        y: -4,
        backgroundColor: "rgba(255, 255, 255, 0.04)",
        borderColor: "rgba(225, 6, 0, 0.2)",
        boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5)"
      }}
      transition={{ duration: 0.2 }}
    >
      {/* Glow Gradient Effect on Hover */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-brand-red/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Cover / Play */}
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 rounded-lg overflow-hidden shadow-2xl group-hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-shadow duration-500 ring-1 ring-white/10">
        <img 
          src={beat.cover} 
          alt={beat.title} 
          className="w-full h-full object-cover filter brightness-[0.8] contrast-110 group-hover:brightness-100 group-hover:scale-110 transition-all duration-700"
          loading="lazy"
        />
        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-all duration-300 ${isActuallyPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
          <button 
            onClick={() => playTrack(beat)}
            className="w-10 h-10 rounded-full bg-brand-red text-white flex items-center justify-center hover:scale-110 transition-transform shadow-[0_0_20px_rgba(225,6,0,0.5)] backdrop-blur-sm border border-white/10"
          >
             {isActuallyPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="flex-grow text-center sm:text-left z-10 w-full sm:w-auto flex flex-col justify-center h-full">
        <h3 className="text-white font-black text-3xl group-hover:text-brand-red transition-colors tracking-tighter uppercase leading-none mb-2">{beat.title}</h3>
        
        {/* Clean Metadata Text */}
        <p className="text-brand-gray/60 font-bold uppercase text-[10px] tracking-[0.2em]">
           <span className="text-brand-gray">{genre}</span>
           {bpm && <span className="text-brand-red mx-2">•</span>}
           {bpm && <span>{bpm}</span>}
           {musicKey && <span className="text-brand-red mx-2">•</span>}
           {musicKey && <span>{musicKey}</span>}
        </p>
      </div>

      {/* Price / Action */}
      <div className="flex flex-col items-center sm:items-end gap-2 min-w-[140px] z-10 w-full sm:w-auto mt-2 sm:mt-0 border-t sm:border-t-0 sm:border-l border-white/5 pt-4 sm:pt-0 sm:pl-6">
        <span className="text-2xl font-black text-white tracking-tighter drop-shadow-lg">${beat.price}</span>
        <Button 
          variant="primary" 
          onClick={handlePurchase}
          className="py-3 px-6 text-[10px] w-full sm:w-auto shadow-none hover:shadow-lg !bg-brand-red !tracking-widest !font-bold !border-none relative overflow-hidden group/btn"
        >
          {/* Subtle sheen animation */}
          <div className="absolute inset-0 -translate-x-full group-hover/btn:animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />
          <div className="flex items-center justify-center">
             <ShoppingCart size={12} className="mr-2" /> PURCHASE
          </div>
        </Button>
      </div>
    </motion.div>
  );
};
