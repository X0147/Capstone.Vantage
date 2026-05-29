import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Target, Award, Globe, ShieldCheck } from 'lucide-react';
import StructuredFooter from '../components/StructuredFooter';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  expertise: string[];
}

const TEAM: TeamMember[] = [
  {
    name: 'Alexander Sterling',
    role: 'Chief Executive Officer',
    bio: 'Former aviation director with 20+ years driving global aeronautical strategy. Architect of the Vantage luxury experience.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    expertise: ['Global Strategy', 'Luxury Operations']
  },
  {
    name: 'Isabella Chen',
    role: 'Head of Digital Experience',
    bio: 'Pioneered the biometric boarding matrix. Isabella ensures the digital touchpoints match the physical luxury of flight.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    expertise: ['UX/UI', 'Biometrics']
  },
  {
    name: 'Marcus Thorne',
    role: 'VP of Fleet Telemetry',
    bio: 'Aerospace engineer specializing in real-time ADS-B integrations and high-altitude meteorological data streams.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    expertise: ['Telemetry', 'Aeronautics']
  },
  {
    name: 'Elena Rostova',
    role: 'Chief Concierge Officer',
    bio: 'Brings 15 years of ultra-high-net-worth hospitality. She designed the Vantage black-card concierge service protocol.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    expertise: ['Hospitality', 'Client Relations']
  }
];

export const TeamPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 -mt-24 relative">
      
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 bg-vantage-midnight overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-sky-900/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-lg">
        
        {/* Hero Section */}
        <section className="text-center pt-xl pb-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-sm"
          >
            <div className="inline-flex items-center gap-2xs px-sm py-2xs rounded-full bg-white/5 border border-white/10 text-[10px] font-mono tracking-widest text-vantage-muted uppercase mb-md">
              <ShieldCheck className="w-3.5 h-3.5 text-vantage-gold" /> Leadership
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-white mb-sm">
              The Minds Behind <br />
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-vantage-gold">Vantage</span>
            </h1>
            <p className="max-w-2xl mx-auto text-vantage-muted text-lg font-light leading-relaxed">
              We are a collective of aerospace engineers, digital architects, and hospitality veterans committed to redefining the parameters of exclusive global travel.
            </p>
          </motion.div>
        </section>

        {/* Mission Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-md mb-3xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="premium-glass p-lg rounded-3xl border border-white/5 bg-black/20"
          >
            <Target className="w-8 h-8 text-sky-400 mb-md" />
            <h3 className="text-xl font-bold text-white mb-xs">Uncompromising Precision</h3>
            <p className="text-sm text-vantage-muted leading-relaxed">
              Every system we build operates with aerospace-grade reliability. From cryptographic booking ledgers to real-time vector tracking.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="premium-glass p-lg rounded-3xl border border-white/5 bg-black/20"
          >
            <Award className="w-8 h-8 text-vantage-gold mb-md" />
            <h3 className="text-xl font-bold text-white mb-xs">Bespoke Excellence</h3>
            <p className="text-sm text-vantage-muted leading-relaxed">
              We don't do mass transit. We architect experiences for the 1%, where every detail is curated and nothing is left to chance.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="premium-glass p-lg rounded-3xl border border-white/5 bg-black/20"
          >
            <Globe className="w-8 h-8 text-blue-400 mb-md" />
            <h3 className="text-xl font-bold text-white mb-xs">Global Reach</h3>
            <p className="text-sm text-vantage-muted leading-relaxed">
              Our network spans the planet. Whether you're flying from JFK to DXB or a remote private strip in the Alps, Vantage connects you.
            </p>
          </motion.div>
        </section>

        {/* Team Roster */}
        <section className="mb-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-sky-400/20 to-vantage-gold/20 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative h-full premium-glass rounded-[2rem] p-xs border border-white/10 bg-black/40 overflow-hidden flex flex-col">
                  {/* Photo */}
                  <div className="aspect-[4/5] rounded-3xl overflow-hidden relative mb-sm">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                    
                    {/* Floating Name/Role */}
                    <div className="absolute bottom-0 left-0 w-full p-md translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-lg font-bold text-white">{member.name}</h3>
                      <p className="text-xs text-vantage-gold uppercase tracking-wider font-mono mt-1">{member.role}</p>
                    </div>
                  </div>

                  {/* Bio & Details */}
                  <div className="px-sm pb-md flex-1 flex flex-col">
                    <p className="text-xs text-vantage-muted leading-relaxed mb-md flex-1">
                      {member.bio}
                    </p>

                    <div className="space-y-sm">
                      <div className="flex flex-wrap gap-xs">
                        {member.expertise.map(exp => (
                          <span key={exp} className="px-2xs py-1 rounded bg-white/5 border border-white/5 text-[9px] font-mono uppercase tracking-widest text-sky-200">
                            {exp}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-sm pt-sm border-t border-white/5">
                        <Linkedin className="w-4 h-4 text-vantage-muted hover:text-white cursor-pointer transition-colors" />
                        <Twitter className="w-4 h-4 text-vantage-muted hover:text-white cursor-pointer transition-colors" />
                        <Github className="w-4 h-4 text-vantage-muted hover:text-white cursor-pointer transition-colors" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
      
      <StructuredFooter />
    </div>
  );
};

export default TeamPage;
