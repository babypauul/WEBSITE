import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sliders, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { BeatCard } from '../components/BeatCard';
import { BEAT_DATA } from '../constants';
import { Reveal } from '../components/Reveal';
import { ScrollingMarquee } from '../components/ScrollingMarquee';
import { SplitText } from '../components/SplitText';
import { CreditTicker } from '../components/CreditTicker';

export const Home: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const dropsRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const { scrollYProgress: dropsScroll } = useScroll({
    target: dropsRef,
    offset: ["start end", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const yDrops = useTransform(dropsScroll, [0, 1], [50, -50]);

  return (
    <div className="w-full bg-transparent overflow-hidden">
      {/* --- HERO SECTION --- */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <ScrollingMarquee text="KILLSTREET STUDIO" className="absolute top-[30%] opacity-[0.03] scale-150 pointer-events-none" />
        
        <motion.div 
          style={{ opacity: opacityHero, y: yText }}
          className="relative z-10 max-w-6xl mx-auto px-6 w-full flex flex-col items-center text-center"
        >
           <div className="z-20 flex flex-col items-center">
              <div className="mb-8 relative">
                 <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-white text-glow drop-shadow-2xl text-center flex flex-col items-center">
                    <SplitText text="BABYPAUUL" delay={0.1} />
                    <span className="text-3xl md:text-5xl mt-2 tracking-[0.2em] font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500 opacity-90">
                      KILLSTREET
                    </span>
                 </h1>
              </div>

              <Reveal delay={0.3}>
                <p className="text-brand-gray text-base md:text-lg font-medium max-w-lg mx-auto leading-relaxed mb-10 text-center mix-blend-plus-lighter">
                   Music Producer & Audio Engineer.<br/>
                   <span className="text-white">Rovigo, Italy.</span>
                </p>
              </Reveal>

              <Reveal delay={0.5}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
                  <Link to="/music">
                    <Button variant="primary" className="shadow-[0_0_50px_rgba(225,6,0,0.4)] hover:shadow-[0_0_80px_rgba(225,6,0,0.6)]">
                       Latest Releases <ArrowRight size={18} className="ml-2" />
                    </Button>
                  </Link>
                  <Link to="/services">
                    <Button variant="outline" className="backdrop-blur-xl bg-white/5 border-white/20">Book Studio</Button>
                  </Link>
                </div>
              </Reveal>
           </div>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* --- LATEST DROPS --- */}
        <section ref={dropsRef} className="py-24 border-b border-white/5 relative">
           <Reveal width="100%">
             <div className="flex justify-between items-end mb-12">
               <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight uppercase text-glow">Latest Drops</h3>
               <Link to="/music" className="hidden md:flex items-center text-xs font-bold uppercase tracking-widest text-brand-gray hover:text-white transition-colors group">
                  Discography <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
               </Link>
             </div>
           </Reveal>

           <motion.div style={{ y: yDrops }} className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {["7IbqNeOivzHYdXD7J6uHSq", "43uLpGO5OagtSVFSAoOIUl", "3tgbo7ajgLyIE8qbN3dNU8"].map((id, i) => (
                <Reveal key={id} delay={i * 0.1}>
                  <div className="group relative flex flex-col h-full bg-[#0F0F0F] rounded-2xl overflow-hidden border border-white/10 hover:border-brand-red/50 transition-all duration-300 shadow-2xl hover:shadow-[0_0_40px_rgba(225,6,0,0.15)] hover:-translate-y-2">
                     <iframe 
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
           </motion.div>
        </section>

        {/* --- MARKETPLACE --- */}
        <section className="py-32 relative">
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
               <div className="relative z-10">
                  <h2 className="text-brand-red font-bold uppercase tracking-[0.3em] text-xs mb-3 text-glow-red">Marketplace</h2>
                  <div className="text-4xl md:text-5xl font-black text-white tracking-tighter text-glow">
                    FEATURED BEATS
                  </div>
               </div>
               <Link to="/beats">
                  <Button variant="outline" className="px-6 text-[10px]">
                     View Store
                  </Button>
               </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
            {BEAT_DATA.map((beat, i) => (
               <Reveal key={beat.id} delay={i * 0.05}>
                  <BeatCard beat={beat} />
               </Reveal>
            ))}
          </div>

          {/* Licensing */}
          <div className="mt-32">
             <Reveal width="100%">
                <div className="text-center mb-10">
                   <h4 className="text-base font-bold text-white uppercase tracking-widest text-glow">Licensing Options</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                   {[
                      { name: 'Basic Lease', price: '$29.99', features: ['MP3 (320kbps)', '50k Streams', 'Non-Exclusive'] },
                      { name: 'Premium Lease', price: '$49.99', features: ['WAV + MP3', '500k Streams', 'Track Stems'], highlight: true },
                      { name: 'Exclusive', price: 'Make Offer', features: ['Full Ownership', 'Unlimited', 'Publishing'] },
                   ].map((tier, i) => (
                      <div key={i} className={`group relative p-8 rounded-3xl border transition-all duration-300 overflow-hidden ${tier.highlight ? 'bg-white/5 border-brand-red/50 shadow-[0_0_40px_rgba(225,6,0,0.15)] hover:shadow-[0_0_60px_rgba(225,6,0,0.3)]' : 'bg-[#0A0A0A] border-white/5 hover:bg-white/5'} flex flex-col items-center text-center hover:-translate-y-1`}>
                         <h5 className="text-white font-bold uppercase tracking-wider text-xs mb-2 relative z-10">{tier.name}</h5>
                         <div className={`text-2xl font-black mb-6 relative z-10 ${tier.highlight ? 'text-brand-red text-glow-red' : 'text-white'}`}>{tier.price}</div>
                         <ul className="text-[10px] text-brand-gray space-y-3 mb-8 relative z-10">
                            {tier.features.map((f, j) => <li key={j} className="flex gap-2 items-center justify-center"><span className="w-1 h-1 bg-brand-red rounded-full box-glow" />{f}</li>)}
                         </ul>
                         <Link to="/licensing" className="relative z-10 w-full">
                            <Button variant={tier.highlight ? 'primary' : 'outline'} className="w-full text-[10px] py-3">Select</Button>
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
                 <h2 className="text-brand-red font-bold uppercase tracking-[0.3em] text-xs mb-4 text-glow-red">Studio Services</h2>
                 <h3 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6 text-glow">PROFESSIONAL ENGINEERING</h3>
                 <p className="text-brand-gray text-base leading-relaxed mb-8 font-light">
                    Killstreet Studio offers full-service mixing and mastering. 
                    Get your tracks radio-ready with industry standard analog processing.
                 </p>
                 <Link to="/services">
                    <Button variant="primary">View Services</Button>
                 </Link>
              </Reveal>

              <div className="space-y-4">
                 <Reveal delay={0.2}>
                    <div className="group flex gap-6 p-6 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 rounded-2xl relative overflow-hidden box-glow-hover">
                       <div className="p-3 bg-white/5 h-fit rounded-xl group-hover:bg-brand-red group-hover:text-white transition-colors text-brand-red"><Sliders size={20} /></div>
                       <div>
                          <h4 className="text-lg font-bold text-white mb-1 uppercase tracking-tight">Mixing</h4>
                          <p className="text-xs text-brand-gray">Vocal tuning, dynamic balancing, effects.</p>
                       </div>
                    </div>
                 </Reveal>
                 <Reveal delay={0.3}>
                    <div className="group flex gap-6 p-6 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 rounded-2xl relative overflow-hidden box-glow-hover">
                       <div className="p-3 bg-white/5 h-fit rounded-xl group-hover:bg-brand-red group-hover:text-white transition-colors text-brand-red"><Layers size={20} /></div>
                       <div>
                          <h4 className="text-lg font-bold text-white mb-1 uppercase tracking-tight">Mastering</h4>
                          <p className="text-xs text-brand-gray">Loudness optimization, final polish.</p>
                       </div>
                    </div>
                 </Reveal>
              </div>
           </div>
        </section>

        {/* --- PRODUCTION CREDITS --- */}
        <section className="py-24 border-t border-white/5">
           <Reveal width="100%">
             <div className="text-center mb-12">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-red mb-2 text-glow-red">Selected Works</h4>
                <div className="text-2xl font-black text-white uppercase tracking-tight flex justify-center text-glow">
                    PRODUCTION CREDITS
                </div>
             </div>
             
             <CreditTicker />
           </Reveal>
        </section>

      </div>
    </div>
  );
};