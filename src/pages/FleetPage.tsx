import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Wind, Shield, Zap, ArrowRight, Compass } from 'lucide-react';
import SEO from '../components/SEO';
import StructuredFooter from '../components/StructuredFooter';
import { Link } from 'react-router-dom';

const FLEET = [
  {
    model: 'Vantage A350-1000',
    type: 'Ultra-Long Range',
    image: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=1200&q=80',
    description: 'The pinnacle of transcontinental supremacy. Featuring Obsidian Class suites and adaptive cabin pressurization to eliminate altitude fatigue entirely.',
    specs: {
      range: '16,100 km',
      speed: 'Mach 0.89',
      capacity: '246 Elite Guests',
      thrust: '97,000 lbs',
    }
  },
  {
    model: 'Vantage 777-9X',
    type: 'Heavy Intercontinental',
    image: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1200&q=80',
    description: 'A masterpiece of aerodynamic engineering. The 777-9X commands the highest volume per passenger in commercial aviation history, outfitted with our signature Champagne Gold finishes.',
    specs: {
      range: '13,500 km',
      speed: 'Mach 0.90',
      capacity: '290 Elite Guests',
      thrust: '105,000 lbs',
    }
  },
  {
    model: 'Vantage Global 8000',
    type: 'Private Charter Hub',
    image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=1200&q=80',
    description: 'Reserved exclusively for Black Syndicate members. Point-to-point absolute discretion, capable of landing on private alpine strips or sovereign desert hubs.',
    specs: {
      range: '14,800 km',
      speed: 'Mach 0.94',
      capacity: '14 Syndicate Members',
      thrust: '18,920 lbs',
    }
  }
];

export const FleetPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 -mt-24 relative selection:bg-vantage-gold/30 selection:text-white">
      <SEO 
        title="Fleet Showcase" 
        description="Discover the Capstone.Vantage aerospace fleet, featuring cutting-edge engineering and ultimate in-flight luxury." 
      />
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 bg-vantage-midnight overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-sky-900/10 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-lg pt-xl pb-3xl space-y-3xl">
        
        {/* Header */}
        <section className="text-center space-y-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2xs px-sm py-2xs rounded-full bg-white/5 border border-white/10 text-[10px] font-mono tracking-widest text-vantage-muted uppercase mb-md">
              <Plane className="w-3.5 h-3.5 text-sky-400" /> Aerospatial Engineering
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-white mb-sm">
              The Sovereign <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-vantage-gold">Fleet</span>
            </h1>
            <p className="max-w-2xl mx-auto text-vantage-muted text-lg font-light leading-relaxed">
              We do not lease. We command. Our fleet represents the absolute apex of modern aerodynamics, designed explicitly to eliminate the friction of global transit.
            </p>
          </motion.div>
        </section>

        {/* Fleet Showcase */}
        <section className="space-y-4xl">
          {FLEET.map((aircraft, idx) => (
            <motion.div
              key={aircraft.model}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className={`flex flex-col lg:flex-row gap-xl items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* Image side */}
              <div className="w-full lg:w-1/2 relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/20 to-vantage-gold/20 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-700" />
                <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] premium-glass border border-white/10">
                  <img
                    src={aircraft.image}
                    alt={aircraft.model}
                    className="w-full h-full object-cover filter grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-md left-md">
                    <span className="px-xs py-1 rounded bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-mono uppercase tracking-widest text-sky-300">
                      {aircraft.type}
                    </span>
                  </div>
                </div>
              </div>

              {/* Data side */}
              <div className="w-full lg:w-1/2 space-y-lg">
                <div>
                  <h2 className="font-display text-4xl font-black text-white tracking-tight mb-xs">
                    {aircraft.model}
                  </h2>
                  <p className="text-vantage-muted text-sm leading-relaxed font-light">
                    {aircraft.description}
                  </p>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-sm">
                  <div className="p-sm rounded-2xl bg-black/40 border border-white/5 premium-glass">
                    <Compass className="w-4 h-4 text-sky-400 mb-2" />
                    <p className="text-[10px] font-mono text-vantage-muted uppercase tracking-widest">Max Range</p>
                    <p className="text-lg font-bold text-white">{aircraft.specs.range}</p>
                  </div>
                  <div className="p-sm rounded-2xl bg-black/40 border border-white/5 premium-glass">
                    <Zap className="w-4 h-4 text-vantage-gold mb-2" />
                    <p className="text-[10px] font-mono text-vantage-muted uppercase tracking-widest">Cruising Speed</p>
                    <p className="text-lg font-bold text-white">{aircraft.specs.speed}</p>
                  </div>
                  <div className="p-sm rounded-2xl bg-black/40 border border-white/5 premium-glass">
                    <Shield className="w-4 h-4 text-emerald-400 mb-2" />
                    <p className="text-[10px] font-mono text-vantage-muted uppercase tracking-widest">Payload</p>
                    <p className="text-lg font-bold text-white">{aircraft.specs.capacity}</p>
                  </div>
                  <div className="p-sm rounded-2xl bg-black/40 border border-white/5 premium-glass">
                    <Wind className="w-4 h-4 text-blue-400 mb-2" />
                    <p className="text-[10px] font-mono text-vantage-muted uppercase tracking-widest">Engine Thrust</p>
                    <p className="text-lg font-bold text-white">{aircraft.specs.thrust}</p>
                  </div>
                </div>

                <Link 
                  to="/"
                  className="inline-flex items-center gap-2xs px-md py-sm rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors"
                >
                  Book this Vessel <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </section>

      </div>
      
      <StructuredFooter />
    </div>
  );
};

export default FleetPage;
