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
      className="group relative bg-[#0A0A0A] rounded-2xl overflow-hidden border border-white/5 cursor-pointer h-full flex flex-col shadow-lg"
      whileHover={{ 
        y: -12,
        scale: 1.02,
        boxShadow: "0 25px 50px -12px rgba(225, 6, 0, 0.25)",
        borderColor: "rgba(225, 6, 0, 0.4)"
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={() => playTrack(track)}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <motion.img 
          src={track.cover} 
          alt={track.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1 filter brightness-90 group-hover:brightness-100"
          loading="lazy"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

        {/* Play Overlay */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isActuallyPlaying ? 'bg-black/60 opacity-100' : 'bg-black/20 opacity-0 group-hover:opacity-100 backdrop-blur-[2px]'}`}>
          <motion.div 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`w-16 h-16 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-colors ${isActuallyPlaying ? 'bg-brand-red text-white' : 'bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-brand-red hover:border-brand-red'}`}
          >
            {isActuallyPlaying ? (
              <Pause size={28} fill="currentColor" />
            ) : (
              <Play size={28} fill="currentColor" className="ml-1" />
            )}
          </motion.div>
        </div>
      </div>

      {/* Info */}
      <div className="p-6 relative flex-grow flex flex-col justify-between bg-gradient-to-b from-[#0F0F0F] to-[#050505]">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-white font-bold text-xl leading-tight group-hover:text-brand-red transition-colors duration-300 line-clamp-1">{track.title}</h3>
          </div>
          <p className="text-brand-gray font-medium text-sm mb-3 group-hover:text-white transition-colors duration-300">{track.artist}</p>
          <p className="text-brand-gray/50 text-xs line-clamp-2 mb-4 font-light leading-relaxed group-hover:text-brand-gray transition-colors">
            {track.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-2 pt-4 border-t border-white/5 group-hover:border-white/10 transition-colors">
          {track.releaseDate && (
            <span className="text-[10px] text-brand-gray/40 font-mono uppercase tracking-widest group-hover:text-brand-gray/70">
              {new Date(track.releaseDate).getFullYear()}
            </span>
          )}
          {track.spotifyUrl && (
            <a 
              href={track.spotifyUrl}
              onClick={(e) => e.stopPropagation()}
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