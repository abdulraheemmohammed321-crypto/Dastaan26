import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Mail, Armchair, CheckCircle2, Trophy, Star, Zap, Share2 } from 'lucide-react';
import Ticket from './Ticket';
import confetti from 'canvas-confetti';

export default function BookingForm() {
  const [step, setStep] = useState(1);
  const [points, setPoints] = useState(0);
  const [badges, setBadges] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    seat: '',
    category: 'Junior' as 'Junior' | 'Senior',
    referralCode: ''
  });

  // Load points from local storage on mount
  useEffect(() => {
    const savedPoints = localStorage.getItem('dastaan_points');
    const savedBadges = localStorage.getItem('dastaan_badges');
    if (savedPoints) setPoints(parseInt(savedPoints));
    if (savedBadges) setBadges(JSON.parse(savedBadges));
  }, []);

  const juniorSeats = Array.from({ length: 150 }, (_, i) => `J-${i + 1}`);
  const seniorSeats = Array.from({ length: 150 }, (_, i) => `S-${i + 1}`);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Gamification Logic
    let earnedPoints = 100; // Base points for booking
    const newBadges = [...badges];

    // Early Bird Bonus (Simulated: if booking within first few days)
    const isEarlyBird = true; // For demo purposes
    if (isEarlyBird) {
      earnedPoints += 50;
      if (!newBadges.includes('Early Bird')) newBadges.push('Early Bird');
    }

    // Referral Bonus
    if (formData.referralCode) {
      earnedPoints += 30;
      if (!newBadges.includes('Networker')) newBadges.push('Networker');
    }

    const totalPoints = points + earnedPoints;
    setPoints(totalPoints);
    setBadges(newBadges);
    
    // Save to local storage
    localStorage.setItem('dastaan_points', totalPoints.toString());
    localStorage.setItem('dastaan_badges', JSON.stringify(newBadges));

    setStep(2);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#d4af37', '#065f46', '#ffffff']
    });
  };

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Points Display */}
      <div className="flex justify-between items-center mb-8 emerald-glass p-4 rounded-2xl border border-gold-500/20">
        <div className="flex items-center space-x-3">
          <div className="bg-gold-500/20 p-2 rounded-lg">
            <Trophy className="w-5 h-5 text-gold-500" />
          </div>
          <div>
            <p className="text-[10px] text-gold-300/60 uppercase tracking-widest font-bold">Your Points</p>
            <p className="text-xl font-display text-gold-400">{points}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          {badges.map((badge) => (
            <div key={badge} className="bg-emerald-900 border border-gold-500/30 px-3 py-1 rounded-full flex items-center space-x-1">
              <Star className="w-3 h-3 text-gold-500" />
              <span className="text-[10px] text-gold-300 uppercase tracking-tighter font-bold">{badge}</span>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="emerald-glass p-8 md:p-12 rounded-3xl border border-gold-500/20 shadow-2xl"
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-5xl font-display gold-gradient mb-4">Reserve Your Seat</h2>
              <p className="text-gold-300/60 uppercase tracking-widest text-sm">Join the legacy of DASTAAN'26</p>
            </div>

            <form onSubmit={handleBooking} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-gold-400 text-xs uppercase tracking-widest font-bold flex items-center gap-2">
                    <User className="w-3 h-3" /> Full Name
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-emerald-950/50 border border-gold-500/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-gold-400 text-xs uppercase tracking-widest font-bold flex items-center gap-2">
                    <Mail className="w-3 h-3" /> Email Address
                  </label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-emerald-950/50 border border-gold-500/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-gold-400 text-xs uppercase tracking-widest font-bold flex items-center gap-2">
                    <Zap className="w-3 h-3" /> Referral Code (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.referralCode}
                    onChange={(e) => setFormData({ ...formData, referralCode: e.target.value })}
                    className="w-full bg-emerald-950/50 border border-gold-500/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors"
                    placeholder="Earn +30 points"
                  />
                </div>
                <div className="flex items-end pb-2">
                  <div className="bg-gold-500/10 border border-gold-500/20 p-3 rounded-xl flex items-center space-x-3 w-full">
                    <Star className="w-5 h-5 text-gold-500" />
                    <p className="text-[10px] text-gold-300/80 leading-tight">
                      <span className="font-bold text-gold-400">Early Bird Bonus:</span> Book now to earn extra 50 points and the exclusive badge!
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-gold-400 text-xs uppercase tracking-widest font-bold flex items-center gap-2">
                  Category
                </label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, category: 'Junior', seat: '' })}
                    className={`flex-1 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all ${
                      formData.category === 'Junior'
                        ? 'bg-gold-500 text-emerald-950'
                        : 'bg-emerald-950/50 text-gold-300/50 border border-gold-500/20'
                    }`}
                  >
                    Junior
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, category: 'Senior', seat: '' })}
                    className={`flex-1 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all ${
                      formData.category === 'Senior'
                        ? 'bg-gold-500 text-emerald-950'
                        : 'bg-emerald-950/50 text-gold-300/50 border border-gold-500/20'
                    }`}
                  >
                    Senior
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-gold-400 text-xs uppercase tracking-widest font-bold flex items-center gap-2">
                  <Armchair className="w-3 h-3" /> Select Your Seat (Roll Number)
                </label>
                <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2 max-h-60 overflow-y-auto p-2 border border-gold-500/10 rounded-xl bg-emerald-950/30">
                  {(formData.category === 'Junior' ? juniorSeats : seniorSeats).map((seat) => (
                    <button
                      key={seat}
                      type="button"
                      onClick={() => setFormData({ ...formData, seat })}
                      className={`py-2 rounded-lg text-[10px] font-bold transition-all ${
                        formData.seat === seat
                          ? 'bg-gold-500 text-emerald-950 scale-110 shadow-lg shadow-gold-500/40'
                          : 'bg-emerald-950/50 text-gold-300/50 border border-gold-500/10 hover:border-gold-500/50'
                      }`}
                    >
                      {seat.split('-')[1]}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={!formData.name || !formData.email || !formData.seat}
                className="w-full py-4 bg-gold-500 text-emerald-950 font-bold rounded-full hover:bg-gold-400 transition-all shadow-lg shadow-gold-500/20 uppercase tracking-[0.2em] text-sm disabled:opacity-50 disabled:cursor-not-allowed"
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
              <div className="w-20 h-20 bg-emerald-800 rounded-full flex items-center justify-center mb-6 border-2 border-gold-500">
                <CheckCircle2 className="w-10 h-10 text-gold-500" />
              </div>
              <h2 className="text-4xl font-display gold-gradient mb-2">Reservation Confirmed!</h2>
              <p className="text-gold-300/60 uppercase tracking-widest text-sm">Your seat is waiting for you</p>
            </div>

            <div className="mb-8 bg-gold-500/10 border border-gold-500/30 p-4 rounded-2xl max-w-md mx-auto">
              <p className="text-gold-400 font-bold uppercase tracking-widest text-xs mb-2">Rewards Earned</p>
              <div className="flex justify-center space-x-4">
                <div className="text-center">
                  <p className="text-2xl font-display text-white">+150</p>
                  <p className="text-[8px] text-gold-300/60 uppercase">Points</p>
                </div>
                <div className="w-px h-8 bg-gold-500/20" />
                <div className="text-center">
                  <p className="text-2xl font-display text-white">1</p>
                  <p className="text-[8px] text-gold-300/60 uppercase">Badge</p>
                </div>
              </div>
            </div>

            <Ticket 
              userName={formData.name} 
              seatNumber={formData.seat} 
              ticketId={Math.random().toString(36).substr(2, 9).toUpperCase()} 
            />
            
            <button
              onClick={() => setStep(1)}
              className="mt-12 text-gold-400 hover:text-gold-300 underline underline-offset-8 uppercase tracking-widest text-xs font-bold"
            >
              Book another seat
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
