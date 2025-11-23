import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/Button';
import { Send, Mail, MapPin, Clock, Check } from 'lucide-react';

export const Contact: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      // Reset after 3 seconds
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  const inputClasses = "w-full bg-[#151515] border border-white/10 rounded-lg p-4 text-white placeholder-brand-gray/30 focus:border-brand-red focus:bg-[#1A1A1A] focus:outline-none focus:ring-1 focus:ring-brand-red transition-all cursor-hover text-sm";
  const labelClasses = "block text-xs font-bold text-brand-gray mb-2 uppercase tracking-widest";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen flex items-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full">
        
        {/* Info Side */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
           <h2 className="text-brand-red font-bold uppercase tracking-[0.3em] text-sm mb-4">Get in Touch</h2>
           <h1 className="text-6xl md:text-7xl font-black text-white mb-8 leading-none tracking-tight">
             LET'S WORK
           </h1>
           <p className="text-brand-gray text-lg font-light mb-12 max-w-md leading-relaxed">
             Ready to take your sound to the next level? Whether you need exclusive rights, custom production, or mixing services, reach out.
           </p>

           <div className="space-y-8">
              <div className="flex items-start gap-4 group">
                 <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brand-red group-hover:text-white text-brand-gray transition-colors">
                    <Mail size={20} />
                 </div>
                 <div>
                    <h3 className="text-white font-bold uppercase tracking-wider text-sm mb-1">Email</h3>
                    <p className="text-brand-gray text-sm">management@babypauul.com</p>
                 </div>
              </div>
              <div className="flex items-start gap-4 group">
                 <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brand-red group-hover:text-white text-brand-gray transition-colors">
                    <MapPin size={20} />
                 </div>
                 <div>
                    <h3 className="text-white font-bold uppercase tracking-wider text-sm mb-1">Studio</h3>
                    <p className="text-brand-gray text-sm">Los Angeles, CA</p>
                 </div>
              </div>
              <div className="flex items-start gap-4 group">
                 <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brand-red group-hover:text-white text-brand-gray transition-colors">
                    <Clock size={20} />
                 </div>
                 <div>
                    <h3 className="text-white font-bold uppercase tracking-wider text-sm mb-1">Response Time</h3>
                    <p className="text-brand-gray text-sm">Usually within 24 hours</p>
                 </div>
              </div>
           </div>
        </motion.div>

        {/* Form Side */}
        <motion.form 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          onSubmit={handleSubmit} 
          className="bg-[#0F0F0F] border border-white/5 p-8 md:p-10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
        >
          {/* Top Glow */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-red to-transparent opacity-50"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className={labelClasses}>Name</label>
              <input 
                type="text" 
                id="name"
                required 
                className={inputClasses}
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className={labelClasses}>Email</label>
              <input 
                type="email" 
                id="email" 
                required
                className={inputClasses}
                placeholder="john@example.com"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="subject" className={labelClasses}>Inquiry Type</label>
            <div className="relative">
              <select 
                id="subject" 
                className={`${inputClasses} appearance-none`}
              >
                <option>Buying a Beat</option>
                <option>Custom Production</option>
                <option>Mixing & Mastering</option>
                <option>Booking</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-brand-gray">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <label htmlFor="message" className={labelClasses}>Message</label>
            <textarea 
              id="message" 
              rows={5} 
              required
              className={inputClasses}
              placeholder="Tell me about your project..."
            ></textarea>
          </div>

          <Button 
            type="submit" 
            variant="primary" 
            className={`w-full py-4 text-sm transition-all duration-300 ${status === 'success' ? '!bg-green-600 !border-green-500' : ''}`}
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? (
              'Sending...'
            ) : status === 'success' ? (
              <span className="flex items-center"><Check size={18} className="mr-2" /> Message Sent Successfully</span>
            ) : (
              <span className="flex items-center">Send Message <Send size={16} className="ml-2" /></span>
            )}
          </Button>
        </motion.form>
      </div>
    </div>
  );
};