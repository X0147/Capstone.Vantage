import React from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Target, Award, Globe, ShieldCheck, ArrowRight, Compass } from 'lucide-react';
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
    bio: 'Former global aviation director with two decades driving aeronautical strategy for sovereign fleets. Alexander is the architect of the Vantage luxury philosophy, ensuring every altitude feels like a private sanctuary.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
    expertise: ['Global Strategy', 'Luxury Operations', 'Fleet Acquisition']
  },
  {
    name: 'Isabella Chen',
    role: 'Head of Digital Experience',
    bio: 'Pioneer of the biometric boarding matrix. Isabella ensures the digital touchpoints of Vantage — from cryptographic ledgers to real-time telemetry — match the physical, uncompromising luxury of flight.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    expertise: ['UX/UI', 'Biometric Security', 'Vector Algorithms']
  },
  {
    name: 'Marcus Thorne',
    role: 'VP of Fleet Telemetry',
    bio: 'Aerospace engineer specializing in real-time ADS-B integrations. Marcus commands the global radar network that powers Vantage, analyzing high-altitude meteorological data streams for flawless routing.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
    expertise: ['Telemetry', 'Aeronautics', 'Satellite Uplinks']
  },
  {
    name: 'Elena Rostova',
    role: 'Chief Concierge Officer',
    bio: 'Bringing 15 years of ultra-high-net-worth hospitality experience from Geneva and Dubai. Elena designed the Vantage Black-Card concierge protocol, where impossible requests are merely a starting point.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
    expertise: ['Hospitality', 'Client Relations', 'Bespoke Curation']
  }
];

const ADVISORS = [
  { name: 'Dr. James H. Lin', role: 'Aerospace Dynamics Advisor', org: 'Former Director, Advanced Aviation Institute' },
  { name: 'Sofia Al-Fayed', role: 'Luxury Hospitality Consultant', org: 'Founder, The Al-Fayed Collection' },
  { name: 'William Thorne Sr.', role: 'Cryptographic Security Lead', org: 'Pioneer of Secure Identity Frameworks' },
];

function InteractiveCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`group relative rounded-3xl border border-white/10 bg-black/40 overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(56, 189, 248, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

export const TeamPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 -mt-24 relative selection:bg-vantage-accent/30 selection:text-white">
      
      {/* Deep Space Background */}
      <div className="absolute inset-0 z-0 bg-vantage-midnight overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-sky-900/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-[40%] right-0 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[180px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-lg">
        
        {/* Cinematic Hero */}
        <section className="text-center pt-2xl pb-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-md"
          >
            <div className="inline-flex items-center gap-2xs px-sm py-2xs rounded-full bg-vantage-accent/10 border border-vantage-accent/20 text-[10px] font-mono tracking-widest text-vantage-accent uppercase mb-md">
              <ShieldCheck className="w-3.5 h-3.5" /> The Directorate
            </div>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.1]">
              Architects of <br />
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-blue-400 to-vantage-gold drop-shadow-lg">
                The Apex Experience
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-vantage-text text-lg md:text-xl font-light leading-relaxed tracking-wide">
              We are a syndicate of aerospace engineers, digital visionaries, and hospitality veterans. Together, we are redefining the absolute parameters of exclusive global transit.
            </p>
          </motion.div>
        </section>

        {/* The Manifesto */}
        <section className="mb-3xl relative">
          <div className="absolute -left-lg top-0 w-1 h-full bg-gradient-to-b from-sky-400 via-vantage-gold to-transparent opacity-50" />
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="pl-md md:pl-xl max-w-4xl"
          >
            <h2 className="text-[10px] font-mono text-vantage-accent uppercase tracking-widest mb-sm flex items-center gap-2">
              <Compass className="w-3 h-3" /> The Vantage Manifesto
            </h2>
            <p className="font-display text-2xl md:text-4xl text-white leading-snug italic font-medium">
              "Aviation should not be an exercise in endurance. It should be a sanctuary in motion. We reject the commoditization of the skies. We build for the discerning few who demand that the journey be as breathtaking as the destination."
            </p>
          </motion.div>
        </section>

        {/* Pillars Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-md mb-3xl">
          <InteractiveCard className="p-xl premium-glass">
            <Target className="w-8 h-8 text-sky-400 mb-md drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]" />
            <h3 className="text-xl font-bold text-white mb-xs tracking-wide">Uncompromising Precision</h3>
            <p className="text-sm text-vantage-muted leading-relaxed font-light">
              Every system operates with aerospace-grade reliability. From cryptographic booking ledgers to real-time ADS-B vector tracking, our infrastructure is infallible.
            </p>
          </InteractiveCard>
          
          <InteractiveCard className="p-xl premium-glass">
            <Award className="w-8 h-8 text-vantage-gold mb-md drop-shadow-[0_0_15px_rgba(207,181,114,0.5)]" />
            <h3 className="text-xl font-bold text-white mb-xs tracking-wide">Bespoke Excellence</h3>
            <p className="text-sm text-vantage-muted leading-relaxed font-light">
              We abhor mass transit. We architect experiences for the 1%, where champagne is chilled to exact degrees and privacy is treated as a fundamental right.
            </p>
          </InteractiveCard>

          <InteractiveCard className="p-xl premium-glass">
            <Globe className="w-8 h-8 text-blue-400 mb-md drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]" />
            <h3 className="text-xl font-bold text-white mb-xs tracking-wide">Global Dominion</h3>
            <p className="text-sm text-vantage-muted leading-relaxed font-light">
              Our network spans the planet seamlessly. Whether transitioning from JFK to DXB or arriving at a private Alpine strip, Vantage commands the airspace.
            </p>
          </InteractiveCard>
        </section>

        {/* The Executive Roster */}
        <section className="mb-3xl">
          <div className="flex items-center justify-between mb-xl">
            <h2 className="font-display text-4xl font-bold text-white tracking-tight">The Executive Board</h2>
            <div className="h-px bg-white/10 flex-1 ml-lg" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, duration: 0.6 }}
              >
                <InteractiveCard className="group h-full flex flex-col">
                  {/* Photo Section */}
                  <div className="aspect-[4/5] overflow-hidden relative">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover filter grayscale transition-all duration-700 scale-100 group-hover:scale-105 group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
                    
                    <div className="absolute bottom-0 left-0 w-full p-md translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-xl font-black text-white tracking-wide">{member.name}</h3>
                      <p className="text-[10px] text-vantage-gold uppercase tracking-widest font-mono mt-1">{member.role}</p>
                    </div>
                  </div>

                  {/* Bio & Details */}
                  <div className="p-md flex-1 flex flex-col bg-black/60 backdrop-blur-md">
                    <p className="text-xs text-vantage-muted leading-relaxed mb-md font-light flex-1">
                      {member.bio}
                    </p>

                    <div className="space-y-sm mt-auto">
                      <div className="flex flex-wrap gap-2xs">
                        {member.expertise.map(exp => (
                          <span key={exp} className="px-2xs py-1 rounded bg-sky-500/10 border border-sky-500/20 text-[9px] font-mono uppercase tracking-widest text-sky-300">
                            {exp}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-md pt-md border-t border-white/5">
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
                </InteractiveCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Global Advisory Board */}
        <section className="mb-4xl relative">
          <div className="absolute inset-0 bg-gradient-to-r from-sky-900/10 via-transparent to-vantage-gold/10 border border-white/5 rounded-3xl -z-10" />
          <div className="p-xl rounded-3xl premium-glass border border-white/5">
            <div className="flex flex-col md:flex-row items-center justify-between mb-xl">
              <div>
                <h2 className="font-display text-3xl font-bold text-white tracking-tight">Global Advisory Syndicate</h2>
                <p className="text-sm text-vantage-muted mt-2">External counsel ensuring our standard remains peerless.</p>
              </div>
              <ArrowRight className="w-6 h-6 text-vantage-muted hidden md:block" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-lg divide-y md:divide-y-0 md:divide-x divide-white/10">
              {ADVISORS.map((adv) => (
                <div key={adv.name} className="pt-md md:pt-0 md:px-lg first:pt-0 first:md:pl-0 last:md:pr-0">
                  <h4 className="text-lg font-bold text-white">{adv.name}</h4>
                  <p className="text-[10px] text-vantage-gold uppercase tracking-widest font-mono mt-1 mb-3">{adv.role}</p>
                  <p className="text-xs text-vantage-muted font-light">{adv.org}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
      
      <StructuredFooter />
    </div>
  );
};

export default TeamPage;
