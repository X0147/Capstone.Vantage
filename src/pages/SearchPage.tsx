import React from 'react';
import SearchHero from '../components/search/SearchHero';
import { useSearchStore } from '../store/useSearchStore';
import { Sparkles } from 'lucide-react';
import LoyaltyBanner from '../components/LoyaltyBanner';
import TechFeaturesGrid from '../components/TechFeaturesGrid';
import StructuredFooter from '../components/StructuredFooter';
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
          {PROMO_DESTINATIONS.map((promo) => (
            <PromoCard
              key={promo.iata}
              city={promo.city}
              iata={promo.iata}
              price={promo.price}
              duration={promo.duration}
              image={promo.image}
              tag={promo.tag}
              onSelect={handleSelectPromo}
            />
          ))}
        </div>
        <LoyaltyBanner />
      </section>

      <TechFeaturesGrid />

      {/* Structured Modern Footer Section */}
      <StructuredFooter />

    </div>
  );
}
