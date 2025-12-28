import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sliders, Layers } from 'lucide-react';
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

  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const outlineStyle = { 
    WebkitTextStroke: "2px #E10600",
    color: 'transparent',
    paintOrder: 'stroke fill'
  };

  const solidStyle = {
    WebkitTextStroke: "0px transparent",
    color: 'inherit'
  };

  return (
    <div className="w-full bg-transparent overflow-hidden">
      {/* --- HERO SECTION --- */}
      <section ref={heroRef} className="relative min-h-[95vh] flex items-center justify-center overflow-hidden pt-20">
        <ScrollingMarquee text="KILLSTREET STUDIO // EST 2024" className="absolute top-[28%] opacity-[0.03] dark:opacity-[0.05] -rotate-3 scale-110 pointer-events-none text-black dark:text-white" />
        
        <motion.div 
          style={{ opacity: opacityHero, y: yText }}
          className="relative z-10 max-w-7xl mx-auto px-4 w-full flex flex-col items-center text-center"
        >
           <div className="z-20 flex flex-col items-center">
              {/* Identity Badge */}
              <Reveal delay={0.1}>
                <div className="mb-10 flex items-center gap-4 bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 px-6 py-2 rounded-full shadow-2xl">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-brand-red animate-pulse shadow-[0_0_10px_#E10600]" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-black dark:text-white">Active Session</span>
                  </div>
                  <div className="w-[1px] h-3 bg-black/20 dark:bg-white/20" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gray">Rovigo, IT // 45.0° N</span>
                </div>
              </Reveal>

              <Reveal delay={0.2} width="100%">
                <div className="mb-6 relative">
                   <h1 className="text-[18vw] md:text-[12rem] font-black tracking-tighter leading-[0.75] text-brand-black dark:text-white transition-colors duration-500 select-none flex flex-col items-center">
                      <span className="block drop-shadow-2xl">KILL</span>
                      <motion.div 
                        animate={{ 
                          textShadow: [
                            "0 0 15px rgba(225,6,0,0)", 
                            "0 0 40px rgba(225,6,0,0.6)", 
                            "0 0 15px rgba(225,6,0,0)"
                          ]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="flex tracking-tighter relative"
                      >
                        <span className="relative z-10" style={outlineStyle}>ST</span>
                        <span className="relative z-20" style={solidStyle}>R</span>
                        <span className="relative z-10" style={outlineStyle}>EET</span>
                      </motion.div>
                   </h1>
                </div>
              </Reveal>

              <Reveal delay={0.4}>
                <div className="mb-12 flex flex-col items-center">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-[1px] w-12 bg-brand-red/30" />
                    <p className="text-[11px] font-black uppercase tracking-[0.6em] text-brand-red text-glow-red">
                      Producer & Engineer
                    </p>
                    <div className="h-[1px] w-12 bg-brand-red/30" />
                  </div>
                  <p className="text-brand-gray/90 text-sm md:text-lg font-light max-w-xl mx-auto leading-relaxed text-center px-4">
                    Surgical precision in industrial sound design. Creating cinematic, high-fidelity production for the underground since 2024.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.6}>
                <div className="flex flex-wrap gap-5 justify-center">
                  <Link to="/beats">
                    <Button variant="primary" className="shadow-[0_0_50px_rgba(225,6,0,0.35)] min-w-[200px] h-14">
                       Beat Store <ArrowRight size={18} className="ml-2" />
                    </Button>
                  </Link>
                  <Link to="/music">
                    <Button variant="outline" className="min-w-[200px] h-14">Discography</Button>
                  </Link>
                </div>
              </Reveal>
           </div>
        </motion.div>
        
        {/* Background Atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-6xl bg-gradient-radial from-brand-red/5 to-transparent opacity-40 blur-[150px] pointer-events-none z-0" />
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* --- PORTFOLIO SECTION --- */}
        <section className="py-32 border-b border-black/5 dark:border-white/5 transition-colors">
           <Reveal width="100%">
             <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
               <div>
                 <h2 className="text-brand-red font-bold uppercase tracking-[0.4em] text-[10px] mb-3">Portfolio</h2>
                 <h3 className="text-5xl md:text-6xl font-black text-brand-black dark:text-white tracking-tight uppercase transition-colors">Latest Output</h3>
               </div>
               <Link to="/music" className="flex items-center text-xs font-black uppercase tracking-[0.3em] text-brand-gray hover:text-brand-red transition-all group">
                  Full Archive <ArrowRight size={16} className="ml-3 group-hover:translate-x-2 transition-transform" />
               </Link>
             </div>
           </Reveal>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
             {["7IbqNeOivzHYdXD7J6uHSq", "43uLpGO5OagtSVFSAoOIUl", "3tgbo7ajgLyIE8qbN3dNU8"].map((id, i) => (
                <Reveal key={id} delay={i * 0.1}>
                  <div className="group relative flex flex-col h-full bg-white dark:bg-[#080808] rounded-3xl overflow-hidden border border-black/10 dark:border-white/5 hover:border-brand-red/40 transition-all duration-500 shadow-xl hover:shadow-2xl">
                     <iframe 
                       style={{ borderRadius: '0px' }} 
                       src={`https://open.spotify.com/embed/track/${id}?utm_source=generator&theme=0`}
                       width="100%" 
                       height="352" 
                       frameBorder={0} 
                       allowFullScreen={true}
                       allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                       loading="lazy"
                       className="opacity-95 group-hover:opacity-100 transition-opacity"
                     />
                  </div>
                </Reveal>
             ))}
           </div>
        </section>

        {/* --- BEAT STORE --- */}
        <section className="py-32 relative">
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
               <div>
                  <h2 className="text-brand-red font-bold uppercase tracking-[0.4em] text-[10px] mb-3">Marketplace</h2>
                  <h3 className="text-6xl md:text-7xl font-black text-brand-black dark:text-white tracking-tighter transition-colors">PREMIUM TOOLS</h3>
               </div>
               <Link to="/beats">
                  <Button variant="outline" className="px-10 h-12 text-xs border-black/10 dark:border-white/10 hover:border-brand-red">
                     Browse Store
                  </Button>
               </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
            {BEAT_DATA.map((beat, i) => (
               <Reveal key={beat.id} delay={i * 0.1}>
                  <BeatCard beat={beat} />
               </Reveal>
            ))}
          </div>

          <div className="mt-32">
             <Reveal width="100%">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   {[
                      { name: 'Standard Lease', price: '$29.99', features: ['High Qual MP3', '50,000 Streams', 'Non-Exclusive'] },
                      { name: 'Gold Lease', price: '$49.99', features: ['WAV + MP3', '500,000 Streams', 'Track Stems'], highlight: true },
                      { name: 'Exclusive', price: 'Offer', features: ['Full Ownership', 'Unlimited Use', 'Contract Sync'] },
                   ].map((tier, i) => (
                      <div key={i} className={`p-10 rounded-3xl border transition-all duration-500 ${tier.highlight ? 'bg-black/5 dark:bg-white/5 border-brand-red/40 shadow-2xl' : 'bg-white/20 dark:bg-[#070707] border-black/5 dark:border-white/5'} flex flex-col items-center text-center group hover:scale-[1.03]`}>
                         <h5 className="text-brand-black dark:text-white font-black uppercase tracking-[0.3em] text-[10px] mb-5 transition-colors">{tier.name}</h5>
                         <div className={`text-5xl font-black mb-8 ${tier.highlight ? 'text-brand-red' : 'text-brand-black dark:text-white'}`}>{tier.price}</div>
                         <ul className="text-[12px] font-medium text-brand-gray space-y-4 mb-10">
                            {tier.features.map((f, j) => <li key={j} className="uppercase tracking-[0.15em]">{f}</li>)}
                         </ul>
                         <Link to="/licensing" className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-black dark:text-white hover:text-brand-red transition-all border-b border-black/10 dark:border-white/10 hover:border-brand-red pb-1">
                            Full Terms
                         </Link>
                      </div>
                   ))}
                </div>
             </Reveal>
          </div>
        </section>

        {/* --- STUDIO SERVICES --- */}
        <section className="py-32 border-t border-black/5 dark:border-white/5 transition-colors">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
              <Reveal>
                 <h2 className="text-brand-red font-bold uppercase tracking-[0.4em] text-[10px] mb-4">Services</h2>
                 <h3 className="text-5xl md:text-6xl font-black text-brand-black dark:text-white tracking-tight mb-10 transition-colors leading-none">CLARITY<br />IN NOISE</h3>
                 <p className="text-brand-gray/90 text-xl leading-relaxed mb-12 max-w-md font-light">
                    Transforming rough ideas into commercial-grade masterpieces. Mixing, mastering, and creative direction from an industry professional.
                 </p>
                 <Link to="/contact">
                    <Button variant="primary" className="h-14 px-10">Book Consulting</Button>
                 </Link>
              </Reveal>

              <div className="space-y-6">
                 <Reveal delay={0.2}>
                    <div className="group flex gap-8 p-10 border border-black/5 dark:border-white/5 bg-white/40 dark:bg-white/[0.01] hover:bg-white dark:hover:bg-white/[0.04] transition-all duration-500 rounded-3xl shadow-sm">
                       <div className="p-5 bg-brand-red/10 dark:bg-white/5 h-fit rounded-2xl group-hover:bg-brand-red group-hover:text-white transition-all text-brand-red"><Sliders size={28} /></div>
                       <div>
                          <h4 className="text-2xl font-black text-brand-black dark:text-white mb-3 uppercase tracking-tight transition-colors">Mixing</h4>
                          <p className="text-base text-brand-gray leading-relaxed font-light">Surgical frequency balancing, vocal tuning, and spatial depth for a modern radio sound.</p>
                       </div>
                    </div>
                 </Reveal>
                 <Reveal delay={0.3}>
                    <div className="group flex gap-8 p-10 border border-black/5 dark:border-white/5 bg-white/40 dark:bg-white/[0.01] hover:bg-white dark:hover:bg-white/[0.04] transition-all duration-500 rounded-3xl shadow-sm">
                       <div className="p-5 bg-brand-red/10 dark:bg-white/5 h-fit rounded-2xl group-hover:bg-brand-red group-hover:text-white transition-all text-brand-red"><Layers size={28} /></div>
                       <div>
                          <h4 className="text-2xl font-black text-brand-black dark:text-white mb-3 uppercase tracking-tight transition-colors">Mastering</h4>
                          <p className="text-base text-brand-gray leading-relaxed font-light">The final polish. Competitive loudness, tonal consistency, and format optimization.</p>
                       </div>
                    </div>
                 </Reveal>
              </div>
           </div>
        </section>

        {/* --- CREDITS --- */}
        <section className="py-32 border-t border-black/5 dark:border-white/5 transition-colors">
           <Reveal width="100%">
             <div className="text-center mb-20">
                <h4 className="text-[11px] font-black uppercase tracking-[0.5em] text-brand-red mb-4">Track Record</h4>
                <h3 className="text-4xl font-black text-brand-black dark:text-white uppercase tracking-tight transition-colors">Selected Credits</h3>
             </div>
             
             <div className="max-w-4xl mx-auto space-y-4">
                 {CREDITS_DATA.map((credit, i) => (
                    <div key={i} className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6 border-b border-black/5 dark:border-white/5 pb-8 last:border-0 hover:bg-black/5 dark:hover:bg-white/[0.01] px-8 py-6 rounded-2xl transition-all duration-500 group">
                       <div>
                         <h4 className="text-3xl font-black text-brand-black dark:text-white uppercase tracking-tighter group-hover:text-brand-red transition-colors">
                            {credit.artist}
                         </h4>
                         <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-gray/40 group-hover:text-brand-gray/60 transition-colors mt-1">{credit.role}</p>
                       </div>
                       <span className="text-[13px] font-mono text-brand-red font-black tracking-wider bg-brand-red/5 px-4 py-1 rounded-full">
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