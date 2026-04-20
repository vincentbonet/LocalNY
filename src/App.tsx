import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Federal from './pages/Federal';
import Statewide from './pages/Statewide';
import StateLegislature from './pages/StateLegislature';
import NYC from './pages/NYC';
import Metro from './pages/Metro';
import County from './pages/County';
import Local from './pages/Local';
import Midterm from './pages/Midterm';
import MapView from './pages/MapView';
import NotFound from './pages/NotFound';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header onMenuToggle={() => setMenuOpen((o) => !o)} menuOpen={menuOpen} />
        <div className="flex flex-1">
          <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
          <main className="flex-1 p-6 flex flex-col">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/map" element={<MapView />} />
              <Route path="/federal" element={<Federal />} />
              <Route path="/statewide" element={<Statewide />} />
              <Route path="/state-legislature" element={<StateLegislature />} />
              <Route path="/nyc" element={<NYC />} />
              <Route path="/metro" element={<Metro />} />
              <Route path="/county" element={<County />} />
              <Route path="/local" element={<Local />} />
              <Route path="/midterm" element={<Midterm />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
