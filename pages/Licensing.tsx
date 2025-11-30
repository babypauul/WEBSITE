import React from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '../components/Reveal';
import { Button } from '../components/Button';
import { Check, Music, Disc, Mic2, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const LicenseCard: React.FC<{
  title: string;
  price: string;
  features: string[];
  icon: React.ReactNode;
  popular?: boolean;
  delay: number;
}> = ({ title, price, features, icon, popular, delay }) => (
  <Reveal delay={delay} width="100%" className="h-full">
    <div className={`relative h-full flex flex-col p-8 rounded-2xl border ${popular ? 'bg-white/5 border-brand-red/50 shadow-[0_0_30px_rgba(225,6,0,0.1)]' : 'bg-[#0F0F0F] border-white/5'} hover:border-brand-red/30 transition-all duration-300 group`}>
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-red text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-[0_5px_15px_rgba(225,6,0,0.4)]">
          Most Popular
        </div>
      )}
      
      <div className="mb-6 flex items-center justify-between">
         <div className={`p-3 rounded-lg ${popular ? 'bg-brand-red text-white' : 'bg-white/5 text-brand-gray group-hover:text-white transition-colors'}`}>
            {icon}
         </div>
         <div className="text-right">
            <h3 className="text-white font-bold uppercase tracking-wider text-sm">{title}</h3>
            <div className="text-2xl font-black text-white mt-1">{price}</div>
         </div>
      </div>

      <div className="flex-grow space-y-4 mb-8">
        {features.map((feature, i) => (
          <div key={i} className="flex items-start gap-3 text-sm text-brand-gray group-hover:text-white/80 transition-colors">
            <Check size={16} className={`mt-0.5 ${popular ? 'text-brand-red' : 'text-brand-gray group-hover:text-brand-red'}`} />
            <span className="leading-tight">{feature}</span>
          </div>
        ))}
      </div>

      <Link to="/contact">
        <Button variant={popular ? 'primary' : 'outline'} className="w-full">
           Purchase
        </Button>
      </Link>
    </div>
  </Reveal>
);

export const Licensing: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-screen">
      <div className="text-center max-w-4xl mx-auto mb-20">
        <Reveal>
          <h2 className="text-brand-red font-bold uppercase tracking-[0.3em] text-sm mb-3">Contracts</h2>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">LICENSING INFO</h1>
          <p className="text-brand-gray text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Clear, simple terms. Choose the license that fits your project needs. 
            Upgrade at any time by paying the difference.
          </p>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <LicenseCard 
          title="Basic Lease"
          price="$29.99"
          delay={0.1}
          icon={<Music size={24} />}
          features={[
            "MP3 File (320kbps)",
            "Non-Exclusive Rights",
            "50,000 Streams Cap",
            "1 Music Video",
            "Credit Required (Prod. Babypauul)",
            "Instant Download"
          ]}
        />
        
        <LicenseCard 
          title="Premium Lease"
          price="$49.99"
          delay={0.2}
          popular={true}
          icon={<Disc size={24} />}
          features={[
            "WAV + MP3 Files",
            "Non-Exclusive Rights",
            "500,000 Streams Cap",
            "Unlimited Videos",
            "Radio Airplay Rights",
            "Track Stems Included",
            "Credit Required"
          ]}
        />
        
        <LicenseCard 
          title="Exclusive"
          price="Make Offer"
          delay={0.3}
          icon={<Star size={24} />}
          features={[
            "WAV + MP3 + Stems",
            "Exclusive Ownership",
            "Unlimited Streams",
            "Unlimited Distribution",
            "Beat Removed from Store",
            "Full Publishing Rights",
            "No Credit Required"
          ]}
        />
      </div>

      <div className="mt-20 p-8 border border-white/10 rounded-xl bg-white/5 text-center">
         <h3 className="text-white font-bold text-xl mb-4">Have Questions?</h3>
         <p className="text-brand-gray mb-6">Read our full Terms of Service for detailed legal definitions or contact us directly.</p>
         <Link to="/terms" className="text-brand-red hover:text-white underline underline-offset-4 transition-colors">Read Full Terms</Link>
      </div>
    </div>
  );
};