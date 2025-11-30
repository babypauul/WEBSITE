
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { Menu, X, Instagram, Twitter, Youtube, Mail, ChevronUp, ArrowRight, ShoppingCart } from 'lucide-react';
import { NAVIGATION } from '../constants';
import { Player } from './Player';
import { usePlayer } from '../context/PlayerContext';
import { AnimatePresence, motion } from 'framer-motion';
import { CustomCursor } from './CustomCursor';
import { Button } from './Button';
import { BackgroundParticles } from './BackgroundParticles';
import { CookieBanner } from './CookieBanner';
import { Logo } from './Logo';

export const Layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { currentTrack } = usePlayer();
  const location = useLocation();
  const cartCount = 0; // Placeholder for cart logic
  
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div 
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{
        paddingBottom: currentTrack ? 'calc(100px + env(safe-area-inset-bottom))' : 'env(safe-area-inset-bottom)'
      }}
    >
      <CustomCursor />
      <BackgroundParticles />
      <CookieBanner />

      {/* --- NAVIGATION --- */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 w-full z-[60] transition-all duration-500 ${scrolled ? 'bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/5 py-2' : 'bg-transparent py-6'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Branding / Logo - Removed Icon, Text Only, PRODUCER is White */}
            <Link 
              to="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex flex-col z-50 group cursor-hover"
            >
                <span className="text-xl font-black tracking-tighter text-brand-red leading-none drop-shadow-[0_0_20px_rgba(225,6,0,0.4)] transition-all duration-500 group-hover:text-white group-hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.6)]">
                  BABYPAUUL
                </span>
                <span className="text-[0.6rem] font-bold uppercase tracking-[0.35em] text-white leading-none mt-1 group-hover:text-brand-red transition-colors duration-300">
                  PRODUCER
                </span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center space-x-10">
              {NAVIGATION.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `relative text-[10px] font-bold uppercase tracking-[0.2em] transition-colors py-2 cursor-hover ${
                      isActive ? 'text-white' : 'text-brand-gray/60 hover:text-white'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}

              {/* Cart Button */}
              <button className="relative group text-brand-gray hover:text-white transition-colors cursor-hover">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-brand-red text-white text-[9px] font-bold flex items-center justify-center rounded-full shadow-[0_0_10px_rgba(225,6,0,0.5)]">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-6">
              <button className="relative group text-brand-gray hover:text-white transition-colors">
                  <ShoppingCart size={20} />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 w-4 h-4 bg-brand-red text-white text-[9px] font-bold flex items-center justify-center rounded-full">
                      {cartCount}
                    </span>
                  )}
              </button>
              <button onClick={toggleMenu} className="text-white p-2">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-white/10 overflow-hidden relative z-[60]"
            >
              <div className="px-4 pt-4 pb-8 space-y-2">
                {NAVIGATION.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) => 
                      `block px-4 py-4 text-lg font-bold uppercase tracking-widest border-l-2 transition-all ${
                        isActive 
                          ? 'text-brand-red bg-white/5 border-brand-red' 
                          : 'border-transparent text-brand-gray hover:text-white hover:border-white/20'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-grow relative z-10">
        <AnimatePresence mode="wait">
          {/* Changed 'key' to use pathname to ensure transitions fire correctly on route change */}
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 0.5, ease: "easeInOut" }} 
            className="w-full h-full pt-24"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-[#050505]/80 backdrop-blur-lg pt-20 pb-10 border-t border-white/5 relative overflow-hidden z-10">
        {/* Gradient Top */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
              {/* Brand */}
              <div className="md:col-span-4">
                <Link to="/" className="flex items-center gap-3 mb-6 w-fit group">
                   <Logo className="h-8 w-8 text-white transition-transform group-hover:scale-110" />
                   <div className="flex flex-col">
                     <span className="text-2xl font-black tracking-tighter text-white leading-none group-hover:text-brand-red transition-colors">BABYPAUUL</span>
                     <span className="text-[0.6rem] uppercase tracking-[0.3em] text-brand-gray/50 leading-none mt-1">Killstreet Studio</span>
                   </div>
                </Link>
                <p className="text-brand-gray text-sm leading-relaxed mb-6 max-w-sm">
                   Defining the sound of the underground. Premium beats, mixing, and mastering services for serious artists.
                </p>
                <div className="flex space-x-4">
                  {[Instagram, Twitter, Youtube, Mail].map((Icon, idx) => (
                    <a 
                      key={idx}
                      href="#" 
                      className="text-brand-gray hover:text-white transition-all duration-300 hover:scale-110 bg-white/5 p-3 rounded-full cursor-hover hover:bg-brand-red hover:shadow-[0_0_15px_rgba(225,6,0,0.5)]"
                    >
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="md:col-span-3 md:col-start-6">
                 <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Explore</h4>
                 <ul className="space-y-4">
                    {NAVIGATION.map(item => (
                       <li key={item.path}>
                          <NavLink 
                            to={item.path} 
                            className={({ isActive }) => 
                              `text-sm transition-colors hover:translate-x-2 inline-block duration-200 ${
                                isActive ? 'text-brand-red' : 'text-brand-gray hover:text-brand-red'
                              }`
                            }
                          >
                             {item.label}
                          </NavLink>
                       </li>
                    ))}
                 </ul>
              </div>

              {/* Newsletter */}
              <div className="md:col-span-4">
                 <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Stay Updated</h4>
                 <p className="text-brand-gray text-xs mb-4">Get exclusive beats and discounts directly to your inbox.</p>
                 <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
                    <div className="relative">
                       <input 
                         type="email" 
                         placeholder="Enter your email" 
                         className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all placeholder-white/20 cursor-hover"
                       />
                    </div>
                    <Button variant="outline" className="w-full py-3 text-xs border-white/20 hover:border-brand-red hover:bg-brand-red/10">
                       Subscribe <ArrowRight size={14} className="ml-2" />
                    </Button>
                 </form>
              </div>
           </div>

           <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-brand-gray/50 text-xs font-mono">
                &copy; {new Date().getFullYear()} Babypauul. All rights reserved.
              </p>
              <div className="flex gap-6 text-xs text-brand-gray/50 font-mono">
                 <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                 <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                 <Link to="/licensing" className="hover:text-white transition-colors">Licensing Info</Link>
              </div>
           </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className={`fixed ${currentTrack ? 'bottom-28' : 'bottom-8'} right-8 z-30 p-4 bg-brand-red text-white rounded-full shadow-[0_4px_20px_rgba(225,6,0,0.4)] hover:shadow-[0_0_30px_rgba(225,6,0,0.8)] transition-all hover:-translate-y-2 cursor-hover border border-white/20 backdrop-blur-md`}
          >
            <ChevronUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      <Player />
    </div>
  );
};
