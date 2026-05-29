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
                        <svg className="w-4 h-4 text-vantage-muted hover:text-white cursor-pointer transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" />
                        </svg>
                        <svg className="w-4 h-4 text-vantage-muted hover:text-white cursor-pointer transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                        </svg>
                        <svg className="w-4 h-4 text-vantage-muted hover:text-white cursor-pointer transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" />
                        </svg>
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
