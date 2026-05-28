import React from 'react';
import SearchHero from '../components/search/SearchHero';
import { useSearchStore } from '../store/useSearchStore';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Plane, 
  Award, 
  ShieldCheck, 
  MapPin, 
  ChevronRight, 
  Compass, 
  Globe, 
  Lock,
  ArrowRight,
  Sparkles,
  Server
} from 'lucide-react';

const PROMO_DESTINATIONS = [
  { 
    city: 'London', 
    iata: 'LHR', 
    price: 349, 
    duration: '7h 15m', 
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80',
    tag: 'Popular'
  },
  { 
    city: 'Tokyo', 
    iata: 'HND', 
    price: 689, 
    duration: '12h 45m', 
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80',
    tag: 'Trending'
  },
  { 
    city: 'Paris', 
    iata: 'CDG', 
    price: 399, 
    duration: '6h 30m', 
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80',
    tag: 'Romantic'
  },
  { 
    city: 'Singapore', 
    iata: 'SIN', 
    price: 719, 
    duration: '14h 10m', 
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=600&q=80',
    tag: 'Futuristic'
  },
  { 
    city: 'Cape Town', 
    iata: 'CPT', 
    price: 829, 
    duration: '15h 20m', 
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=600&q=80',
    tag: 'Scenic'
  },
];

