import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { Menu, X, Instagram, Youtube, Mail, ChevronUp, ArrowRight, ShoppingCart, Sun, Moon } from 'lucide-react';
import { NAVIGATION, SOCIALS } from '../constants.ts';
import { Player } from './Player.tsx';
import { usePlayer } from '../context/PlayerContext.tsx';
import { AnimatePresence, motion } from 'framer-motion';
import { CustomCursor } from './CustomCursor.tsx';
import { Button } from './Button.tsx';
import { ActiveBackground } from './ActiveBackground.tsx';
import { CookieBanner } from './CookieBanner.tsx';
import { CartDrawer } from './CartDrawer.tsx';
import { useCart } from '../context/CartContext.tsx';
import { useTheme } from '../context/ThemeContext.tsx';
import Lenis from 'lenis';

export const Layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { currentTrack } = usePlayer();
  const { cart, toggleCart } = useCart();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Corrected Lenis initialization for robust scroll wheel detection
    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    
    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
    });
    resizeObserver.observe(document.body);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      resizeObserver.disconnect();
      lenis.destroy();
    };
  }, []);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div 
      className="min-h-screen flex flex-col relative overflow-hidden bg-brand-light dark:bg-[#050505] transition-colors duration-500"
      style={{
        paddingBottom: currentTrack ? 'calc(100px + env(safe-area-inset-bottom))' : 'env(safe-area-inset-bottom)'
      }}
    >
      <CustomCursor />
      <ActiveBackground />
      <CartDrawer />
      <CookieBanner />

      {/* --- NAVIGATION --- */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 w-full z-[60] transition-all duration-700 ${
          scrolled 
            ? 'bg-white/80 dark:bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-black/5 dark:border-white/5 py-2 shadow-sm' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              to="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex flex-col z-50 group cursor-hover"
            >
                <span className="text-xl font-black tracking-tighter text-brand-red leading-none drop-shadow-[0_0_20px_#E1060066] transition-all duration-500 group-hover:text-brand-black dark:group-hover:text-white">
                  BABYPAUUL
                </span>
                <span className="text-[0.6rem] font-bold uppercase tracking-[0.35em] text-brand-black dark:text-white leading-none mt-1 group-hover:text-brand-red transition-colors duration-300">
                  Killstreet Studio
                </span>
            </Link>

            <div className="hidden md:flex items-center space-x-10">
              {NAVIGATION.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `relative text-[10px] font-black uppercase tracking-[0.3em] transition-colors py-2 cursor-hover ${
                      isActive 
                        ? 'text-brand-black dark:text-white' 
                        : 'text-brand-gray/60 hover:text-brand-black dark:hover:text-white'
                    }`
                  }
                >
                  {item.label}
                  {location.pathname === item.path && (
                    <motion.div 
                      layoutId="nav-pill" 
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-brand-red shadow-[0_0_10px_#E10600]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </NavLink>
              ))}

              <div className="flex items-center gap-4 pl-4 border-l border-white/10">
                <button
                  onClick={toggleTheme}
                  className="text-brand-gray hover:text-brand-black dark:hover:text-white transition-colors cursor-hover p-2"
                  title="Toggle Theme"
                >
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>

                <button 
                  onClick={toggleCart}
                  className="relative group text-brand-gray hover:text-brand-black dark:hover:text-white transition-colors cursor-hover p-2"
                >
                  <ShoppingCart size={18} />
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-red text-white text-[9px] font-bold flex items-center justify-center rounded-full shadow-[0_0_10px_#E1060066] animate-pulse">
                      {cart.length}
                    </span>
                  )}
                </button>
              </div>
            </div>

            <div className="md:hidden flex items-center gap-6">
              <button onClick={toggleTheme} className="text-brand-gray p-2">
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button onClick={toggleCart} className="relative group text-brand-gray">
                  <ShoppingCart size={20} />
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-red text-white text-[9px] font-bold flex items-center justify-center rounded-full">
                      {cart.length}
                    </span>
                  )}
              </button>
              <button onClick={toggleMenu} className="text-brand-black dark:text-white p-2">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden bg-white/95 dark:bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-black/5 dark:border-white/10 overflow-hidden relative z-[60]"
            >
              <div className="px-4 pt-4 pb-8 space-y-2">
                {NAVIGATION.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) => 
                      `block px-4 py-4 text-sm font-black uppercase tracking-[0.2em] border-l-4 transition-all ${
                        isActive 
                          ? 'text-brand-red bg-white/5 border-brand-red' 
                          : 'border-transparent text-brand-gray hover:text-brand-black dark:hover:text-white'
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
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, scale: 0.99, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.01, filter: 'blur(20px)' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} 
            className="w-full h-full pt-24"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="bg-white/50 dark:bg-[#050505]/80 backdrop-blur-lg pt-20 pb-10 border-t border-black/5 dark:border-white/5 relative overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
              <div className="md:col-span-4">
                <Link to="/" className="flex flex-col gap-1 mb-6 w-fit group">
                   <span className="text-2xl font-black tracking-tighter text-brand-black dark:text-white leading-none group-hover:text-brand-red transition-colors">BABYPAUUL</span>
                   <span className="text-[0.6rem] font-bold uppercase tracking-[0.3em] text-brand-gray/50 leading-none">Killstreet Studio // Rovigo</span>
                </Link>
                <p className="text-brand-gray text-sm leading-relaxed mb-6 max-w-sm">
                   Defining the sound of the underground. High-fidelity production, mixing, and AI experimentation for global underground artists.
                </p>
                <div className="flex space-x-4">
                  {[
                    { Icon: Instagram, url: SOCIALS.instagram },
                    { Icon: Youtube, url: "#" },
                    { Icon: Mail, url: `mailto:${SOCIALS.management}` }
                  ].map(({Icon, url}, idx) => (
                    <a 
                      key={idx}
                      href={url} 
                      target="_blank"
                      rel="noreferrer"
                      className="text-brand-gray hover:text-white transition-all duration-300 hover:scale-110 bg-black/5 dark:bg-white/5 p-3 rounded-full cursor-hover hover:bg-brand-red"
                    >
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>

              <div className="md:col-span-3 md:col-start-6">
                 <h4 className="text-brand-black dark:text-white font-bold uppercase tracking-widest text-xs mb-6">Explore</h4>
                 <ul className="space-y-4">
                    {NAVIGATION.map(item => (
                       <li key={item.path}>
                          <NavLink to={item.path} className="text-sm text-brand-gray hover:text-brand-red transition-colors uppercase font-bold tracking-widest text-[10px]">{item.label}</NavLink>
                       </li>
                    ))}
                 </ul>
              </div>

              <div className="md:col-span-4">
                 <h4 className="text-brand-black dark:text-white font-bold uppercase tracking-widest text-xs mb-6">Newsletter</h4>
                 <p className="text-brand-gray text-xs mb-4">Get exclusive sample packs and AI presets directly.</p>
                 <form className="flex flex-col gap-3">
                    <input 
                      type="email" 
                      placeholder="Enter your email" 
                      className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded px-4 py-3 text-brand-black dark:text-white text-sm focus:outline-none focus:border-brand-red transition-all"
                    />
                    <Button variant="outline" className="w-full py-3 text-xs">
                       Join The List <ArrowRight size={14} className="ml-2" />
                    </Button>
                 </form>
              </div>
           </div>

           <div className="border-t border-black/5 dark:border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-brand-gray/50 font-mono">
              <p>&copy; {new Date().getFullYear()} Babypauul // Killstreet Studios.</p>
              <div className="flex gap-6">
                 <Link to="/privacy" className="hover:text-white">Privacy</Link>
                 <Link to="/terms" className="hover:text-white">Terms</Link>
                 <a href={SOCIALS.beatstars} target="_blank" rel="noreferrer" className="hover:text-white">Store</a>
              </div>
           </div>
        </div>
      </footer>

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={scrollToTop}
            className={`fixed ${currentTrack ? 'bottom-28' : 'bottom-8'} right-8 z-30 p-4 bg-brand-red text-white rounded-full shadow-lg transition-all hover:-translate-y-2 cursor-hover`}
          >
            <ChevronUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      <Player />
    </div>
  );
};