import React from 'react';
import { Reveal } from '../components/Reveal';

export const Terms: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen">
       <Reveal>
         <h1 className="text-4xl md:text-5xl font-black text-white mb-12 tracking-tight">TERMS OF SERVICE</h1>
       </Reveal>

       <Reveal delay={0.2}>
         <div className="prose prose-invert prose-lg text-brand-gray font-light">
           <p className="text-sm uppercase tracking-widest text-brand-red font-bold mb-8">Effective Date: {new Date().toLocaleDateString()}</p>

           <h3 className="text-white font-bold mt-12 mb-4">1. Agreement to Terms</h3>
           <p>
             By accessing or using the Babypauul website, purchasing beats, or downloading content, you agree to be bound by these Terms of Service and our Privacy Policy.
           </p>

           <h3 className="text-white font-bold mt-12 mb-4">2. Intellectual Property Rights</h3>
           <p>
             All beats, instrumentals, and music available on this site are the intellectual property of Babypauul (Killstreet Studio). 
             Purchasing a license grants you rights to use the beat according to the specific license terms (Basic, Premium, or Exclusive). 
             <strong>You do not own the beat unless an Exclusive License is purchased and a contract is signed.</strong>
           </p>

           <h3 className="text-white font-bold mt-12 mb-4">3. Licensing & Usage</h3>
           <ul className="list-disc pl-6 space-y-2 mt-4">
             <li><strong>Non-Exclusive (Leasing):</strong> The producer (Babypauul) retains full ownership. The licensee receives limited rights for distribution (Spotify, Apple Music, etc.) up to a specific stream cap.</li>
             <li><strong>Credit:</strong> Credit must always be given to "Prod. Babypauul" in the track title or credits section.</li>
             <li><strong>Resale:</strong> You may not resell, sub-license, or redistribute the beat files alone.</li>
           </ul>

           <h3 className="text-white font-bold mt-12 mb-4">4. Refunds</h3>
           <p>
             Since we offer non-tangible, irrevocable digital goods, we do not issue refunds once the order is accomplished and the product is sent. 
             As a customer, you are responsible for understanding this upon purchasing any item at our site.
           </p>

           <h3 className="text-white font-bold mt-12 mb-4">5. Governing Law</h3>
           <p>
             These terms shall be governed by and defined following the laws of Italy. Babypauul and yourself irrevocably consent that the courts of Italy shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
           </p>
         </div>
       </Reveal>
    </div>
  );
};