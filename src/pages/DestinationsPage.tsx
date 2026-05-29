import React from 'react';
import { motion } from 'framer-motion';
import { Globe, MapPin, ArrowRight } from 'lucide-react';
import StructuredFooter from '../components/StructuredFooter';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const DESTINATIONS = [
  {
    region: 'Americas',
    cities: [
      { name: 'New York (JFK)', type: 'Primary Hub' },
      { name: 'Los Angeles (LAX)', type: 'Primary Hub' },
      { name: 'Miami (MIA)', type: 'Focus City' },
      { name: 'São Paulo (GRU)', type: 'Focus City' },
    ]
  },
  {
    region: 'Europe',
    cities: [
      { name: 'London (LHR)', type: 'Primary Hub' },
      { name: 'Paris (CDG)', type: 'Primary Hub' },
      { name: 'Geneva (GVA)', type: 'Focus City' },
      { name: 'Milan (MXP)', type: 'Focus City' },
    ]
  },
  {
    region: 'Middle East & Asia',
    cities: [
      { name: 'Dubai (DXB)', type: 'Primary Hub' },
      { name: 'Singapore (SIN)', type: 'Primary Hub' },
      { name: 'Tokyo (HND)', type: 'Primary Hub' },
      { name: 'Hong Kong (HKG)', type: 'Focus City' },
    ]
  }
];

export const DestinationsPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 -mt-24 relative selection:bg-vantage-accent/30 selection:text-white">
      <SEO 
        title="Global Destinations" 
        description="Explore the expansive network of Capstone.Vantage secure travel routes spanning 195 countries." 
      />
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 bg-vantage-midnight overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-sky-900/10 rounded-full blur-[150px] pointer-events-none" />
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
              <Globe className="w-3.5 h-3.5 text-sky-400" /> Global Directory
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-white mb-sm">
              The <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">Vantage Network</span>
            </h1>
            <p className="max-w-2xl mx-auto text-vantage-muted text-lg font-light leading-relaxed">
              We operate exclusively out of the world's most critical financial, cultural, and political capitals. Our network is deliberately curated; we fly only where power and prestige demand our presence.
            </p>
          </motion.div>
        </section>

        {/* Directory Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-xl">
          {DESTINATIONS.map((region, idx) => (
            <motion.div
              key={region.region}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * idx, duration: 0.6 }}
              className="space-y-md"
            >
              <h2 className="text-2xl font-display font-bold text-white border-b border-white/10 pb-sm">
                {region.region}
              </h2>
              
              <ul className="space-y-sm">
                {region.cities.map(city => (
                  <li key={city.name} className="flex items-center justify-between p-sm rounded-xl bg-black/40 border border-white/5 premium-glass group hover:border-white/20 transition-colors">
                    <div className="flex items-center gap-sm">
                      <MapPin className="w-4 h-4 text-sky-400 opacity-50 group-hover:opacity-100 transition-opacity" />
                      <div>
                        <p className="text-sm font-bold text-white">{city.name}</p>
                        <p className="text-[9px] font-mono uppercase tracking-widest text-vantage-muted">{city.type}</p>
                      </div>
                    </div>
                    <Link to="/" className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-sky-500/20 hover:text-sky-400">
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </section>

      </div>
      
      <StructuredFooter />
    </div>
  );
};

export default DestinationsPage;
