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

      {/* --- CREDITS MARQUEE (COMPACT) --- */}
      <section className="py-12 bg-white/5 border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-red/5 blur-3xl opacity-50"></div>
        <p className="text-center text-xs font-bold text-brand-red uppercase tracking-[0.3em] mb-6">Selected Production Credits</p>
        <ScrollingMarquee 
          text={CREDITS_DATA.map(c => `${c.artist} (${c.role})`).join("  ///  ")} 
          speed={40} 
          className="opacity-80"
        />
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* --- LATEST MUSIC --- */}
        <section className="py-24">
           <Reveal width="100%">
             <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-6">
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

        {/* --- BEAT STORE (GRID) --- */}
        <section className="py-24 relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal>
              <h2 className="text-brand-red font-bold uppercase tracking-[0.3em] text-sm mb-3">Marketplace</h2>
              <h3 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-6">FEATURED BEATS</h3>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBeats.map((beat, i) => (
              <Reveal key={beat.id} delay={i * 0.1}>
                <BeatCard beat={beat} />
              </Reveal>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/beats">
              <Button variant="outline" className="px-10">View Full Catalogue</Button>
            </Link>
          </div>
        </section>

        {/* --- LICENSING TIERS (CLEAN) --- */}
        <section className="py-20 border-t border-white/5">
           <Reveal width="100%">
             <div className="text-center mb-16">
               <h3 className="text-3xl font-bold text-white uppercase tracking-wide">Simple Pricing</h3>
               <p className="text-brand-gray mt-2">Transparent licensing for independent artists.</p>
             </div>
           </Reveal>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Basic */}
              <Reveal delay={0.1}>
                <div className="p-8 rounded-2xl bg-[#0A0A0A] border border-white/5 hover:border-white/20 transition-all group h-full flex flex-col">
                   <div className="mb-4 p-3 bg-white/5 rounded-lg w-fit text-brand-gray group-hover:text-white group-hover:bg-brand-red group-hover:shadow-[0_0_20px_rgba(225,6,0,0.4)] transition-all">
                      <Music size={24} />
                   </div>
                   <h4 className="text-xl font-bold text-white uppercase tracking-wider mb-2">Basic Lease</h4>
                   <div className="text-3xl font-black text-brand-red mb-6">$29.99</div>
                   <ul className="space-y-3 mb-8 flex-grow">
                      <li className="flex gap-3 text-sm text-brand-gray"><Star size={14} className="text-brand-red" /> MP3 File</li>
                      <li className="flex gap-3 text-sm text-brand-gray"><Star size={14} className="text-brand-red" /> 50,000 Streams</li>
                      <li className="flex gap-3 text-sm text-brand-gray"><Star size={14} className="text-brand-red" /> 1 Music Video</li>
                   </ul>
                   <Link to="/licensing" className="block w-full py-3 text-center border border-white/10 rounded-lg text-xs font-bold uppercase tracking-widest text-brand-gray hover:text-white hover:bg-white/5 transition-colors">
                      Learn More
                   </Link>
                </div>
              </Reveal>

              {/* Premium */}
              <Reveal delay={0.2}>
                <div className="p-8 rounded-2xl bg-[#0F0F0F] border border-brand-red/30 shadow-[0_0_30px_rgba(225,6,0,0.05)] relative overflow-hidden h-full flex flex-col transform md:-translate-y-4">
                   <div className="absolute top-0 right-0 bg-brand-red text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest">Popular</div>
                   <div className="mb-4 p-3 bg-brand-red rounded-lg w-fit text-white shadow-lg">
                      <Disc size={24} />
                   </div>
                   <h4 className="text-xl font-bold text-white uppercase tracking-wider mb-2">Premium</h4>
                   <div className="text-3xl font-black text-white mb-6">$49.99</div>
                   <ul className="space-y-3 mb-8 flex-grow">
                      <li className="flex gap-3 text-sm text-white"><Star size={14} className="text-brand-red" /> WAV + MP3 Files</li>
                      <li className="flex gap-3 text-sm text-white"><Star size={14} className="text-brand-red" /> 500,000 Streams</li>
                      <li className="flex gap-3 text-sm text-white"><Star size={14} className="text-brand-red" /> Track Stems</li>
                   </ul>
                   <Link to="/licensing" className="block w-full py-3 text-center bg-brand-red rounded-lg text-xs font-bold uppercase tracking-widest text-white hover:bg-brand-red/80 transition-colors shadow-lg">
                      View License
                   </Link>
                </div>
              </Reveal>

              {/* Exclusive */}
              <Reveal delay={0.3}>
                <div className="p-8 rounded-2xl bg-[#0A0A0A] border border-white/5 hover:border-white/20 transition-all group h-full flex flex-col">
                   <div className="mb-4 p-3 bg-white/5 rounded-lg w-fit text-brand-gray group-hover:text-white group-hover:bg-brand-red group-hover:shadow-[0_0_20px_rgba(225,6,0,0.4)] transition-all">
                      <Star size={24} />
                   </div>
                   <h4 className="text-xl font-bold text-white uppercase tracking-wider mb-2">Exclusive</h4>
                   <div className="text-3xl font-black text-brand-gray mb-6">Make Offer</div>
                   <ul className="space-y-3 mb-8 flex-grow">
                      <li className="flex gap-3 text-sm text-brand-gray"><Star size={14} className="text-brand-red" /> Full Ownership</li>
                      <li className="flex gap-3 text-sm text-brand-gray"><Star size={14} className="text-brand-red" /> Unlimited Streams</li>
                      <li className="flex gap-3 text-sm text-brand-gray"><Star size={14} className="text-brand-red" /> Publishing Rights</li>
                   </ul>
                   <Link to="/contact" className="block w-full py-3 text-center border border-white/10 rounded-lg text-xs font-bold uppercase tracking-widest text-brand-gray hover:text-white hover:bg-white/5 transition-colors">
                      Contact Us
                   </Link>
                </div>
              </Reveal>
           </div>
        </section>

        {/* --- SERVICES (NEW SECTION) --- */}
        <section className="py-24">
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

              <div className="grid grid-cols-1 gap-6">
                 <Reveal delay={0.2}>
                    <div className="flex gap-6 p-6 border border-white/5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
                       <div className="p-4 bg-white/5 rounded-full h-fit"><Sliders className="text-brand-red" /></div>
                       <div>
                          <h4 className="text-xl font-bold text-white mb-2">Mixing</h4>
                          <p className="text-sm text-brand-gray">Vocal tuning, dynamic balancing, and creative effects processing.</p>
                       </div>
                    </div>
                 </Reveal>
                 <Reveal delay={0.3}>
                    <div className="flex gap-6 p-6 border border-white/5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
                       <div className="p-4 bg-white/5 rounded-full h-fit"><Layers className="text-brand-red" /></div>
                       <div>
                          <h4 className="text-xl font-bold text-white mb-2">Mastering</h4>
                          <p className="text-sm text-brand-gray">Loudness optimization, stereo enhancement, and final polish for streaming.</p>
                       </div>
                    </div>
                 </Reveal>
                 <Reveal delay={0.4}>
                    <div className="flex gap-6 p-6 border border-white/5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
                       <div className="p-4 bg-white/5 rounded-full h-fit"><Mic2 className="text-brand-red" /></div>
                       <div>
                          <h4 className="text-xl font-bold text-white mb-2">Custom Production</h4>
                          <p className="text-sm text-brand-gray">Tailor-made instrumentals built from scratch to fit your artistic vision.</p>
                       </div>
                    </div>
                 </Reveal>
              </div>
           </div>
        </section>

      </div>
    </div>
  );
};