/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import BookingForm from './components/BookingForm';
import ARScanner from './components/ARScanner';
import Snowfall from './components/Snowfall';

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.4, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
);

function AppContent() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-navy-950 text-white selection:bg-silver-500 selection:text-navy-950 relative">
      <Snowfall />
      <Navbar />
      <main>
        <AnimatePresence mode="wait">
          <div key={location.pathname}>
            <Routes location={location}>
              <Route path="/" element={<PageWrapper><Hero /></PageWrapper>} />
              <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
              <Route path="/reserve" element={<PageWrapper><BookingForm /></PageWrapper>} />
              <Route path="/ar" element={<PageWrapper><ARScanner /></PageWrapper>} />
            </Routes>
          </div>
        </AnimatePresence>
      </main>
      
      {/* Footer */}
      <footer className="py-12 border-t border-silver-500/10 bg-navy-950/50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-silver-500 font-display text-xl mb-4 tracking-widest">DASTAAN'26</p>
          <p className="text-silver-300/40 text-xs uppercase tracking-[0.3em]">
            Crafted with passion by Batch of '24
          </p>
          <div className="mt-8 flex justify-center space-x-6 text-silver-300/60">
            <a href="#" className="hover:text-silver-400 transition-colors">Instagram</a>
            <a href="#" className="hover:text-silver-400 transition-colors">Twitter</a>
            <a href="#" className="hover:text-silver-400 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
