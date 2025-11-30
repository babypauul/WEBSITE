import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, ShoppingCart, BarChart2, Plus } from 'lucide-react';
import { Track } from '../types';
import { usePlayer } from '../context/PlayerContext';
import { useCart } from '../context/CartContext';

interface BeatCardProps {
  beat: Track;
}

export const BeatCard: React.FC<BeatCardProps> = ({ beat }) => {
  const { currentTrack, isPlaying, playTrack } = usePlayer();
  const { addToCart } = useCart();
  const isCurrent = currentTrack?.id === beat.id;
  const isActuallyPlaying = isCurrent && isPlaying;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(beat, 'MP3');
  };

  const [genre, bpm] = beat.description ? beat.description.split('•').map(s => s.trim()) : ['Trap', '140 BPM'];

  return (
    <motion.div 
      className="group relative flex flex-col gap-0 w-full bg-transparent"
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Artwork Container */}
      <div 
        className="relative aspect-square w-full overflow-hidden rounded-lg bg-[#111] cursor-pointer shadow-lg group-hover:shadow-[0_20px_40px_-10px_rgba(225,6,0,0.3)] transition-all duration-500 border border-white/5 group-hover:border-brand-red/30"
        onClick={() => playTrack(beat)}
      >
        <img 
          src={beat.cover} 
          alt={beat.title} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1 filter grayscale-[0.2] group-hover:grayscale-0"
          loading="lazy"
        />
        
        {/* Cinematic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

        {/* Play Button Overlay - Centered */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isActuallyPlaying ? 'opacity-100 bg-black/40' : 'opacity-0 group-hover:opacity-100 backdrop-blur-[2px]'}`}>
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-red text-white shadow-[0_0_30px_rgba(225,6,0,0.6)] transform scale-90 group-hover:scale-100 transition-all duration-300">
            {isActuallyPlaying ? (
              <Pause size={28} fill="currentColor" />
            ) : (
              <Play size={28} fill="currentColor" className="ml-1" />
            )}
          </div>
        </div>

        {/* Status Badge */}
        {isCurrent && (
           <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-black/80 backdrop-blur-md border border-brand-red/50 text-brand-red text-[10px] font-bold uppercase tracking-widest rounded-full shadow-xl z-10">
              <BarChart2 size={12} className="animate-pulse" /> Playing
           </div>
        )}

        {/* Quick Action - Top Right */}
        <button
          onClick={handleAddToCart}
          className="absolute top-4 right-4 p-3 bg-white text-black hover:bg-brand-red hover:text-white rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl z-10"
          title="Add to Cart"
        >
          <ShoppingCart size={16} />
        </button>
      </div>

      {/* Info Section - Clean & Minimal */}
      <div className="pt-5 px-1 flex flex-col gap-1">
         <div className="flex justify-between items-end">
            <h3 
              className="text-2xl font-black text-white uppercase tracking-tighter leading-none group-hover:text-brand-red transition-colors cursor-pointer"
              onClick={() => playTrack(beat)}
            >
               {beat.title}
            </h3>
            <span className="text-xl font-bold text-brand-red tracking-tight font-mono">${beat.price}</span>
         </div>
         
         <div className="flex justify-between items-center mt-2 border-t border-white/10 pt-3">
            <div className="flex gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gray/60">
               <span>{genre}</span>
               <span className="text-brand-red/50">•</span>
               <span>{bpm}</span>
            </div>
            
            <button 
               onClick={handleAddToCart}
               className="text-[10px] font-bold uppercase tracking-widest text-white hover:text-brand-red transition-colors flex items-center gap-1 group/txt"
            >
               Add <Plus size={12} className="group-hover/txt:rotate-90 transition-transform duration-300" />
            </button>
         </div>
      </div>
    </motion.div>
  );
};