import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';
import { X, Cookie } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Delay showing banner slightly for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-4 left-4 right-4 md:left-8 md:bottom-8 z-[100] max-w-md"
        >
          <div className="bg-[#0A0A0A]/95 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
            {/* Red Glow Accent */}
            <div className="absolute -top-10 -left-10 w-24 h-24 bg-brand-red/20 blur-[50px] rounded-full pointer-events-none"></div>

            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Cookie className="text-brand-red" size={24} />
                  <h3 className="text-white font-bold text-lg">Cookies & Privacy</h3>
                </div>
                <button 
                  onClick={() => setIsVisible(false)}
                  className="text-brand-gray hover:text-white transition-colors p-1"
                >
                  <X size={20} />
                </button>
              </div>
              
              <p className="text-brand-gray text-sm mb-6 leading-relaxed">
                We use cookies to ensure you get the best experience on our website, analyze traffic, and personalize content. By continuing to browse, you agree to our use of cookies. 
                <Link to="/privacy" className="text-white hover:text-brand-red ml-1 border-b border-white/20 hover:border-brand-red transition-colors">Learn more</Link>
              </p>

              <div className="flex gap-4">
                <Button 
                  variant="primary" 
                  onClick={acceptCookies}
                  className="flex-1 py-3 text-xs"
                >
                  Accept All
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsVisible(false)}
                  className="flex-1 py-3 text-xs"
                >
                  Essential Only
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};