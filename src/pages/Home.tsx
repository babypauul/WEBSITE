import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Star, Disc, Music, Sliders, Mic2, Layers } from 'lucide-react';
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

        {/* --- MARKETPLACE (VERTICAL CARDS) --- */}
        <section className="py-24 relative">
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
               <div>
                  <h2 className="text-brand-red font-bold uppercase tracking-[0.3em] text-sm mb-3">Marketplace</h2>
                  <h3 className="text-5xl md:text-6xl font-black text-white tracking-tighter">FEATURED BEATS</h3>
               </div>
               <Link to="/beats">
                  <Button variant="outline" className="px-8 text-xs">
                     View All Beats
                  </Button>
               </Link>
            </div>
          </Reveal>

          {/* Beats Grid - Vertical Poster Style */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {BEAT_DATA.map((beat, i) => (
               <Reveal key={beat.id} delay={i * 0.1}>
                  <BeatCard beat={beat} />
               </Reveal>
            ))}
          </div>

          {/* Integrated Licensing - Glass Style */}
          <div className="mt-24">
             <Reveal width="100%">
                <div className="text-center mb-10">
                   <h4 className="text-lg font-bold text-white uppercase tracking-widest">Licensing Options</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   {[
                      { name: 'Basic Lease', price: '$29.99', features: ['MP3 (320kbps)', '50k Streams', 'Non-Exclusive'] },
                      { name: 'Premium Lease', price: '$49.99', features: ['WAV + MP3', '500k Streams', 'Track Stems'], highlight: true },
                      { name: 'Exclusive', price: 'Make Offer', features: ['Full Ownership', 'Unlimited', 'Publishing'] },
                   ].map((tier, i) => (
                      <div key={i} className={`p-6 rounded-xl border ${tier.highlight ? 'bg-white/5 border-brand-red/50' : 'bg-[#0A0A0A] border-white/5'} flex flex-col items-center text-center`}>
                         <h5 className="text-white font-bold uppercase tracking-wider text-sm mb-2">{tier.name}</h5>
                         <div className={`text-2xl font-black mb-4 ${tier.highlight ? 'text-brand-red' : 'text-white'}`}>{tier.price}</div>
                         <ul className="text-xs text-brand-gray space-y-2 mb-6">
                            {tier.features.map((f, j) => <li key={j}>{f}</li>)}
                         </ul>
                         <Link to="/licensing" className="text-[10px] font-bold uppercase tracking-widest text-white hover:text-brand-red transition-colors border-b border-transparent hover:border-brand-red pb-0.5">
                            View Details
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
                    <div className="group flex gap-6 p-6 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors rounded-xl">
                       <div className="p-3 bg-white/5 h-fit rounded-lg group-hover:bg-brand-red group-hover:text-white transition-colors text-brand-red"><Sliders size={20} /></div>
                       <div>
                          <h4 className="text-lg font-bold text-white mb-1 uppercase tracking-tight">Mixing</h4>
                          <p className="text-xs text-brand-gray">Vocal tuning, dynamic balancing, effects.</p>
                       </div>
                    </div>
                 </Reveal>
                 <Reveal delay={0.3}>
                    <div className="group flex gap-6 p-6 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors rounded-xl">
                       <div className="p-3 bg-white/5 h-fit rounded-lg group-hover:bg-brand-red group-hover:text-white transition-colors text-brand-red"><Layers size={20} /></div>
                       <div>
                          <h4 className="text-lg font-bold text-white mb-1 uppercase tracking-tight">Mastering</h4>
                          <p className="text-xs text-brand-gray">Loudness optimization, final polish.</p>
                       </div>
                    </div>
                 </Reveal>
              </div>
           </div>
        </section>

        {/* --- PRODUCTION CREDITS (CLEAN LIST) --- */}
        <section className="py-24 border-t border-white/5">
           <Reveal width="100%">
             <div className="text-center mb-16">
                <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-brand-red mb-2">Selected Works</h4>
                <h3 className="text-3xl font-black text-white uppercase tracking-tight">Production Credits</h3>
             </div>
             
             <div className="max-w-2xl mx-auto space-y-8">
                 {CREDITS_DATA.map((credit, i) => (
                    <div key={i} className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-2 border-b border-white/5 pb-4 last:border-0 hover:bg-white/[0.02] px-4 rounded-lg transition-colors">
                       <h4 className="text-xl font-bold text-white uppercase tracking-tighter">
                          {credit.artist}
                       </h4>
                       <div className="flex items-center gap-4">
                          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gray/60">
                             {credit.role}
                          </span>
                          <span className="text-xs font-mono text-brand-red">
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