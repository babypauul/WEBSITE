
import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { PlayerProvider } from './context/PlayerContext';
import { Home } from './pages/Home';
import { Music } from './pages/Music';
import { Beats } from './pages/Beats';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Licensing } from './pages/Licensing';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { ScrollToTop } from './components/ScrollToTop';

const App: React.FC = () => {
  return (
    <PlayerProvider>
      <HashRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/music" element={<Music />} />
            <Route path="/beats" element={<Beats />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/licensing" element={<Licensing />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
        </Layout>
      </HashRouter>
    </PlayerProvider>
  );
};

export default App;
