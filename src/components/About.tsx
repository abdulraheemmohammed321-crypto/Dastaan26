import { motion } from 'motion/react';
import { ShieldCheck, Calendar, MapPin, Music, Coffee, Camera } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Grand Morning",
      desc: "A meticulously planned gala starting at 9:00 AM with a red carpet entry."
    },
    {
      icon: <Music className="w-6 h-6" />,
      title: "Live Performances",
      desc: "Experience soul-stirring music and high-energy dance acts by the Batch of '24."
    },
    {
      icon: <Coffee className="w-6 h-6" />,
      title: "Exquisite Dining",
      desc: "A multi-cuisine buffet featuring signature silver-themed desserts."
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Exclusive Entry",
      desc: "Secure entry via digital QR tickets with personalized AR welcomes."
    }
  ];

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <h2 className="text-silver-400 font-serif italic text-xl mb-4">Our Story</h2>
        <h3 className="text-4xl md:text-6xl font-display silver-gradient mb-8">The Legacy of DASTAAN</h3>
        <p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
          DASTAAN'26 is more than just a freshers party; it's a bridge between generations. 
          Hosted by the Batch of '24, this morning is dedicated to welcoming our juniors 
          into a tradition of excellence, camaraderie, and timeless elegance.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="navy-glass p-8 rounded-2xl border border-silver-500/10 hover:border-silver-500/30 transition-all group"
          >
            <div className="w-12 h-12 bg-silver-500/10 rounded-xl flex items-center justify-center text-silver-500 mb-6 group-hover:scale-110 transition-transform">
              {f.icon}
            </div>
            <h4 className="text-xl font-display text-silver-300 mb-3">{f.title}</h4>
            <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-display text-silver-400 mb-6">The Batch of '24</h3>
          <p className="text-gray-300 mb-6 leading-relaxed">
            We are a group of visionaries who believe that every beginning should be legendary. 
            Our batch has spent months crafting this experience, from the navy-silver decor 
            to the high-tech AR integration, ensuring that your first major event is nothing 
            short of magical.
          </p>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-silver-300/80">
              <MapPin className="w-5 h-5" />
              <span>Ayaan Institute of Medical Sciences</span>
            </div>
            <div className="flex items-center space-x-3 text-silver-300/80">
              <Camera className="w-5 h-5" />
              <span>Professional Photo Booths Available</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="aspect-video rounded-3xl overflow-hidden silver-border">
            <img 
              src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1000" 
              alt="Event Venue" 
              className="w-full h-full object-cover opacity-60 hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-silver-500/20 backdrop-blur-xl rounded-2xl border border-silver-500/30 flex items-center justify-center p-4 text-center">
            <p className="text-silver-400 font-display text-xs font-bold leading-tight">ESTABLISHED TRADITION</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
