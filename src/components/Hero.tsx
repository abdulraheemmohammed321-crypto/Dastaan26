import { motion } from 'motion/react';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,8,20,0.7),transparent_70%)]" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-silver-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-navy-900/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-silver-400 font-serif italic text-xl md:text-2xl mb-4 tracking-widest">
            A Batch of '24 Presentation
          </h2>
          <h1 className="text-6xl md:text-9xl font-display font-bold mb-6 silver-gradient leading-tight">
            DASTAAN'26
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Step into a world of elegance and legacy. Join us for an unforgettable morning 
            where stories begin and memories are etched in silver.
          </p>

          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="flex items-center space-x-2 text-silver-300/80">
              <Calendar className="w-5 h-5" />
              <span className="tracking-wider uppercase text-sm">April 7, 2026</span>
            </div>
            <div className="flex items-center space-x-2 text-silver-300/80">
              <MapPin className="w-5 h-5" />
              <span className="tracking-wider uppercase text-sm">Ayaan Institute of Medical Sciences</span>
            </div>
            <div className="flex items-center space-x-2 text-silver-300/80">
              <Users className="w-5 h-5" />
              <span className="tracking-wider uppercase text-sm">Freshers Batch '26</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              to="/reserve"
              className="px-8 py-4 bg-silver-500 hover:bg-silver-400 text-navy-950 font-bold rounded-full transition-all transform hover:scale-105 shadow-lg shadow-silver-500/20 uppercase tracking-widest text-sm shine-button"
            >
              Reserve Your Seat
            </Link>
            <Link
              to="/about"
              className="px-8 py-4 border border-silver-500/50 hover:border-silver-500 text-silver-400 font-bold rounded-full transition-all hover:bg-silver-500/5 uppercase tracking-widest text-sm"
            >
              Learn More
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Decorative Corner Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 border-t-2 border-l-2 border-silver-500/30 rounded-tl-3xl hidden lg:block" />
      <div className="absolute bottom-10 right-10 w-32 h-32 border-b-2 border-r-2 border-silver-500/30 rounded-br-3xl hidden lg:block" />
    </div>
  );
}
