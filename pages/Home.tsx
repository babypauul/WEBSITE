import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button.tsx';
import { BeatCard } from '../components/BeatCard.tsx';
import { BEAT_DATA } from '../constants.ts';
import { Reveal } from '../components/Reveal.tsx';
import { ScrollingMarquee } from '../components/ScrollingMarquee.tsx';

export const Home: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const yText = useTransform(smoothProgress, [0, 1], ["0%", "50%"]);
  const scaleText = useTransform(smoothProgress, [0, 1], [1, 0.85]);
  const opacityHero = useTransform(smoothProgress, [0, 0.8], [1, 0]);

  return (
    <div className="w-full bg-transparent overflow-hidden">
      {/* --- HERO SECTION --- */}
      <section ref={heroRef} className="relative min-h-[100vh] flex items-center justify-center overflow-hidden pt-20">
        <ScrollingMarquee text="KILLSTREET STUDIO // EST 2024" className="absolute top-[32%] opacity-[0.03] dark:opacity-[0.05] -rotate-3 scale-110 pointer-events-none text-black dark:text-white" />
        
        <motion.div 
          style={{ opacity: opacityHero, y: yText, scale: scaleText }}
          className="relative z-10 max-w-7xl mx-auto px-4 w-full flex flex-col items-center text-center"
        >
           <div className="z-20 flex flex-col items-center">
              <Reveal delay={0.1}>
                <div className="mb-12 flex items-center gap-4 bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 px-6 py-2 rounded-full shadow-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-brand-red animate-pulse shadow-[0_0_10px_#E10600]" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-black dark:text-white">Active session</span>
                  </div>
                  <div className="w-[1px] h-3 bg-black/20 dark:border-white/20" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gray">Rovigo, IT</span>
                </div>
              </Reveal>

              <Reveal delay={0.2} width="100%">
                <div className="mb-8 relative">
                   <h1 className="text-[20vw] md:text-[14rem] font-black tracking-tighter leading-[0.75] text-brand-black dark:text-white select-none flex flex-col items-center">
                      <span className="block drop-shadow-2xl">KILL</span>
                      <motion.div 
                        animate={{ 
                          textShadow: [
                            "0 0 15px rgba(225,6,0,0)", 
                            "0 0 40px rgba(225,6,0,0.4)", 
                            "0 0 15px rgba(225,6,0,0)"
                          ]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="outline-title flex tracking-tighter relative items-center"
                      >
                        STREET
                      </motion.div>
                   </h1>
                </div>
              </Reveal>

              <Reveal delay={0.4}>
                <div className="mb-14 flex flex-col items-center">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-[1px] w-12 bg-brand-red/30" />
                    <p className="text-[11px] font-black uppercase tracking-[0.6em] text-brand-red text-glow-red">
                      Producer & Engineer
                    </p>
                    <div className="h-[1px] w-12 bg-brand-red/30" />
                  </div>
                  <p className="text-brand-gray/90 text-sm md:text-xl font-light max-w-xl mx-auto leading-relaxed text-center px-4">
                    Transforming frequency into physical emotion. High-fidelity industrial production at <span className="text-white font-bold">Killstreet Studios</span>.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.6}>
                <div className="flex flex-wrap gap-5 justify-center">
                  <Link to="/beats">
                    <Button variant="primary" className="shadow-2xl min-w-[220px] h-16">
                       Beat Store <ArrowRight size={18} className="ml-2" />
                    </Button>
                  </Link>
                  <Link to="/ai-studio">
                    <Button variant="outline" className="min-w-[220px] h-16 border-brand-red/20 hover:border-brand-red">AI Lab</Button>
                  </Link>
                </div>
              </Reveal>
           </div>
        </motion.div>
        
        {/* Atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-6xl bg-gradient-radial from-brand-red/5 to-transparent opacity-40 blur-[150px] pointer-events-none z-0" />
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <section className="py-40 border-b border-black/5 dark:border-white/5">
           <Reveal width="100%">
             <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-4">
               <div>
                 <h2 className="text-brand-red font-bold uppercase tracking-[0.4em] text-[10px] mb-4">Portfolio</h2>
                 <h3 className="text-6xl md:text-7xl font-black text-brand-black dark:text-white tracking-tighter uppercase">Latest Output</h3>
               </div>
               <Link to="/music" className="flex items-center text-xs font-black uppercase tracking-[0.3em] text-brand-gray hover:text-brand-red transition-all group pb-2">
                  View Archive <ArrowRight size={16} className="ml-3 group-hover:translate-x-2 transition-transform" />
               </Link>
             </div>
           </Reveal>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
             {["7IbqNeOivzHYdXD7J6uHSq", "43uLpGO5OagtSVFSAoOIUl", "3tgbo7ajgLyIE8qbN3dNU8"].map((id, i) => (
                <Reveal key={id} delay={i * 0.15} direction="up" distance={50}>
                  <div className="group relative flex flex-col h-full bg-white dark:bg-[#080808] rounded-[2rem] overflow-hidden border border-black/10 dark:border-white/5 hover:border-brand-red/40 transition-all duration-500 shadow-xl hover:shadow-2xl">
                     <iframe 
                       style={{ borderRadius: '0px' }} 
                       src={`https://open.spotify.com/embed/track/${id}?utm_source=generator&theme=0`}
                       width="100%" 
                       height="380" 
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

        <section className="py-40 relative">
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
               <div>
                  <h2 className="text-brand-red font-bold uppercase tracking-[0.4em] text-[10px] mb-4">Marketplace</h2>
                  <h3 className="text-6xl md:text-8xl font-black text-brand-black dark:text-white tracking-tighter">PREMIUM TOOLS</h3>
               </div>
               <Link to="/beats">
                  <Button variant="outline" className="px-12 h-14 text-xs">
                     Storefront
                  </Button>
               </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
            {BEAT_DATA.map((beat, i) => (
               <Reveal key={beat.id} delay={i * 0.1} direction="up" distance={40}>
                  <BeatCard beat={beat} />
               </Reveal>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};