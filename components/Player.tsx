import React from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, Maximize2 } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { motion } from 'framer-motion';

export const Player: React.FC = () => {
  const { currentTrack, isPlaying, togglePlay, progress, duration, seek } = usePlayer();

  if (!currentTrack) return null;

  const formatTime = (seconds: number) => {
    if (!seconds) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    seek(Number(e.target.value));
  };

  const progressPercent = duration ? (progress / duration) * 100 : 0;

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 h-[90px] bg-[#0A0A0A]/90 backdrop-blur-xl border-t border-white/10 z-50 px-4 md:px-8 flex items-center justify-between shadow-[0_-10px_40px_rgba(0,0,0,0.6)]"
    >
      {/* Glowing Line on Top */}
      <div className="absolute top-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-brand-red to-transparent w-full opacity-50" />

      {/* Track Info */}
      <div className="flex items-center gap-5 w-1/4 md:w-1/3">
        <div className="relative group">
          <img 
            src={currentTrack.cover} 
            alt={currentTrack.title} 
            className="w-14 h-14 object-cover rounded-md shadow-lg border border-white/10"
          />
           {/* Now Playing Visualizer */}
           {isPlaying && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-[2px] rounded-md backdrop-blur-[1px]">
              {[1, 2, 3, 4].map((bar) => (
                <div 
                  key={bar}
                  className="w-1 bg-brand-red rounded-full"
                  style={{ 
                    animation: `equalizer 0.8s infinite ease-in-out`, 
                    animationDelay: `${bar * 0.1}s`,
                    height: '40%' 
                  }}
                />
              ))}
            </div>
           )}
        </div>
        
        <div className="hidden sm:block overflow-hidden">
          <h4 className="text-white font-bold text-sm truncate max-w-[200px] tracking-wide">{currentTrack.title}</h4>
          <p className="text-brand-gray text-xs truncate max-w-[200px] uppercase tracking-wider opacity-70">{currentTrack.artist}</p>
        </div>
      </div>

      {/* Controls & Progress */}
      <div className="flex flex-col items-center flex-1 max-w-xl px-4">
        <div className="flex items-center gap-8 mb-2">
          <button className="text-brand-gray hover:text-white transition-colors hover:scale-110 active:scale-95 p-2">
            <SkipBack size={20} />
          </button>
          <button 
            onClick={togglePlay}
            className="w-12 h-12 rounded-full bg-white text-brand-black flex items-center justify-center hover:bg-brand-red hover:text-white hover:shadow-[0_0_25px_rgba(225,6,0,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 border border-transparent hover:border-brand-red/50"
          >
            {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
          </button>
          <button className="text-brand-gray hover:text-white transition-colors hover:scale-110 active:scale-95 p-2">
            <SkipForward size={20} />
          </button>
        </div>
        
        <div className="w-full flex items-center gap-4 text-[10px] text-brand-gray font-mono tracking-widest">
          <span className="min-w-[35px] text-right">{formatTime(progress)}</span>
          
          {/* Custom Range Input with Neon Glow */}
          <div className="relative flex-1 h-1 group cursor-pointer">
             <div className="absolute inset-0 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                <div 
                  className="h-full bg-brand-red relative shadow-[0_0_15px_rgba(225,6,0,0.8)]"
                  style={{ width: `${progressPercent}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,1)] scale-0 group-hover:scale-100 transition-transform duration-200" />
                </div>
             </div>
             <input
              type="range"
              min="0"
              max={duration || 100}
              value={progress}
              onChange={handleSeek}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
          </div>

          <span className="min-w-[35px]">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Volume / Extras */}
      <div className="w-1/4 md:w-1/3 flex justify-end items-center gap-6 pr-2">
        <div className="hidden md:flex items-center gap-3 group w-32">
           <Volume2 size={16} className="text-brand-gray group-hover:text-white transition-colors" />
           <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
             <div className="w-3/4 h-full bg-brand-gray group-hover:bg-brand-red transition-colors"></div>
           </div>
        </div>
        <button className="text-brand-gray hover:text-brand-red transition-colors p-2 hover:bg-white/5 rounded-full">
          <Maximize2 size={18} />
        </button>
      </div>
      
      <style>{`
        @keyframes equalizer {
          0%, 100% { height: 40%; }
          50% { height: 80%; }
        }
      `}</style>
    </motion.div>
  );
};