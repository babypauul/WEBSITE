import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Plus, ShoppingCart, BarChart2 } from 'lucide-react';
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
      className="group relative w-full cursor-pointer"
      initial="rest"
      whileHover="hover"
      onClick={() => playTrack(beat)}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#111] shadow-2xl group-hover:shadow-[0_0_30px_rgba(225,6,0,0.3)] transition-shadow duration-500">
        <motion.img
          src={beat.cover}
          alt={beat.title}
          className="h-full w-full object-cover opacity-90 transition-opacity duration-500 group-hover:opacity-100"
          variants={{
            rest: { scale: 1 },
            hover: { scale: 1.05, transition: { duration: 0.4, ease: "easeOut" } }
          }}
          loading="lazy"
        />

        {/* Cinematic Noise/Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
        <div className="absolute inset-0 bg-brand-red/0 group-hover:bg-brand-red/10 transition-colors duration-500 mix-blend-overlay" />
        
        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
                className={`flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-md transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.5)] ${isActuallyPlaying ? 'scale-100 opacity-100 bg-brand-red/80 border-brand-red box-glow' : 'scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100'}`}
            >
                 {isActuallyPlaying ? (
                  <Pause size={24} className="text-white" fill="currentColor" />
                ) : (
                  <Play size={24} className="text-white ml-1" fill="currentColor" />
                )}
            </motion.div>
        </div>

        {/* Top Right Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
             <motion.button
                variants={{
                    rest: { opacity: 0, x: 10 },
                    hover: { opacity: 1, x: 0, transition: { delay: 0.1 } }
                }}
                onClick={handleAddToCart}
                className="flex items-center justify-center h-8 w-8 bg-white text-brand-black rounded-full shadow-lg hover:bg-brand-red hover:text-white transition-all duration-300"
                title="Add to Cart"
             >
                <Plus size={16} />
             </motion.button>
        </div>
        
        {/* Playing Indicator */}
        {isCurrent && (
            <div className="absolute top-3 left-3 px-2 py-1 bg-brand-red text-white text-[9px] font-bold uppercase tracking-widest flex items-center gap-1 rounded-full shadow-lg z-10 box-glow">
                <BarChart2 size={10} className="animate-pulse"/> Playing
            </div>
        )}
      </div>

      {/* Details */}
      <div className="mt-4 flex flex-col gap-1 px-1">
        <div className="flex items-end justify-between border-b border-white/10 pb-2 mb-2">
           <h3 className="text-lg font-black uppercase tracking-tighter text-white group-hover:text-brand-red transition-colors duration-300 line-clamp-1 text-glow">
             {beat.title}
           </h3>
           <span className="font-mono text-base font-bold text-brand-red tracking-tight">${beat.price}</span>
        </div>
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-500 group-hover:text-neutral-300 transition-colors">
                <span>{beat.description?.split('•')[0] || 'Trap'}</span>
                <span className="text-brand-red">•</span>
                <span>{beat.description?.split('•')[1] || '140 BPM'}</span>
            </div>
            <button 
                onClick={handleAddToCart}
                className="text-[9px] font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors flex items-center gap-1"
            >
                <ShoppingCart size={10} /> Buy
            </button>
        </div>
      </div>
    </motion.div>
  );
};