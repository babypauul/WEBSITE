import React from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '../components/Reveal';

export const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen flex items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <Reveal delay={0.2} width="100%">
          <div className="relative group">
            {/* Image Effects */}
            <div className="absolute -inset-4 bg-brand-red/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 bg-brand-red transform translate-x-4 translate-y-4 rounded-lg opacity-50 transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
            
            <img 
              src="https://images.unsplash.com/photo-1619983081563-430f63602796?q=80&w=1000&auto=format&fit=crop" 
              alt="Babypauul Portrait" 
              className="relative rounded-lg shadow-2xl w-full object-cover aspect-[3/4] filter contrast-125 grayscale group-hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </Reveal>
        
        <div className="space-y-10">
          <Reveal delay={0.4}>
            <div>
              <h2 className="text-brand-red font-bold uppercase tracking-[0.3em] text-sm mb-4">Biography</h2>
              
              {/* Replaced Text Title with Logo for Brand Consistency */}
              <div className="mb-6">
                <img src="/LOGO.svg" alt="Babypauul" className="h-16 w-auto" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2">KILLSTREET STUDIO</h3>
            </div>
          </Reveal>
          
          <Reveal delay={0.6}>
            <div className="space-y-6 text-brand-gray text-lg leading-relaxed font-light">
              <p>
                Born in the digital noise, <strong className="text-white font-bold">Babypauul</strong> is a sonic architect bridging the gap between raw emotion and calculated precision. Starting as a bedroom producer in 2018, he quickly carved a niche in the underground scene with his signature "haunted" basslines and cinematic textures.
              </p>
              <p>
                His production style draws heavy influence from dark trap, UK drill, and ambient electronic music. He doesn't just make beats; he builds worlds for artists to inhabit.
              </p>
            </div>
          </Reveal>
          
          <Reveal delay={0.8} width="100%">
            <div className="pt-10 grid grid-cols-2 gap-10 border-t border-white/10">
              <div>
                <span className="block text-5xl font-black text-white mb-2">5M+</span>
                <span className="text-brand-red text-xs uppercase tracking-[0.2em] font-bold">Streams</span>
              </div>
              <div>
                <span className="block text-5xl font-black text-white mb-2">100+</span>
                <span className="text-brand-red text-xs uppercase tracking-[0.2em] font-bold">Placements</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
};