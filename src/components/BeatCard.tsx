import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, ShoppingCart } from 'lucide-react';
import { Track } from '../types';
import { usePlayer } from '../context/PlayerContext';
import { useCart } from '../context/CartContext';
import { Button } from './Button';

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

  return (
    <motion.div 
      className="group relative bg-[#0F0F0F] border border-white/5 rounded-2xl overflow-hidden hover:border-brand-red/30 hover:shadow-[0_0_30px_rgba(225,6,0,0.15)] transition-all duration-300 h-full flex flex-col"
      whileHover={{ y: -5 }}
      onClick={() => playTrack(beat)}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={beat.cover} 
          alt={beat.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
          loading="lazy"
        />
        
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

        {/* Play Button Overlay */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isActuallyPlaying ? 'bg-black/40 opacity-100' : 'bg-black/20 opacity-0 group-hover:opacity-100'}`}>
          <div className="w-16 h-16 rounded-full bg-brand-red text-white flex items-center justify-center shadow-[0_0_20px_rgba(225,6,0,0.5)] backdrop-blur-md transform group-hover:scale-110 transition-transform">
             {isActuallyPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
          </div>
        </div>
      </div>

      {/* Info Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-1">
          <h3 className="text-white font-black text-xl uppercase tracking-tighter leading-none group-hover:text-brand-red transition-colors truncate">
            {beat.title}
          </h3>
          <p className="text-[10px] font-bold text-brand-gray/60 uppercase tracking-widest mt-1">
            {beat.description?.split('•')[0] || 'BEAT'}
          </p>
        </div>

        <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/5">
           <span className="text-xl font-bold text-white font-mono">${beat.price}</span>
           
           <button 
             onClick={handleAddToCart}
             className="flex items-center gap-2 text-xs font-bold text-brand-gray hover:text-white bg-white/5 hover:bg-brand-red hover:border-brand-red border border-white/10 px-4 py-2 rounded-lg transition-all uppercase tracking-wider"
           >
             <ShoppingCart size={14} /> Add
           </button>
        </div>
      </div>
    </motion.div>
  );
};