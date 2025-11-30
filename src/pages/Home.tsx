import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Star, Disc, Music, Sliders, Mic2, Layers, Check, ShoppingBag } from 'lucide-react';
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

        {/* --- SERVICES --- */}
        <section className="py-24 border-b border-white/5">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <Reveal>
                 <h2 className="text-brand-red font-bold uppercase tracking-[0.3em] text-sm mb-4">Studio Services</h2>
                 <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">PROFESSIONAL ENGINEERING</h3>
                 <p className="text-brand-gray text-lg leading-relaxed mb-8">
                    Beyond beats, Killstreet Studio offers full-service mixing and mastering. 
                    Get your tracks radio-ready with industry standard analog processing and digital precision.
                 </p>
                 <Link to="/contact">
                    <Button variant="primary">Book Session</Button>
                 </Link>
              </Reveal>

              <div className="grid grid-cols-1 gap-4">
                 <Reveal delay={0.2}>
                    <div className="flex gap-6 p-6 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors rounded-xl">
                       <div className="p-4 bg-white/5 h-fit rounded-lg"><Sliders className="text-brand-red" /></div>
                       <div>
                          <h4 className="text-xl font-bold text-white mb-2 uppercase tracking-tight">Mixing</h4>
                          <p className="text-sm text-brand-gray">Vocal tuning, dynamic balancing, and creative effects processing.</p>
                       </div>
                    </div>
                 </Reveal>
                 <Reveal delay={0.3}>
                    <div className="flex gap-6 p-6 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors rounded-xl">
                       <div className="p-4 bg-white/5 h-fit rounded-lg"><Layers className="text-brand-red" /></div>
                       <div>
                          <h4 className="text-xl font-bold text-white mb-2 uppercase tracking-tight">Mastering</h4>
                          <p className="text-sm text-brand-gray">Loudness optimization, stereo enhancement, and final polish.</p>
                       </div>
                    </div>
                 </Reveal>
              </div>
           </div>
        </section>

        {/* --- MARKETPLACE (PREMIUM REBRAND) --- */}
        <section className="py-24 relative">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-brand-red font-bold uppercase tracking-[0.3em] text-sm mb-3">Marketplace</h2>
              <h3 className="text-5xl md:text-6xl font-black text-white tracking-tighter">FEATURED BEATS</h3>
            </div>
          </Reveal>

          {/* Beats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredBeats.map((beat, i) => (
               <Reveal key={beat.id} delay={i * 0.1}>
                  <BeatCard beat={beat} />
               </Reveal>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/beats">
               <Button variant="outline" className="px-12">
                  View Full Catalogue
               </Button>
            </Link>
          </div>

          {/* Integrated Licensing */}
          <div className="mt-24 p-1 rounded-2xl bg-gradient-to-b from-white/10 to-transparent">
             <div className="bg-[#050505] rounded-2xl p-8 md:p-12 border border-white/5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10">
                   {/* MP3 */}
                   <div className="text-center px-4">
                      <h4 className="text-xl font-black text-white uppercase tracking-wider mb-2">MP3 Lease</h4>
                      <div className="text-4xl font-black text-brand-red mb-6">$29.99</div>
                      <ul className="text-sm text-brand-gray space-y-2 mb-6">
                         <li>MP3 File (320kbps)</li>
                         <li>50,000 Streams</li>
                         <li>Non-Exclusive</li>
                      </ul>
                      <Link to="/beats" className="text-xs font-bold uppercase tracking-widest text-white hover:text-brand-red transition-colors">Select Beat</Link>
                   </div>
                   
                   {/* WAV */}
                   <div className="text-center px-4 pt-8 md:pt-0">
                      <div className="inline-block px-3 py-1 bg-brand-red/10 text-brand-red text-[10px] font-bold uppercase tracking-widest rounded-full mb-4">Most Popular</div>
                      <h4 className="text-xl font-black text-white uppercase tracking-wider mb-2">WAV Lease</h4>
                      <div className="text-4xl font-black text-white mb-6">$49.99</div>
                      <ul className="text-sm text-brand-gray space-y-2 mb-6">
                         <li>WAV + MP3 Files</li>
                         <li>500,000 Streams</li>
                         <li>Track Stems</li>
                      </ul>
                      <Link to="/beats" className="text-xs font-bold uppercase tracking-widest text-white hover:text-brand-red transition-colors">Select Beat</Link>
                   </div>

                   {/* Exclusive */}
                   <div className="text-center px-4 pt-8 md:pt-0">
                      <h4 className="text-xl font-black text-white uppercase tracking-wider mb-2">Exclusive</h4>
                      <div className="text-4xl font-black text-brand-gray mb-6">Offer</div>
                      <ul className="text-sm text-brand-gray space-y-2 mb-6">
                         <li>Full Ownership</li>
                         <li>Unlimited Streams</li>
                         <li>Publishing Rights</li>
                      </ul>
                      <Link to="/contact" className="text-xs font-bold uppercase tracking-widest text-white hover:text-brand-red transition-colors">Contact Us</Link>
                   </div>
                </div>
             </div>
          </div>
        </section>

        {/* --- CREDITS (HALL OF FAME STYLE) --- */}
        <section className="pb-24 pt-12 border-t border-white/5">
           <Reveal width="100%">
             <div className="text-center mb-16">
                <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-white/50 mb-2">Selected Works</h4>
                <h3 className="text-4xl font-black text-white uppercase tracking-tight">Production Credits</h3>
             </div>
             
             <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-center">
                 {CREDITS_DATA.map((credit, i) => (
                    <div key={i} className="group">
                       <h4 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter group-hover:text-brand-red transition-colors duration-300">
                          {credit.artist}
                       </h4>
                       <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gray/50 mt-2 group-hover:text-white transition-colors">
                          {credit.role}
                       </p>
                    </div>
                 ))}
             </div>
           </Reveal>
        </section>

      </div>
    </div>
  );
};