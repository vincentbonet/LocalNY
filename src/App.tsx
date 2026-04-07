import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';


export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/federal" element={<Federal />} />
              <Route path="/statewide" element={<Statewide />} />
              <Route path="/state-legislature" element={<StateLegislature />} />
              <Route path="/nyc" element={<NYC />} />
              <Route path="/metro" element={<Metro />} />
              <Route path="/county" element={<County />} />
              <Route path="/local" element={<Local />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}