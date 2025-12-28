import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout.tsx';
import { PlayerProvider } from './context/PlayerContext.tsx';
import { CartProvider } from './context/CartContext.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { Home } from './pages/Home.tsx';
import { Music } from './pages/Music.tsx';
import { Beats } from './pages/Beats.tsx';
import { About } from './pages/About.tsx';
import { Contact } from './pages/Contact.tsx';
import { Licensing } from './pages/Licensing.tsx';
import { Privacy } from './pages/Privacy.tsx';
import { Terms } from './pages/Terms.tsx';
import { Services } from './pages/Services.tsx';
import { AiStudio } from './pages/AiStudio.tsx';
import { ScrollToTop } from './components/ScrollToTop.tsx';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <PlayerProvider>
        <CartProvider>
          <HashRouter>
            <ScrollToTop />
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/music" element={<Music />} />
                <Route path="/beats" element={<Beats />} />
                <Route path="/services" element={<Services />} />
                <Route path="/ai-studio" element={<AiStudio />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/licensing" element={<Licensing />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
              </Routes>
            </Layout>
          </HashRouter>
        </CartProvider>
      </PlayerProvider>
    </ThemeProvider>
  );
};

export default App;