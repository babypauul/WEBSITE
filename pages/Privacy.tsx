import React from 'react';
import { Reveal } from '../components/Reveal';

export const Privacy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen">
       <Reveal>
         <h1 className="text-4xl md:text-5xl font-black text-white mb-12 tracking-tight">PRIVACY POLICY</h1>
       </Reveal>

       <Reveal delay={0.2}>
         <div className="prose prose-invert prose-lg text-brand-gray font-light">
           <p className="text-sm uppercase tracking-widest text-brand-red font-bold mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

           <h3 className="text-white font-bold mt-12 mb-4">1. Introduction</h3>
           <p>
             Babypauul ("we", "our", or "us") respects your privacy and is committed to protecting your personal data. 
             This privacy policy will inform you as to how we look after your personal data when you visit our website 
             (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
           </p>

           <h3 className="text-white font-bold mt-12 mb-4">2. The Data We Collect</h3>
           <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:</p>
           <ul className="list-disc pl-6 space-y-2 mt-4">
             <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
             <li><strong>Contact Data:</strong> includes email address and telephone number (when provided via contact forms).</li>
             <li><strong>Transaction Data:</strong> includes details about payments to and from you and other details of products and services you have purchased from us (via BeatStars/Airbit).</li>
             <li><strong>Usage Data:</strong> includes information about how you use our website, products and services.</li>
           </ul>

           <h3 className="text-white font-bold mt-12 mb-4">3. How We Use Your Data</h3>
           <p>
             We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
           </p>
           <ul className="list-disc pl-6 space-y-2 mt-4">
             <li>Where we need to perform the contract we are about to enter into or have entered into with you (e.g., delivering beats).</li>
             <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
             <li>Where we need to comply with a legal or regulatory obligation.</li>
           </ul>

           <h3 className="text-white font-bold mt-12 mb-4">4. Third-Party Links</h3>
           <p>
             This website includes links to third-party websites (such as BeatStars, Spotify, Instagram). Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements.
           </p>

           <h3 className="text-white font-bold mt-12 mb-4">5. Contact Us</h3>
           <p>
             If you have any questions about this privacy policy or our privacy practices, please contact us via the Contact page.
           </p>
         </div>
       </Reveal>
    </div>
  );
};