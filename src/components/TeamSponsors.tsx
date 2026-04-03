import { motion } from 'motion/react';
import { Users, Award, Star, ShieldCheck } from 'lucide-react';

const teamMembers = [
  {
    name: "Aarav Sharma",
    role: "Lead Organizer",
    bio: "Visionary behind DASTAAN'26, Aarav ensures every detail aligns with the batch's legacy.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    name: "MALIHA MUSKAAN",
    role: "Creative Director",
    bio: "The artistic soul who brought the emerald and gold theme to life through design.",
    image: ""
  },
  {
    name: "ABDUL RAHEEM",
    role: "Tech Lead",
    bio: "Architect of the AR experience and the digital portal, bridging tech with tradition.",
    image: ""
  },
  {
    name: "Ananya Iyer",
    role: "Public Relations",
    bio: "The voice of DASTAAN'26, managing all communications and guest relations.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200"
  }
];

const sponsors = [
  {
    name: "Emerald Estates",
    tier: "Platinum Sponsor",
    desc: "Luxury real estate partners providing the grand venue for our gala.",
    logo: <ShieldCheck className="w-12 h-12 text-gold-500" />
  },
  {
    name: "Golden Crust",
    tier: "Catering Partner",
    desc: "Crafting the exquisite multi-cuisine menu for the evening.",
    logo: <Star className="w-12 h-12 text-gold-500" />
  },
  {
    name: "Luxe Events",
    tier: "Decor Partner",
    desc: "Bringing the emerald and gold vision to physical reality.",
    logo: <Award className="w-12 h-12 text-gold-500" />
  }
];

export default function TeamSponsors() {
  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Meet the Team */}
      <section className="mb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Users className="w-10 h-10 text-gold-500 mx-auto mb-4" />
          <h2 className="text-4xl md:text-6xl font-display gold-gradient mb-6">Meet the Visionaries</h2>
          <p className="text-gray-300 max-w-2xl mx-auto italic font-serif">
            The Batch of '24 members who worked tirelessly to make DASTAAN'26 a reality.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="emerald-glass p-6 rounded-3xl border border-gold-500/10 text-center group hover:border-gold-500/40 transition-all"
            >
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="absolute inset-0 bg-gold-500 rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity" />
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="relative w-full h-full object-cover rounded-full border-2 border-gold-500/30 grayscale hover:grayscale-0 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="relative w-full h-full flex items-center justify-center rounded-full border-2 border-gold-500/30 bg-emerald-900/50 text-gold-500">
                    <Users className="w-12 h-12" />
                  </div>
                )}
              </div>
              <h3 className="text-xl font-display text-gold-400 mb-1">{member.name}</h3>
              <p className="text-gold-300/60 text-xs uppercase tracking-widest mb-4">{member.role}</p>
              <p className="text-gray-400 text-sm leading-relaxed">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Our Sponsors */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Star className="w-10 h-10 text-gold-500 mx-auto mb-4" />
          <h2 className="text-4xl md:text-6xl font-display gold-gradient mb-6">Our Patrons</h2>
          <p className="text-gray-300 max-w-2xl mx-auto italic font-serif">
            We are honored to be supported by these prestigious organizations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sponsors.map((sponsor, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="emerald-glass p-8 rounded-3xl border border-gold-500/10 flex flex-col items-center text-center group hover:bg-emerald-900/40 transition-all"
            >
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-500">
                {sponsor.logo}
              </div>
              <h3 className="text-2xl font-display text-gold-400 mb-2">{sponsor.name}</h3>
              <p className="text-gold-300/60 text-xs uppercase tracking-widest mb-4 font-bold">{sponsor.tier}</p>
              <p className="text-gray-400 text-sm leading-relaxed">{sponsor.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
