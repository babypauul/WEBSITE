import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Star, Disc, Music, Sliders, Mic2, Layers, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { BeatCard } from '../components/BeatCard';
import { BEAT_DATA, CREDITS_DATA } from '../constants';
import { Reveal } from '../components/Reveal';
import { ScrollingMarquee } from '../components/ScrollingMarquee';

export const Home: React.FC = () => {
  const featuredBeats = BEAT_DATA.slice(0, 3);
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="w-full bg-transparent overflow-hidden">
      {/* --- HERO SECTION --- */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <ScrollingMarquee text="KILLSTREET STUDIO // EST 2024" className="absolute top-[20%] opacity-[0.05] -rotate-3 scale-110 pointer-events-none" />
        
        <motion.div 
          style={{ opacity: opacityHero, y: yText }}
          className="relative z-10 max-w-5xl mx-auto px-4 w-full flex flex-col items-center text-center"
        >
           <div className="z-20 flex flex-col items-center">
              <Reveal delay={0.2} width="100%">
                <div className="mb-6 relative">
                   <h1 className="text-8xl md:text-[10rem] font-black tracking-tighter leading-[0.8] text-white mix-blend-difference drop-shadow-2xl text-center">
                      TUNNEL<br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">VISION</span>
                   </h1>
                </div>
              </Reveal>

              <Reveal delay={0.4}>
                <p className="text-brand-gray text-lg md:text-xl font-light max-w-lg mx-auto leading-relaxed mb-10 border-l-2 border-brand-red/50 pl-6 text-left md:text-center md:border-l-0 md:pl-0">
                   Defining the sound of the underground. Dark, cinematic production for artists who want to bleed through the noise.
                </p>
              </Reveal>

              <Reveal delay={0.6}>
                <div className="flex gap-4 justify-center">
                  <Link to="/beats">
                    <Button variant="primary" className="shadow-[0_0_40px_rgba(225,6,0,0.3)]">
                       Beat Store <ArrowRight size={18} className="ml-2" />
                    </Button>
                  </Link>
                  <Link to="/music">
                    <Button variant="outline">Listen</Button>
                  </Link>
                </div>
              </Reveal>
           </div>
        </motion.div>
        
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-gradient-radial from-brand-red/10 to-transparent opacity-40 blur-[100px] pointer-events-none z-0" />
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* --- LATEST DROPS --- */}
        <section className="py-24 border-b border-white/5">
           <Reveal width="100%">
             <div className="flex justify-between items-end mb-12">
               <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase">Latest Drops</h3>
               <Link to="/music" className="hidden md:flex items-center text-sm font-bold uppercase tracking-widest text-brand-gray hover:text-white transition-colors group">
                  View Discography <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
               </Link>
             </div>
           </Reveal>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {["7IbqNeOivzHYdXD7J6uHSq", "43uLpGO5OagtSVFSAoOIUl", "3tgbo7ajgLyIE8qbN3dNU8"].map((id, i) => (
                <Reveal key={id} delay={i * 0.1}>
                  <div className="group relative flex flex-col h-full bg-[#0F0F0F] rounded-xl overflow-hidden border border-white/5 hover:border-brand-red/30 transition-all duration-300 shadow-2xl">
                     <iframe 
                       style={{ borderRadius: '0px' }} 
                       src={`https://open.spotify.com/embed/track/${id}?utm_source=generator&theme=0`}
                       width="100%" 
                       height="352" 
                       frameBorder={0} 
                       allowFullScreen={true}
                       allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                       loading="lazy"
                       className="opacity-90 group-hover:opacity-100 transition-opacity"
                     />
                  </div>
                </Reveal>
             ))}
           </div>
        </section>

        {/* --- MARKETPLACE --- */}
        <section className="py-24 relative">
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-full bg-gradient-radial from-brand-red/5 to-transparent blur-[120px] pointer-events-none -z-10" />

          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
               <div className="relative">
                  <h2 className="text-brand-red font-bold uppercase tracking-[0.3em] text-xs mb-4 flex items-center gap-2">
                     <Zap size={12} fill="currentColor" /> Marketplace
                  </h2>
                  <h3 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none">
                     FEATURED
                     <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600">BEATS</span>
                  </h3>
               </div>
               <Link to="/beats" className="mb-2">
                  <Button variant="outline" className="px-8 text-xs border-brand-red/30 hover:border-brand-red hover:bg-brand-red/10">
                     View All Beats <ArrowRight size={14} className="ml-2" />
                  </Button>
               </Link>
            </div>
          </Reveal>

          {/* New Clean Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
            {featuredBeats.map((beat, i) => (
               <Reveal key={beat.id} delay={i * 0.1}>
                  <BeatCard beat={beat} />
               </Reveal>
            ))}
          </div>

          {/* Licensing Snapshot */}
          <div className="mt-32 border-t border-white/5 pt-16">
             <Reveal width="100%">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   {[
                      { name: 'Basic Lease', price: '$29.99', features: ['MP3 (320kbps)', '50k Streams', 'Non-Exclusive'] },
                      { name: 'Premium Lease', price: '$49.99', features: ['WAV + MP3', '500k Streams', 'Track Stems'], highlight: true },
                      { name: 'Exclusive', price: 'Make Offer', features: ['Full Ownership', 'Unlimited', 'Publishing'] },
                   ].map((tier, i) => (
                      <div key={i} className={`group relative p-8 rounded-2xl border transition-all duration-300 ${tier.highlight ? 'bg-gradient-to-b from-brand-red/10 to-transparent border-brand-red/50' : 'bg-[#0A0A0A] border-white/5 hover:border-white/20'}`}>
                         <h5 className="text-white font-black uppercase tracking-wider text-lg mb-2">{tier.name}</h5>
                         <div className={`text-3xl font-black mb-6 ${tier.highlight ? 'text-brand-red' : 'text-white'}`}>{tier.price}</div>
                         <ul className="text-sm text-brand-gray space-y-3 mb-8">
                            {tier.features.map((f, j) => <li key={j} className="flex items-center gap-2"><div className="w-1 h-1 bg-current rounded-full" /> {f}</li>)}
                         </ul>
                         <Link to="/licensing" className="absolute bottom-8 right-8 text-xs font-bold uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">
                            View <ArrowRight size={12} className="inline ml-1" />
                         </Link>
                      </div>
                   ))}
                </div>
             </Reveal>
          </div>
        </section>

        {/* --- SERVICES --- */}
        <section className="py-24 border-t border-white/5">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <Reveal>
                 <h2 className="text-brand-red font-bold uppercase tracking-[0.3em] text-sm mb-4">Studio Services</h2>
                 <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">PROFESSIONAL ENGINEERING</h3>
                 <p className="text-brand-gray text-lg leading-relaxed mb-8">
                    Beyond beats, Killstreet Studio offers full-service mixing and mastering. 
                    Get your tracks radio-ready with industry standard analog processing.
                 </p>
                 <Link to="/contact">
                    <Button variant="primary">Book Session</Button>
                 </Link>
              </Reveal>

              <div className="space-y-4">
                 <Reveal delay={0.2}>
                    <div className="group flex gap-6 p-6 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors rounded-xl cursor-default hover:border-brand-red/30">
                       <div className="p-4 bg-white/5 h-fit rounded-lg group-hover:bg-brand-red group-hover:text-white transition-colors text-brand-red shadow-lg"><Sliders size={20} /></div>
                       <div>
                          <h4 className="text-lg font-bold text-white mb-2 uppercase tracking-tight">Mixing</h4>
                          <p className="text-sm text-brand-gray leading-relaxed">Vocal tuning, dynamic balancing, creative effects processing, and analog warmth.</p>
                       </div>
                    </div>
                 </Reveal>
                 <Reveal delay={0.3}>
                    <div className="group flex gap-6 p-6 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors rounded-xl cursor-default hover:border-brand-red/30">
                       <div className="p-4 bg-white/5 h-fit rounded-lg group-hover:bg-brand-red group-hover:text-white transition-colors text-brand-red shadow-lg"><Layers size={20} /></div>
                       <div>
                          <h4 className="text-lg font-bold text-white mb-2 uppercase tracking-tight">Mastering</h4>
                          <p className="text-sm text-brand-gray leading-relaxed">Loudness optimization, stereo enhancement, and final polish for streaming platforms.</p>
                       </div>
                    </div>
                 </Reveal>
              </div>
           </div>
        </section>

        {/* --- PRODUCTION CREDITS --- */}
        <section className="py-24 border-t border-white/5">
           <Reveal width="100%">
             <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                <div>
                   <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-brand-red mb-2">Selected Works</h4>
                   <h3 className="text-3xl font-black text-white uppercase tracking-tight">Production Credits</h3>
                </div>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                 {CREDITS_DATA.map((credit, i) => (
                    <div key={i} className="flex justify-between items-center py-4 border-b border-white/5 group hover:border-brand-red/50 transition-colors">
                       <h4 className="text-xl font-bold text-white uppercase tracking-tighter group-hover:translate-x-2 transition-transform duration-300">
                          {credit.artist}
                       </h4>
                       <div className="flex items-center gap-4">
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gray/60">
                             {credit.role}
                          </span>
                          <span className="text-[10px] font-mono text-brand-red border border-brand-red/20 px-2 py-1 rounded">
                             {credit.year}
                          </span>
                       </div>
                    </div>
                 ))}
             </div>
           </Reveal>
        </section>

      </div>
    </div>
  );
};