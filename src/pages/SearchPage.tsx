import React from 'react';
import SearchHero from '../components/search/SearchHero';
import { useSearchStore } from '../store/useSearchStore';
import { Sparkles } from 'lucide-react';
import LoyaltyBanner from '../components/LoyaltyBanner';
import TechFeaturesGrid from '../components/TechFeaturesGrid';
import StructuredFooter from '../components/StructuredFooter';
import { PromoCarousel } from '../components/search/PromoCarousel';
const PROMO_DESTINATIONS = [
  {
    city: 'London',
    iata: 'LHR',
    price: 349,
    duration: '7h 15m',
    image:
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80',
    tag: 'Popular',
  },
  {
    city: 'Tokyo',
    iata: 'HND',
    price: 689,
    duration: '12h 45m',
    image:
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80',
    tag: 'Trending',
  },
  {
    city: 'Paris',
    iata: 'CDG',
    price: 399,
    duration: '6h 30m',
    image:
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80',
    tag: 'Romantic',
  },
  {
    city: 'Singapore',
    iata: 'SIN',
    price: 719,
    duration: '14h 10m',
    image:
      'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=600&q=80',
    tag: 'Futuristic',
  },
  {
    city: 'Cape Town',
    iata: 'CPT',
    price: 829,
    duration: '15h 20m',
    image:
      'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=600&q=80',
    tag: 'Scenic',
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg items-center relative z-10">
          {/* Left Column: Heading and Description */}
          <div className="lg:col-span-7 space-y-sm">
            <span className="inline-flex items-center gap-2xs rounded-full border border-vantage-accent/30 bg-vantage-accent/15 px-xs py-2xs text-[10px] font-black uppercase tracking-widest text-vantage-accent shadow-[0_0_15px_rgba(56,189,248,0.1)]">
              <Sparkles className="h-3.5 w-3.5 animate-pulse" /> Vantage Flight Intelligence System
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-[1.05]">
              Chart your next horizon <br />
              <span className="bg-gradient-to-r from-vantage-accent via-sky-400 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(56,189,248,0.15)]">
                in real-time precision
              </span>
            </h1>
            <p className="text-sm md:text-base text-vantage-muted max-w-xl leading-relaxed">
              Orchestrate your global journeys with satellite-linked vector telemetry, secure 
              instant PNR ticketing, and custom-tailored cabin ergonomics designed exclusively 
              for the modern elite traveler.
            </p>
          </div>

          {/* Right Column: Premium Video Preview Frame */}
          <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
            <div className="relative group w-full max-w-md aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(56,189,248,0.15)] bg-black/40 backdrop-blur-sm transition-all duration-300 hover:border-vantage-accent/30 hover:shadow-[0_0_50px_rgba(56,189,248,0.25)]">
              <video
                src={`${import.meta.env.BASE_URL || '/'}videos/flight-demo-payment.mp4`}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
              {/* Premium overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              
              {/* Meta information overlay */}
              <div className="absolute bottom-xs left-xs right-xs flex justify-between items-center text-[10px] font-mono text-vantage-muted bg-black/55 backdrop-blur-md px-sm py-2xs rounded-lg border border-white/5">
                <span className="flex items-center gap-3xs font-semibold text-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-vantage-accent animate-pulse" />
                  DEMO.PAYMENT_FLOW
                </span>
                <span className="text-vantage-accent">LIVE_PREVIEW</span>
              </div>
            </div>
          </div>
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
            <h2 className="text-xl font-black text-white tracking-tight">
              Popular Staralliance Routes
            </h2>
            <p className="text-xs text-vantage-muted">
              Quick-lock curated premium flight vectors starting from lowest monthly matrix rates.
            </p>
          </div>
          <span className="hidden sm:inline-flex items-center gap-3xs font-mono text-[10px] text-vantage-accent font-bold uppercase tracking-wider">
            Updated live{' '}
            <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
          </span>
        </div>

        <PromoCarousel destinations={PROMO_DESTINATIONS} onSelect={handleSelectPromo} />
        <LoyaltyBanner />
      </section>

      <TechFeaturesGrid />

      {/* Structured Modern Footer Section */}
      <StructuredFooter />
    </div>
  );
}
