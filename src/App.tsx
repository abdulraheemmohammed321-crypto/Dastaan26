/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import TeamSponsors from './components/TeamSponsors';
import BookingForm from './components/BookingForm';
import ARScanner from './components/ARScanner';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-emerald-950 text-white selection:bg-gold-500 selection:text-emerald-950">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/about" element={<About />} />
            <Route path="/team" element={<TeamSponsors />} />
            <Route path="/reserve" element={<BookingForm />} />
            <Route path="/ar" element={<ARScanner />} />
          </Routes>
        </main>
        
        {/* Footer */}
        <footer className="py-12 border-t border-gold-500/10 bg-emerald-950/50">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-gold-500 font-display text-xl mb-4 tracking-widest">DASTAAN'26</p>
            <p className="text-gold-300/40 text-xs uppercase tracking-[0.3em]">
              Crafted with passion by Batch of '24
            </p>
            <div className="mt-8 flex justify-center space-x-6 text-gold-300/60">
              <a href="#" className="hover:text-gold-400 transition-colors">Instagram</a>
              <a href="#" className="hover:text-gold-400 transition-colors">Twitter</a>
              <a href="#" className="hover:text-gold-400 transition-colors">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}
