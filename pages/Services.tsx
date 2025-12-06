import React from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '../components/Reveal';
import { Button } from '../components/Button';
import { Mic2, Sliders, Layers, Zap, Speaker, ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServiceCard: React.FC<{
  title: string;
  price: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  delay: number;
}> = ({ title, price, description, features, icon, delay }) => (
  <Reveal delay={delay} width="100%" className="h-full">
    <div className="group relative h-full flex flex-col p-8 rounded-3xl border border-white/5 bg-[#0A0A0A] hover:bg-white/[0.02] transition-all duration-500 overflow-hidden">
       {/* Hover Glow */}
       <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/5 rounded-full blur-[80px] group-hover:bg-brand-red/10 transition-colors pointer-events-none -translate-y-1/2 translate-x-1/2" />
       
       <div className="relative z-10 flex flex-col h-full">
         <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-brand-red group-hover:text-white border border-white/5 group-hover:border-transparent">
            {icon}
         </div>
         
         <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">{title}</h3>
         <div className="text-brand-red font-mono font-bold mb-4">{price}</div>
         <p className="text-brand-gray text-sm leading-relaxed mb-8 border-b border-white/5 pb-8">
            {description}
         </p>

         <ul className="space-y-4 mb-8 flex-grow">
            {features.map((f, i) => (
                <li key={i} className="flex gap-3 items-start text-sm text-brand-gray group-hover:text-white transition-colors">
                    <Check size={16} className="text-brand-red mt-0.5 shrink-0" />
                    <span>{f}</span>
                </li>
            ))}
         </ul>

         <Link to="/contact">
            <Button variant="outline" className="w-full group-hover:bg-white group-hover:text-black group-hover:border-white">
                Book Session
            </Button>
         </Link>
       </div>
    </div>
  </Reveal>
);

export const Services: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Hero */}
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
         <Reveal>
            <h2 className="text-brand-red font-bold uppercase tracking-[0.3em] text-sm mb-4">Killstreet Studio</h2>
            <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter">
               PROFESSIONAL<br /><span className="text-brand-gray">ENGINEERING</span>
            </h1>
            <p className="text-lg text-brand-gray/80 max-w-2xl mx-auto font-light leading-relaxed">
               Based in Rovigo, Italy. Delivering industry-standard sound for the underground. 
               Whether you need a quick vocal mix or full album mastering, we treat every project with major-label attention.
            </p>
         </Reveal>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServiceCard 
               title="Mixing"
               price="From €80 / track"
               description="Transform your raw stems into a balanced, radio-ready record. We focus on clarity, depth, and punch."
               icon={<Sliders size={24} />}
               delay={0.1}
               features={[
                  "Vocal Tuning (Melodyne/AutoTune)",
                  "Dynamic EQ & Compression",
                  "Creative FX & Automation",
                  "Analog Saturation",
                  "3 Revisions Included"
               ]}
            />
            <ServiceCard 
               title="Mastering"
               price="From €40 / track"
               description="The final polish. We ensure your track translates perfectly across all playback systems and streaming platforms."
               icon={<Layers size={24} />}
               delay={0.2}
               features={[
                  "Loudness Optimization",
                  "Stereo Width Enhancement",
                  "Tonal Balance Control",
                  "Metadata Tagging",
                  "Apple Digital Masters Ready"
               ]}
            />
            <ServiceCard 
               title="Full Production"
               price="Contact for Quote"
               description="Build a song from scratch. We provide custom beat making, arrangement, and creative direction."
               icon={<Zap size={24} />}
               delay={0.3}
               features={[
                  "Custom Instrumental",
                  "Songwriting Assistance",
                  "Arrangement & Structure",
                  "Session Musician Access",
                  "Full Mix & Master Included"
               ]}
            />
         </div>
      </div>

      {/* Equipment List - Bento Grid Style */}
      <div className="border-t border-white/5 bg-[#080808] py-24">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal width="100%">
               <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                  <div>
                     <h3 className="text-4xl font-black text-white tracking-tight uppercase">Selected Gear</h3>
                     <p className="text-brand-gray mt-2">A hybrid setup combining digital precision with analog warmth.</p>
                  </div>
                  <Link to="/contact">
                     <Button variant="primary">Download Gear List</Button>
                  </Link>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[600px]">
                  {/* Item 1 - Big */}
                  <div className="md:col-span-2 md:row-span-2 bg-[#111] rounded-3xl p-8 relative overflow-hidden group border border-white/5">
                     <img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1000&auto=format&fit=crop" alt="Console" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-700" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                     <div className="relative z-10 h-full flex flex-col justify-end">
                        <h4 className="text-3xl font-bold text-white mb-2">Monitoring</h4>
                        <p className="text-brand-gray">ATC SCM25A Pro & Yamaha NS-10M. Precision listening environment treated by GIK Acoustics.</p>
                     </div>
                  </div>
                  
                  {/* Item 2 */}
                  <div className="md:col-span-2 bg-[#111] rounded-3xl p-8 relative overflow-hidden group border border-white/5 flex flex-col justify-center">
                     <div className="absolute inset-0 bg-gradient-to-br from-brand-red/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                     <Mic2 className="text-white mb-4" size={32} />
                     <h4 className="text-xl font-bold text-white mb-1">Microphones</h4>
                     <p className="text-sm text-brand-gray">Neumann U87 Ai, Sony C800G, Shure SM7B.</p>
                  </div>

                  {/* Item 3 */}
                  <div className="bg-[#111] rounded-3xl p-8 relative overflow-hidden group border border-white/5 flex flex-col justify-center">
                     <Speaker className="text-white mb-4" size={32} />
                     <h4 className="text-xl font-bold text-white mb-1">Outboard</h4>
                     <p className="text-sm text-brand-gray">Universal Audio 1176LN, Tube-Tech CL 1B.</p>
                  </div>

                   {/* Item 4 */}
                   <div className="bg-[#111] rounded-3xl p-8 relative overflow-hidden group border border-white/5 flex flex-col justify-center">
                     <Zap className="text-white mb-4" size={32} />
                     <h4 className="text-xl font-bold text-white mb-1">DAW</h4>
                     <p className="text-sm text-brand-gray">Pro Tools Ultimate, Ableton Live 11, FL Studio.</p>
                  </div>
               </div>
            </Reveal>
         </div>
      </div>
    </div>
  );
};