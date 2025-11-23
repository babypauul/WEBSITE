import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Music4, Mic2, Disc, Star, ExternalLink, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { BeatCard } from '../components/BeatCard';
import { BEAT_DATA, CREDITS_DATA } from '../constants';

// Sub-components for sections to keep code clean
const SectionDivider = () => (
  <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent my-20" />
);

export const Home: React.FC = () => {
  const featuredBeats = BEAT_DATA.slice(0, 3);
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div className="w-full bg-transparent">
      {/* --- HERO SECTION --- */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Atmospheric Background Elements */}
        <div className="absolute inset-0 pointer-events-none z-0">
             {/* Deep red ambient glow bottom left */}
             <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] bg-brand-red/10 blur-[150px] rounded-full animate-pulse duration-[8s]" />
             {/* White fog top right */}
             <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-white/3 blur-[120px] rounded-full mix-blend-overlay" />
             {/* Center spotlight */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vh] bg-gradient-radial from-white/5 to-transparent opacity-30" />
        </div>

        {/* Parallax Background */}
        <motion.div 
          style={{ y: yBg }}
          className="absolute inset-0 z-0 scale-105"
        >
          <img 
            src="https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=2800&auto=format&fit=crop" 
            alt="Hero Studio" 
            className="w-full h-full object-cover opacity-20 filter brightness-50 contrast-125 grayscale"
          />
          {/* Stronger vignettes for focus */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/70 to-[#0A0A0A]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
        </motion.div>

        {/* Content */}
        <motion.div 
          style={{ opacity: opacityHero, y: yText }}
          className="relative z-10 max-w-7xl mx-auto px-4 text-center flex flex-col items-center"
        >
          {/* TUNNEL VISION TEXT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="flex flex-col items-center mb-10 leading-none relative group cursor-default select-none"
          >
            {/* Main Title - Cinematic Styling */}
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500 tracking-tighter drop-shadow-[0_0_40px_rgba(255,255,255,0.15)] relative z-10">
              TUNNEL
            </h1>
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-600 tracking-tighter drop-shadow-[0_0_40px_rgba(255,255,255,0.15)] -mt-2 md:-mt-6 relative z-10">
              VISION
            </h1>
            
            {/* Subtle Reflection / Depth */}
            <div className="absolute inset-0 top-1/2 bg-gradient-to-t from-white/10 to-transparent blur-3xl -z-10 opacity-40" />
          </motion.div>

          {/* Badge moved below text - refined style */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mb-12"
          >
             <div className="inline-flex items-center gap-3 border border-white/10 px-6 py-2 rounded-full bg-black/60 backdrop-blur-md hover:bg-white/5 transition-all duration-500 group shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-red"></span>
                </span>
                <span className="text-white/70 group-hover:text-white font-medium uppercase text-[0.65rem] tracking-[0.35em] transition-colors">Available for Work</span>
             </div>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="text-brand-gray/80 text-lg md:text-xl max-w-2xl font-light leading-relaxed mb-12 mix-blend-screen"
          >
            Crafting dark, cinematic soundscapes for the digital age. <br className="hidden md:block"/>
            Producer, Sound Designer, and Visual Artist.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 w-full max-w-md z-20"
          >
            <Link to="/music" className="flex-1">
              <Button variant="outline" className="w-full border-white/10 hover:border-brand-red/50 hover:shadow-[0_0_30px_rgba(225,6,0,0.1)]">Listen</Button>
            </Link>
            <Link to="/beats" className="flex-1">
              <Button variant="primary" className="w-full bg-brand-red hover:bg-brand-red/90">
                Beat Store <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-30 hover:opacity-60 transition-opacity"
        >
          <span className="text-[0.6rem] uppercase tracking-[0.4em] text-white">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* --- LATEST MUSIC (SPOTIFY EMBEDS) --- */}
        <section className="py-20">
           <div className="flex justify-between items-end mb-12">
             <div>
                <h2 className="text-brand-red font-bold uppercase tracking-[0.2em] text-sm mb-2">Selected Works</h2>
                <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight">LATEST RELEASES</h3>
             </div>
             <Link to="/music" className="hidden md:flex items-center text-sm font-bold uppercase tracking-widest text-brand-gray hover:text-white transition-colors group">
                View Discography <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
             </Link>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {/* Track 1: Homie */}
             <motion.div
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ delay: 0, duration: 0.5 }}
               className="group relative flex flex-col h-full bg-[#0F0F0F] rounded-2xl overflow-hidden border border-white/5 hover:border-brand-red/30 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(225,6,0,0.15)]"
             >
                <div className="relative">
                  <iframe 
                    style={{ borderRadius: '0px', marginBottom: '-5px' }} 
                    src="https://open.spotify.com/embed/track/7IbqNeOivzHYdXD7J6uHSq?utm_source=generator&theme=0" 
                    width="100%" 
                    height="352" 
                    frameBorder={0} 
                    allowFullScreen={true}
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                    loading="lazy"
                    title="Homie"
                    className="opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                  {/* Subtle gradient overlay to blend iframe edges */}
                  <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#0F0F0F] to-transparent pointer-events-none"></div>
                </div>
                
                <div className="p-6 relative z-10 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-3">
                    <span className="px-2 py-1 bg-brand-red/10 border border-brand-red/20 rounded text-[10px] font-bold uppercase text-brand-red tracking-wider">
                      Latest Single
                    </span>
                    <span className="text-brand-gray/50 text-xs font-mono flex items-center gap-1">
                      <Calendar size={12} /> 2024
                    </span>
                  </div>
                  <h4 className="text-white text-xl font-bold mb-2 group-hover:text-brand-red transition-colors">HOMIE</h4>
                  <p className="text-brand-gray text-sm font-light leading-relaxed mb-4">
                    A raw, melodic exploration of loyalty and street politics. Featuring dark piano riffs and heavy 808s.
                  </p>
                  <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-brand-gray/60 group-hover:text-white transition-colors">
                     <span>Babypauul</span>
                     <ExternalLink size={14} />
                  </div>
                </div>
             </motion.div>

             {/* Track 2: Thinking About You */}
             <motion.div
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ delay: 0.1, duration: 0.5 }}
               className="group relative flex flex-col h-full bg-[#0F0F0F] rounded-2xl overflow-hidden border border-white/5 hover:border-brand-red/30 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(225,6,0,0.15)]"
             >
                <div className="relative">
                  <iframe 
                    style={{ borderRadius: '0px', marginBottom: '-5px' }} 
                    src="https://open.spotify.com/embed/track/43uLpGO5OagtSVFSAoOIUl?utm_source=generator&theme=0" 
                    width="100%" 
                    height="352" 
                    frameBorder={0} 
                    allowFullScreen={true}
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                    loading="lazy"
                    title="Thinking About You"
                    className="opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#0F0F0F] to-transparent pointer-events-none"></div>
                </div>

                <div className="p-6 relative z-10 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-3">
                    <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] font-bold uppercase text-brand-gray tracking-wider group-hover:border-white/20 transition-colors">
                      Featured
                    </span>
                    <span className="text-brand-gray/50 text-xs font-mono flex items-center gap-1">
                      <Calendar size={12} /> 2023
                    </span>
                  </div>
                  <h4 className="text-white text-xl font-bold mb-2 group-hover:text-brand-red transition-colors">THINKING ABOUT YOU</h4>
                  <p className="text-brand-gray text-sm font-light leading-relaxed mb-4">
                    Atmospheric late-night vibes. Deep bass, ethereal pads, and smooth vocal chops create a nostalgic mood.
                  </p>
                  <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-brand-gray/60 group-hover:text-white transition-colors">
                     <span>Babypauul</span>
                     <ExternalLink size={14} />
                  </div>
                </div>
             </motion.div>

             {/* Track 3 */}
             <motion.div
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ delay: 0.2, duration: 0.5 }}
               className="group relative flex flex-col h-full bg-[#0F0F0F] rounded-2xl overflow-hidden border border-white/5 hover:border-brand-red/30 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(225,6,0,0.15)]"
             >
                <div className="relative">
                  <iframe 
                    style={{ borderRadius: '0px', marginBottom: '-5px' }} 
                    src="https://open.spotify.com/embed/track/3tgbo7ajgLyIE8qbN3dNU8?utm_source=generator&theme=0" 
                    width="100%" 
                    height="352" 
                    frameBorder={0} 
                    allowFullScreen={true}
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                    loading="lazy"
                    title="Spotify Release 3"
                    className="opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#0F0F0F] to-transparent pointer-events-none"></div>
                </div>

                <div className="p-6 relative z-10 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-3">
                    <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] font-bold uppercase text-brand-gray tracking-wider group-hover:border-white/20 transition-colors">
                      Collaboration
                    </span>
                    <span className="text-brand-gray/50 text-xs font-mono flex items-center gap-1">
                      <Calendar size={12} /> 2023
                    </span>
                  </div>
                  <h4 className="text-white text-xl font-bold mb-2 group-hover:text-brand-red transition-colors">THE VISION</h4>
                  <p className="text-brand-gray text-sm font-light leading-relaxed mb-4">
                    High energy trap anthem. Crisp percussion and distorted synths designed for the club systems.
                  </p>
                  <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-brand-gray/60 group-hover:text-white transition-colors">
                     <span>Babypauul</span>
                     <ExternalLink size={14} />
                  </div>
                </div>
             </motion.div>
           </div>
           
           <div className="mt-8 text-center md:hidden">
              <Link to="/music">
                <Button variant="outline" className="w-full">View All Music</Button>
              </Link>
           </div>
        </section>

        <SectionDivider />

        {/* --- BEAT STORE PREVIEW --- */}
        <section className="py-20 relative">
           {/* Background Glow */}
           <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-red/5 blur-[120px] rounded-full pointer-events-none" />
           
           <div className="flex flex-col md:flex-row gap-12 items-start">
              <div className="md:w-1/3 md:sticky md:top-32">
                 <h2 className="text-brand-red font-bold uppercase tracking-[0.2em] text-sm mb-2">Production</h2>
                 <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">BEAT STORE</h3>
                 <p className="text-brand-gray leading-relaxed mb-8">
                   High-fidelity instrumentals ready for your next hit. Includes unlimited leases, track stems, and exclusive rights.
                 </p>
                 <div className="flex gap-4 mb-8">
                   <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-white/80">
                     <Music4 size={16} className="text-brand-red" /> MP3 & WAV
                   </div>
                   <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-white/80">
                     <Mic2 size={16} className="text-brand-red" /> Commercial Use
                   </div>
                 </div>
                 <Link to="/beats">
                    <Button variant="primary" className="w-full md:w-auto">Visit Store</Button>
                 </Link>
              </div>
              
              <div className="md:w-2/3 w-full flex flex-col gap-4">
                {featuredBeats.map((beat, i) => (
                  <motion.div
                    key={beat.id}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                  >
                    <BeatCard beat={beat} />
                  </motion.div>
                ))}
              </div>
           </div>
        </section>

        <SectionDivider />

        {/* --- CREDITS / PROJECTS --- */}
        <section className="py-20 relative overflow-hidden">
           <h2 className="text-center text-brand-red font-bold uppercase tracking-[0.2em] text-sm mb-12">Production Credits</h2>
           
           <div className="relative w-full">
             <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10"></div>
             <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10"></div>
             
             {/* Marquee Effect */}
             <div className="flex overflow-hidden group">
                <motion.div 
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                  className="flex gap-16 items-center whitespace-nowrap"
                >
                   {[...CREDITS_DATA, ...CREDITS_DATA, ...CREDITS_DATA].map((credit, i) => (
                      <div key={i} className="flex flex-col items-center justify-center opacity-50 hover:opacity-100 transition-opacity cursor-default">
                         <span className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 uppercase">
                           {credit.artist}
                         </span>
                         <div className="flex items-center gap-2 text-xs text-brand-red font-mono uppercase tracking-widest mt-2">
                            <Disc size={10} /> {credit.role}
                         </div>
                      </div>
                   ))}
                </motion.div>
             </div>
           </div>
        </section>

        <SectionDivider />

        {/* --- ARTIST SHORT BIO --- */}
        <section className="py-20 text-center relative overflow-hidden rounded-2xl bg-brand-dark/30 border border-white/5 p-12 backdrop-blur-sm">
           <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
              <Star className="text-brand-red mb-6 w-8 h-8 opacity-80" />
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">THE SOUND OF TOMORROW</h2>
              <p className="text-brand-gray text-lg mb-8 font-light">
                "I don't just make beats; I create atmospheres. Every track is a story waiting for a voice."
              </p>
              <Link to="/about">
                 <Button variant="ghost" className="border border-white/10 hover:border-brand-red">Read Full Bio</Button>
              </Link>
           </div>
           
           {/* Abstract BG */}
           <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
           <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-brand-red/10 blur-[100px] rounded-full"></div>
        </section>

        {/* Space for footer */}
        <div className="pb-20"></div>
      </div>
    </div>
  );
};