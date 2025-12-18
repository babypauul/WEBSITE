
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sliders, Layers, Zap, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { BeatCard } from '../components/BeatCard';
import { BEAT_DATA, CREDITS_DATA } from '../constants';
import { Reveal } from '../components/Reveal';
import { ScrollingMarquee } from '../components/ScrollingMarquee';

export const Home: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div className="w-full bg-transparent overflow-hidden">
      {/* --- HERO SECTION --- */}
      <section ref={heroRef} className="relative min-h-[95vh] flex items-center justify-center overflow-hidden pt-20">
        <ScrollingMarquee text="KILLSTREET STUDIO // EST 2024" className="absolute top-[25%] opacity-[0.03] dark:opacity-[0.05] -rotate-3 scale-110 pointer-events-none text-black dark:text-white" />
        
        <motion.div 
          style={{ opacity: opacityHero, y: yText }}
          className="relative z-10 max-w-7xl mx-auto px-4 w-full flex flex-col items-center text-center"
        >
           <div className="z-20 flex flex-col items-center">
              {/* Identity Badge */}
              <Reveal delay={0.1}>
                <div className="mb-8 flex items-center gap-4 bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 px-4 py-2 rounded-full shadow-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-brand-red animate-pulse shadow-[0_0_8px_#E10600]" />
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-brand-black dark:text-white">Live Session</span>
                  </div>
                  <div className="w-[1px] h-3 bg-black/20 dark:bg-white/20" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-gray">Rovigo, IT // 45.07° N</span>
                </div>
              </Reveal>

              <Reveal delay={0.2} width="100%">
                <div className="mb-4 relative">
                   <h1 className="text-[18vw] md:text-[12rem] font-black tracking-tighter leading-[0.75] text-brand-black dark:text-white transition-colors duration-500 select-none">
                      <span className="block drop-shadow-2xl">KILL</span>
                      <motion.span 
                        animate={{ 
                          textShadow: [
                            "0 0 20px rgba(225,6,0,0)", 
                            "0 0 40px rgba(225,6,0,0.6)", 
                            "0 0 20px rgba(225,6,0,0)"
                          ]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="text-transparent stroke-text-red block"
                        style={{ WebkitTextStroke: "2px #E10600" }}
                      >
                        STREET
                      </motion.span>
                   </h1>
                </div>
              </Reveal>

              <Reveal delay={0.4}>
                <div className="mb-10 flex flex-col items-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-[1px] w-8 bg-brand-red/50" />
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-red drop-shadow-[0_0_10px_rgba(225,6,0,0.5)]">
                      Music Producer & Audio Engineer
                    </p>
                    <div className="h-[1px] w-8 bg-brand-red/50" />
                  </div>
                  <p className="text-brand-gray/80 text-sm md:text-base font-light max-w-lg mx-auto leading-relaxed text-center px-4">
                    Surgical precision in sound. Dark, cinematic production for the new underground. Bleed through the noise.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.6}>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link to="/beats">
                    <Button variant="primary" className="shadow-[0_0_40px_rgba(225,6,0,0.3)] min-w-[180px]">
                       Beat Store <ArrowRight size={18} className="ml-2" />
                    </Button>
                  </Link>
                  <Link to="/music">
                    <Button variant="outline" className="min-w-[180px]">Discography</Button>
                  </Link>
                </div>
              </Reveal>
           </div>
        </motion.div>
        
        {/* Background Atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl bg-gradient-radial from-brand-red/10 to-transparent opacity-60 blur-[120px] pointer-events-none z-0" />
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* --- LATEST DROPS --- */}
        <section className="py-24 border-b border-black/5 dark:border-white/5 transition-colors">
           <Reveal width="100%">
             <div className="flex justify-between items-end mb-12">
               <div>
                 <h2 className="text-brand-red font-bold uppercase tracking-[0.3em] text-[10px] mb-2">Portfolio</h2>
                 <h3 className="text-4xl md:text-5xl font-black text-brand-black dark:text-white tracking-tight uppercase transition-colors">Latest Works</h3>
               </div>
               <Link to="/music" className="hidden md:flex items-center text-sm font-bold uppercase tracking-widest text-brand-gray hover:text-brand-black dark:hover:text-white transition-colors group">
                  Full Archive <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
               </Link>
             </div>
           </Reveal>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {["7IbqNeOivzHYdXD7J6uHSq", "43uLpGO5OagtSVFSAoOIUl", "3tgbo7ajgLyIE8qbN3dNU8"].map((id, i) => (
                <Reveal key={id} delay={i * 0.1}>
                  <div className="group relative flex flex-col h-full bg-white dark:bg-[#0F0F0F] rounded-2xl overflow-hidden border border-black/10 dark:border-white/5 hover:border-brand-red/30 transition-all duration-500 shadow-2xl">
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
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
               <div>
                  <h2 className="text-brand-red font-bold uppercase tracking-[0.3em] text-[10px] mb-2">Marketplace</h2>
                  <h3 className="text-5xl md:text-6xl font-black text-brand-black dark:text-white tracking-tighter transition-colors">PREMIUM INSTRUMENTALS</h3>
               </div>
               <Link to="/beats">
                  <Button variant="outline" className="px-8 text-xs border-black/20 dark:border-white/20">
                     Enter Beat Store
                  </Button>
               </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {BEAT_DATA.map((beat, i) => (
               <Reveal key={beat.id} delay={i * 0.1}>
                  <BeatCard beat={beat} />
               </Reveal>
            ))}
          </div>

          <div className="mt-24">
             <Reveal width="100%">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   {[
                      { name: 'Basic Lease', price: '$29.99', features: ['MP3 (320kbps)', '50k Streams', 'Non-Exclusive'] },
                      { name: 'Premium Lease', price: '$49.99', features: ['WAV + MP3', '500k Streams', 'Track Stems'], highlight: true },
                      { name: 'Exclusive', price: 'Make Offer', features: ['Full Ownership', 'Unlimited', 'Publishing'] },
                   ].map((tier, i) => (
                      <div key={i} className={`p-8 rounded-2xl border transition-all duration-500 ${tier.highlight ? 'bg-black/5 dark:bg-white/5 border-brand-red/50 shadow-2xl' : 'bg-white/30 dark:bg-[#0A0A0A] border-black/5 dark:border-white/5'} flex flex-col items-center text-center group hover:scale-[1.02]`}>
                         <h5 className="text-brand-black dark:text-white font-bold uppercase tracking-[0.2em] text-[10px] mb-4 transition-colors">{tier.name}</h5>
                         <div className={`text-4xl font-black mb-6 ${tier.highlight ? 'text-brand-red' : 'text-brand-black dark:text-white'}`}>{tier.price}</div>
                         <ul className="text-[11px] font-medium text-brand-gray space-y-3 mb-8">
                            {tier.features.map((f, j) => <li key={j} className="uppercase tracking-widest">{f}</li>)}
                         </ul>
                         <Link to="/licensing" className="text-[9px] font-black uppercase tracking-[0.3em] text-brand-black dark:text-white hover:text-brand-red transition-colors border-b border-black/10 dark:border-white/10 hover:border-brand-red pb-1">
                            Contract Details
                         </Link>
                      </div>
                   ))}
                </div>
             </Reveal>
          </div>
        </section>

        {/* --- SERVICES --- */}
        <section className="py-24 border-t border-black/5 dark:border-white/5 transition-colors">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
              <Reveal>
                 <h2 className="text-brand-red font-bold uppercase tracking-[0.3em] text-[10px] mb-4">Studio Services</h2>
                 <h3 className="text-4xl md:text-5xl font-black text-brand-black dark:text-white tracking-tight mb-8 transition-colors leading-tight">PROFESSIONAL<br />AUDIO ENGINEERING</h3>
                 <p className="text-brand-gray/80 text-lg leading-relaxed mb-10 max-w-md">
                    Major label quality from an independent studio. Mixing, mastering, and custom sound design for serious artists.
                 </p>
                 <Link to="/contact">
                    <Button variant="primary">Book Session</Button>
                 </Link>
              </Reveal>

              <div className="space-y-4">
                 <Reveal delay={0.2}>
                    <div className="group flex gap-8 p-8 border border-black/5 dark:border-white/5 bg-white/50 dark:bg-white/[0.02] hover:bg-white dark:hover:bg-white/[0.05] transition-all duration-500 rounded-2xl shadow-sm">
                       <div className="p-4 bg-brand-red/10 dark:bg-white/5 h-fit rounded-xl group-hover:bg-brand-red group-hover:text-white transition-colors text-brand-red"><Sliders size={24} /></div>
                       <div>
                          <h4 className="text-xl font-black text-brand-black dark:text-white mb-2 uppercase tracking-tight transition-colors">Mixing</h4>
                          <p className="text-sm text-brand-gray leading-relaxed">Surgical vocal tuning, depth enhancement, and dynamic balance for radio-ready stems.</p>
                       </div>
                    </div>
                 </Reveal>
                 <Reveal delay={0.3}>
                    <div className="group flex gap-8 p-8 border border-black/5 dark:border-white/5 bg-white/50 dark:bg-white/[0.02] hover:bg-white dark:hover:bg-white/[0.05] transition-all duration-500 rounded-2xl shadow-sm">
                       <div className="p-4 bg-brand-red/10 dark:bg-white/5 h-fit rounded-xl group-hover:bg-brand-red group-hover:text-white transition-colors text-brand-red"><Layers size={24} /></div>
                       <div>
                          <h4 className="text-xl font-black text-brand-black dark:text-white mb-2 uppercase tracking-tight transition-colors">Mastering</h4>
                          <p className="text-sm text-brand-gray leading-relaxed">Final loudness optimization, tonal balancing, and commercial-grade polish for all platforms.</p>
                       </div>
                    </div>
                 </Reveal>
              </div>
           </div>
        </section>

        {/* --- PRODUCTION CREDITS --- */}
        <section className="py-24 border-t border-black/5 dark:border-white/5 transition-colors">
           <Reveal width="100%">
             <div className="text-center mb-16">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-red mb-3">Portfolio Highlights</h4>
                <h3 className="text-3xl font-black text-brand-black dark:text-white uppercase tracking-tight transition-colors">Production Credits</h3>
             </div>
             
             <div className="max-w-3xl mx-auto space-y-6">
                 {CREDITS_DATA.map((credit, i) => (
                    <div key={i} className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4 border-b border-black/5 dark:border-white/5 pb-6 last:border-0 hover:bg-black/5 dark:hover:bg-white/[0.02] px-6 py-4 rounded-xl transition-all duration-300 group">
                       <div>
                         <h4 className="text-2xl font-black text-brand-black dark:text-white uppercase tracking-tighter group-hover:text-brand-red transition-colors">
                            {credit.artist}
                         </h4>
                         <p className="text-[9px] font-black uppercase tracking-[0.2em] text-brand-gray/50 group-hover:text-brand-gray transition-colors">{credit.role}</p>
                       </div>
                       <span className="text-[11px] font-mono text-brand-red font-bold">
                          {credit.year}
                       </span>
                    </div>
                 ))}
             </div>
           </Reveal>
        </section>

      </div>
    </div>
  );
};
