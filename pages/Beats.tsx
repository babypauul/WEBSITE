import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BeatCard } from '../components/BeatCard';
import { BEAT_DATA } from '../constants';
import { ShoppingCart, Loader2 } from 'lucide-react';
import { Track } from '../types';

export const Beats: React.FC = () => {
  const [beats, setBeats] = useState<Track[]>(BEAT_DATA);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Simulated infinite scroll
  const loadMore = () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    
    setTimeout(() => {
      const newBeats = BEAT_DATA.map(b => ({...b, id: `${b.id}-${Date.now()}`}));
      setBeats(prev => [...prev, ...newBeats]);
      setIsLoading(false);
      // Stop after a few loads for demo purposes
      if (beats.length > 20) setHasMore(false);
    }, 1500);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !isLoading && hasMore) {
        loadMore();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading, hasMore, beats]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-screen">
       <div className="text-center max-w-4xl mx-auto mb-24 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-60 h-60 bg-brand-red/10 blur-[100px] rounded-full pointer-events-none"></div>
        
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="relative z-10"
        >
           <h2 className="text-brand-red font-bold uppercase tracking-[0.3em] text-sm mb-3">Marketplace</h2>
           <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tight leading-none">
             BEAT STORE
           </h1>
           <div className="w-24 h-1 bg-brand-red mx-auto mb-8 shadow-[0_0_10px_rgba(225,6,0,0.5)]"></div>
        </motion.div>
        
        <motion.p 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.2 }}
           className="text-brand-gray text-xl font-light"
        >
          Premium instrumentals. Instant download. <span className="text-white font-bold border-b border-brand-red">Commercial Rights Included.</span>
        </motion.p>
      </div>

      <div className="flex flex-col gap-6 max-w-5xl mx-auto">
        {beats.map((beat, index) => (
          <motion.div
            key={beat.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: (index % 10) * 0.1, duration: 0.4 }}
          >
            <BeatCard beat={beat} />
          </motion.div>
        ))}
      </div>
      
      {isLoading && (
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin text-brand-red w-8 h-8" />
        </div>
      )}

      {/* Promo Section */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-24 p-12 bg-gradient-to-r from-brand-dark/80 to-brand-dark/40 backdrop-blur-md rounded-2xl border border-white/5 text-center relative overflow-hidden shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/10 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="relative z-10">
           <ShoppingCart className="w-12 h-12 text-brand-red mx-auto mb-6 opacity-80" />
           <h3 className="text-3xl font-bold text-white mb-2 uppercase tracking-wide">Bulk Discounts</h3>
           <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm font-bold uppercase tracking-widest text-brand-gray">
              <span className="px-4 py-2 border border-brand-red/30 rounded-full bg-brand-red/5 text-white">Buy 2 Get 1 Free</span>
              <span className="px-4 py-2 border border-brand-red/30 rounded-full bg-brand-red/5 text-white">Buy 3 Get 2 Free</span>
           </div>
        </div>
      </motion.div>
    </div>
  );
};