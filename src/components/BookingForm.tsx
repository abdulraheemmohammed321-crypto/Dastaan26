import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Mail, Armchair, CheckCircle2 } from 'lucide-react';
import Ticket from './Ticket';
import confetti from 'canvas-confetti';

export default function BookingForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    seat: '',
    category: 'Junior' as 'Junior' | 'Senior'
  });

  // All seats are available
  const occupiedSeats = useMemo(() => new Set<string>(), []);

  const juniorSeats = Array.from({ length: 150 }, (_, i) => `J-${i + 1}`);
  const seniorSeats = Array.from({ length: 150 }, (_, i) => `S-${i + 1}`);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    
    setStep(2);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#A8A9AD', '#001226', '#ffffff']
    });
  };

  const currentSeats = formData.category === 'Junior' ? juniorSeats : seniorSeats;

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="navy-glass p-6 md:p-12 rounded-3xl border border-silver-500/20 shadow-2xl"
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-5xl font-display silver-gradient mb-4">Reserve Your Seat</h2>
              <p className="text-silver-300/60 uppercase tracking-widest text-sm">Join the legacy of DASTAAN'26</p>
            </div>

            <form onSubmit={handleBooking} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-silver-400 text-xs uppercase tracking-widest font-bold flex items-center gap-2">
                    <User className="w-3 h-3" /> Full Name
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-navy-950/50 border border-silver-500/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-silver-500 transition-colors"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-silver-400 text-xs uppercase tracking-widest font-bold flex items-center gap-2">
                    <Mail className="w-3 h-3" /> Email Address
                  </label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-navy-950/50 border border-silver-500/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-silver-500 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-silver-400 text-xs uppercase tracking-widest font-bold flex items-center gap-2">
                  Category
                </label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, category: 'Junior', seat: '' })}
                    className={`flex-1 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all ${
                      formData.category === 'Junior'
                        ? 'bg-silver-500 text-navy-950'
                        : 'bg-navy-950/50 text-silver-300/50 border border-silver-500/20'
                    }`}
                  >
                    Junior
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, category: 'Senior', seat: '' })}
                    className={`flex-1 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all ${
                      formData.category === 'Senior'
                        ? 'bg-silver-500 text-navy-950'
                        : 'bg-navy-950/50 text-silver-300/50 border border-silver-500/20'
                    }`}
                  >
                    Senior
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <label className="text-silver-400 text-xs uppercase tracking-widest font-bold flex items-center gap-2">
                    <Armchair className="w-3 h-3" /> Select Your Seat (Roll Number)
                  </label>
                  <div className="flex gap-4 text-[10px] uppercase tracking-widest font-bold">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 bg-navy-950/50 border border-silver-500/20 rounded-sm" />
                      <span className="text-silver-300/40">Available</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 bg-gray-800/50 border border-gray-700 rounded-sm opacity-50" />
                      <span className="text-silver-300/40">Occupied</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 bg-silver-500 rounded-sm" />
                      <span className="text-silver-500">Selected</span>
                    </div>
                  </div>
                </div>

                <div className="relative navy-glass p-6 rounded-2xl border border-silver-500/10 bg-navy-950/30">
                  {/* Stage/Front Indicator */}
                  <div className="w-full h-8 bg-silver-500/10 border-t-2 border-silver-500/30 rounded-t-full mb-12 flex items-center justify-center">
                    <span className="text-[10px] text-silver-500/50 uppercase tracking-[0.5em] font-bold">Stage / Front</span>
                  </div>

                  <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-3 max-h-80 overflow-y-auto p-2 pr-4 custom-scrollbar">
                    {currentSeats.map((seat) => {
                      const isOccupied = occupiedSeats.has(seat);
                      const isSelected = formData.seat === seat;

                      return (
                        <button
                          key={seat}
                          type="button"
                          disabled={isOccupied}
                          onClick={() => setFormData({ ...formData, seat })}
                          className={`group relative aspect-square rounded-lg flex items-center justify-center transition-all duration-300 ${
                            isSelected
                              ? 'bg-silver-500 text-navy-950 scale-110 shadow-lg shadow-silver-500/40 z-10'
                              : isOccupied
                              ? 'bg-gray-800/30 text-gray-600 border border-gray-800 cursor-not-allowed opacity-40'
                              : 'bg-navy-950/40 text-silver-300/40 border border-silver-500/10 hover:border-silver-500/50 hover:bg-navy-900/60'
                          }`}
                        >
                          <span className={`text-[10px] font-bold ${isSelected ? 'text-navy-950' : ''}`}>
                            {seat.split('-')[1]}
                          </span>
                          {!isOccupied && !isSelected && (
                            <div className="absolute inset-0 bg-silver-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={!formData.name || !formData.email || !formData.seat}
                className="w-full py-4 bg-silver-500 text-navy-950 font-bold rounded-full hover:bg-silver-400 transition-all shadow-lg shadow-silver-500/20 uppercase tracking-[0.2em] text-sm disabled:opacity-50 disabled:cursor-not-allowed shine-button"
              >
                Confirm Reservation
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="mb-8 flex flex-col items-center">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.2 }}
                className="w-20 h-20 bg-navy-800 rounded-full flex items-center justify-center mb-6 border-2 border-silver-500"
              >
                <CheckCircle2 className="w-10 h-10 text-silver-500" />
              </motion.div>
              <h2 className="text-4xl font-display silver-gradient mb-2">Reservation Confirmed!</h2>
              <p className="text-silver-300/60 uppercase tracking-widest text-sm">Your seat is waiting for you</p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
            >
              <Ticket 
                userName={formData.name} 
                seatNumber={formData.seat} 
                ticketId={Math.random().toString(36).substr(2, 9).toUpperCase()} 
              />
            </motion.div>
            
            <button
              onClick={() => setStep(1)}
              className="mt-12 text-silver-400 hover:text-silver-300 underline underline-offset-8 uppercase tracking-widest text-xs font-bold"
            >
              Book another seat
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