export default function SearchPage() {
  const navigate = useNavigate();
  const { setOrigin, setDestination } = useSearchStore();

  const handleSelectPromo = (iata: string) => {
    // Populate search inputs
    setOrigin('JFK'); // Default departure from New York to make search convenient
    setDestination(iata);
    
    // Smoothly scroll to the search hero widget
    const element = document.getElementById('search-funnel-container');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-xl px-sm py-md">
      
      {/* Visual Hero Header Experience */}
      <section className="relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-[#0f172a] via-black to-vantage-dark p-lg shadow-2xl">
        <div className="absolute right-0 top-0 h-full w-1/2 opacity-10 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-vantage-accent via-blue-600 to-transparent pointer-events-none" />
        
        <div className="max-w-3xl space-y-sm relative z-10">
          <span className="inline-flex items-center gap-3xs rounded-full border border-vantage-accent/20 bg-vantage-accent/10 px-xs py-3xs text-[10px] font-bold uppercase tracking-widest text-vantage-accent">
            <Sparkles className="h-3 w-3" /> Redefining Air Transportation
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-none">
            Find your next flight <br />
            <span className="bg-gradient-to-r from-vantage-accent to-blue-500 bg-clip-text text-transparent">in raw real-time</span>
          </h1>
          <p className="text-sm md:text-base text-vantage-muted max-w-xl">
            Monitor satellite-linked airspace vectors, lock down instant PNR bookings, and experience premium cabin seat structures in one unified system.
          </p>
        </div>
      </section>

      {/* Search Funnel Widget Section with Anchor ID */}
      <div id="search-funnel-container" className="scroll-mt-24">
        <SearchHero />
      </div>

      {/* Promotional & Featured Destinations Grid */}
      <section className="space-y-sm">
        <div className="flex justify-between items-baseline">
          <div className="space-y-3xs">
            <h2 className="text-xl font-black text-white tracking-tight">Popular Staralliance Routes</h2>
            <p className="text-xs text-vantage-muted">Quick-lock curated premium flight vectors starting from lowest monthly matrix rates.</p>
          </div>
          <span className="hidden sm:inline-flex items-center gap-3xs font-mono text-[10px] text-vantage-accent font-bold uppercase tracking-wider">
            Updated live <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-sm">
          {PROMO_DESTINATIONS.map((promo, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6, scale: 1.02 }}
              onClick={() => handleSelectPromo(promo.iata)}
              className="group relative h-72 rounded-2xl overflow-hidden border border-white/5 bg-black cursor-pointer shadow-lg transition-all"
            >
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent z-10 transition-opacity group-hover:opacity-90" />
              
              <img 
                src={promo.image} 
                alt={promo.city} 
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Tag indicator */}
              <span className="absolute top-xs left-xs z-20 rounded-md bg-white/10 backdrop-blur-md px-2xs py-3xs text-[8px] font-mono text-white font-bold uppercase border border-white/10">
                {promo.tag}
              </span>

              {/* Card Footer Details */}
              <div className="absolute bottom-0 left-0 w-full p-sm z-20 space-y-3xs">
                <span className="font-mono text-[9px] font-bold text-vantage-accent uppercase tracking-wide">
                  New York (JFK) to
                </span>
                <h3 className="text-md font-black text-white">{promo.city} ({promo.iata})</h3>
                
                <div className="flex justify-between items-center border-t border-white/10 pt-3xs mt-3xs text-[10px] font-mono">
                  <span className="text-vantage-muted">{promo.duration}</span>
                  <span className="text-emerald-400 font-bold">From ${promo.price}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Vantage loyalty program promotion banner */}
      <section className="relative overflow-hidden rounded-[2rem] border border-vantage-accent/20 bg-gradient-to-br from-vantage-dark/80 via-black to-[#1e293b] p-md space-y-sm shadow-xl">
        <div className="absolute right-0 top-0 h-full w-1/3 opacity-20 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-amber-400 via-orange-500 to-transparent pointer-events-none" />
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md">
          <div className="space-y-2xs max-w-xl">
            <span className="inline-flex items-center gap-3xs rounded-full border border-amber-400/20 bg-amber-400/10 px-xs py-3xs text-[9px] font-bold uppercase tracking-widest text-amber-300">
              <Award className="h-3 w-3" /> Vantage Privilege Club Membership
            </span>
            <h3 className="text-xl md:text-2xl font-black tracking-tight text-white">
              Unlock Elite Status & Accelerate Your Mileage Balance
            </h3>
            <p className="text-xs text-vantage-muted">
              Join millions of global travelers earning 2x reward miles on all trans-atlantic flight vectors. Enjoy premium complimentary VIP lounge entry and priority fast-track security clearances.
            </p>
          </div>

          <button 
            onClick={() => navigate('/dashboard')}
            className="px-md py-sm bg-gradient-to-r from-amber-400 to-amber-500 text-vantage-dark rounded-xl text-xs font-bold hover:opacity-90 transition-all flex items-center gap-2xs whitespace-nowrap self-start md:self-auto"
          >
            Access Elite Dashboard <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* Core Platform Capabilities highlight panels */}
      <section className="space-y-sm">
        <h3 className="text-xs font-bold uppercase tracking-wider text-vantage-accent">Vantage Cryptographic Features</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-sm">
          
          <div className="premium-glass rounded-3xl border border-white/5 p-md flex flex-col justify-between h-56 hover:border-white/10 transition-all">
            <div className="space-y-xs">
              <Compass className="h-8 w-8 text-vantage-accent animate-spin-slow" />
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">ADS-B Airspace Radar</h4>
              <p className="text-xs text-vantage-muted">Intercept global carrier transponder paths across active international vectors in absolute real-time.</p>
            </div>
            <button onClick={() => navigate('/tracker')} className="text-xs font-bold text-vantage-accent hover:underline flex items-center gap-3xs mt-sm self-start">
              Open Satellite Radar <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="premium-glass rounded-3xl border border-white/5 p-md flex flex-col justify-between h-56 hover:border-white/10 transition-all">
            <div className="space-y-xs">
              <Lock className="h-8 w-8 text-vantage-accent" />
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Secure Passport Vault</h4>
              <p className="text-xs text-vantage-muted">Save document credentials, TSA PreCheck, and payment details inside secure local browser memory.</p>
            </div>
            <button onClick={() => navigate('/dashboard')} className="text-xs font-bold text-vantage-accent hover:underline flex items-center gap-3xs mt-sm self-start">
              Configure Vault Preferences <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="premium-glass rounded-3xl border border-white/5 p-md flex flex-col justify-between h-56 hover:border-white/10 transition-all">
            <div className="space-y-xs">
              <ShieldCheck className="h-8 w-8 text-vantage-accent" />
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Locator Ledger Retrieval</h4>
              <p className="text-xs text-vantage-muted">Search, modify, or add baggage services to your confirmed itineraries using booking references.</p>
            </div>
            <button onClick={() => navigate('/manage-booking')} className="text-xs font-bold text-vantage-accent hover:underline flex items-center gap-3xs mt-sm self-start">
              Retrieve Smart Ticket <ChevronRight className="h-4 w-4" />
            </button>
          </div>

        </div>
      </section>

      {/* Structured Modern Footer Section */}
      <footer className="border-t border-white/5 pt-md pb-sm space-y-md">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-md">
          
          <div className="col-span-2 space-y-xs">
            <div className="flex items-center gap-xs">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-vantage-accent to-blue-600 flex items-center justify-center font-black text-xs text-vantage-dark">
                V
              </div>
              <span className="font-black text-sm tracking-tight text-white uppercase">
                Capstone<span className="text-vantage-accent">.Vantage</span>
              </span>
            </div>
            <p className="text-[11px] text-vantage-muted max-w-sm">
              Capstone.Vantage operates an encrypted aerospace booking matrix, enabling flight dispatching, PNR generation, and telemetry interception.
            </p>
          </div>

          <div className="space-y-xs text-xs">
            <h5 className="font-bold uppercase tracking-wider text-white">Book Flights</h5>
            <ul className="space-y-2xs font-mono text-[10px] text-vantage-muted">
              <li><button onClick={() => handleSelectPromo('LHR')} className="hover:text-white transition-colors text-left">New York → London</button></li>
              <li><button onClick={() => handleSelectPromo('HND')} className="hover:text-white transition-colors text-left">New York → Tokyo</button></li>
              <li><button onClick={() => handleSelectPromo('CDG')} className="hover:text-white transition-colors text-left">New York → Paris</button></li>
            </ul>
          </div>

          <div className="space-y-xs text-xs">
            <h5 className="font-bold uppercase tracking-wider text-white">Airspace Utilities</h5>
            <ul className="space-y-2xs font-mono text-[10px] text-vantage-muted">
              <li><button onClick={() => navigate('/tracker')} className="hover:text-white transition-colors text-left">ADS-B Telemetry Radar</button></li>
              <li><button onClick={() => navigate('/manage-booking')} className="hover:text-white transition-colors text-left">Itinerary Retrieval</button></li>
              <li><button onClick={() => navigate('/dashboard')} className="hover:text-white transition-colors text-left">Frequent Flyer Miles</button></li>
            </ul>
          </div>

          <div className="space-y-xs text-xs">
            <h5 className="font-bold uppercase tracking-wider text-white">Platform Services</h5>
            <ul className="space-y-2xs font-mono text-[10px] text-vantage-muted">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Vector Service</a></li>
              <li><span className="text-emerald-400">Node: Secure-Active</span></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/5 pt-xs flex flex-col md:flex-row justify-between items-center gap-xs font-mono text-[9px] text-vantage-muted">
          <span>&copy; {new Date().getFullYear()} Capstone.Vantage Airspace LLC. All flight parameters encrypted.</span>
          <div className="flex items-center gap-3xs">
            <Server className="h-3 w-3 text-vantage-accent" />
            <span>Connection Latency: 12ms (Optimized)</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
