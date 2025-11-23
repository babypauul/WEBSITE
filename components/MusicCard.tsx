import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, ExternalLink } from 'lucide-react';
import { Track } from '../types';
import { usePlayer } from '../context/PlayerContext';

interface MusicCardProps {
  track: Track;
}

export const MusicCard: React.FC<MusicCardProps> = ({ track }) => {
  const { currentTrack, isPlaying, playTrack } = usePlayer();
  const isCurrent = currentTrack?.id === track.id;
  const isActuallyPlaying = isCurrent && isPlaying;

  return (
    <motion.div 
      className="group relative bg-brand-dark rounded-2xl overflow-hidden border border-white/5 cursor-hover h-full flex flex-col"
      whileHover={{ 
        y: -10,
        scale: 1.02,
        boxShadow: "0 30px 60px -12px rgba(225, 6, 0, 0.25)",
        borderColor: "rgba(225, 6, 0, 0.3)"
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={track.cover} 
          alt={track.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent opacity-60" />

        {/* Play Overlay */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isActuallyPlaying ? 'bg-black/60 opacity-100' : 'bg-black/30 opacity-0 group-hover:opacity-100'}`}>
          <motion.button 
            onClick={() => playTrack(track)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-[0_0_30px_rgba(225,6,0,0.4)] group-hover:bg-brand-red group-hover:border-brand-red transition-colors"
            aria-label={isActuallyPlaying ? "Pause" : "Play"}
          >
            {isActuallyPlaying ? (
              <Pause size={28} fill="currentColor" />
            ) : (
              <Play size={28} fill="currentColor" className="ml-1" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Info */}
      <div className="p-6 relative flex-grow flex flex-col justify-between bg-gradient-to-b from-brand-black/50 to-brand-black">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-white font-bold text-xl leading-tight group-hover:text-brand-red transition-colors">{track.title}</h3>
          </div>
          <p className="text-brand-gray font-medium text-sm mb-3">{track.artist}</p>
          <p className="text-brand-gray/60 text-xs line-clamp-2 mb-4 font-light leading-relaxed">
            {track.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-2 pt-4 border-t border-white/5">
          {track.releaseDate && (
            <span className="text-[10px] text-brand-gray/50 font-mono uppercase tracking-widest">
              {new Date(track.releaseDate).getFullYear()}
            </span>
          )}
          {track.spotifyUrl && (
            <a 
              href={track.spotifyUrl}
              className="inline-flex items-center text-[10px] font-bold text-brand-gray hover:text-white transition-colors uppercase tracking-widest"
            >
              Spotify <ExternalLink size={10} className="ml-1" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};