import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Plus, ShoppingCart } from 'lucide-react';
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

  return (
    <motion.div 
      className="group flex flex-col gap-4 cursor-pointer"
      onClick={() => playTrack(beat)}
      whileHover={{ y: -5 }}
    >
      {/* Artwork */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-neutral-900 shadow-2xl">
        <img 
          src={beat.cover} 
          alt={beat.title} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Play Overlay */}
        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${isActuallyPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-red text-white shadow-lg backdrop-blur-sm transition-transform hover:scale-110">
            {isActuallyPlaying ? (
              <Pause size={24} fill="currentColor" />
            ) : (
              <Play size={24} fill="currentColor" className="ml-1" />
            )}
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold uppercase leading-tight text-white group-hover:text-brand-red transition-colors">
              {beat.title}
            </h3>
            <p className="text-xs font-bold tracking-widest text-neutral-500 uppercase mt-1">
              {beat.description?.split('•')[0] || 'Instrumental'}
            </p>
          </div>
          <span className="text-sm font-mono font-bold text-white">${beat.price}</span>
        </div>

        {/* Action */}
        <button 
          onClick={handleAddToCart}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 py-2 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-brand-red hover:border-brand-red"
        >
          <ShoppingCart size={14} /> Add to Cart
        </button>
      </div>
    </motion.div>
  );
};