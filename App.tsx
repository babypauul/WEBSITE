import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { PlayerProvider } from './context/PlayerContext';
import { Home } from './pages/Home';
import { Music } from './pages/Music';
import { Beats } from './pages/Beats';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { ScrollToTop } from './components/ScrollToTop';

const App: React.FC = () => {
  return (
    <PlayerProvider>
      <HashRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="music" element={<Music />} />
            <Route path="beats" element={<Beats />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </HashRouter>
    </PlayerProvider>
  );
};

export default App;