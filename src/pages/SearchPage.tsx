import React from 'react';
import SearchHero from '../components/search/SearchHero';
import { useSearchStore } from '../store/useSearchStore';
import { ShieldCheck, Zap, BadgeDollarSign, Award, ArrowRight } from 'lucide-react';
import LoyaltyBanner from '../components/LoyaltyBanner';
import TechFeaturesGrid from '../components/TechFeaturesGrid';
import StructuredFooter from '../components/StructuredFooter';
import { PromoCarousel } from '../components/search/PromoCarousel';
import { QuickFlightTracker } from '../components/search/QuickFlightTracker';

const PROMO_DESTINATIONS = [
  {
    city: 'London',
    iata: 'LHR',
    price: 349,
    duration: '7h 15m',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=85',
    tag: 'Popular',
  },
  {
    city: 'Tokyo',
    iata: 'HND',
    price: 689,
    duration: '12h 45m',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=85',
    tag: 'Trending',
  },
  {
    city: 'Paris',
    iata: 'CDG',
    price: 399,
    duration: '6h 30m',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=85',
    tag: 'Romantic',
  },
  {
    city: 'Singapore',
    iata: 'SIN',
    price: 719,
    duration: '14h 10m',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=85',
    tag: 'Futuristic',
  },
  {
    city: 'Cape Town',
    iata: 'CPT',
    price: 829,
    duration: '15h 20m',
    image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=800&q=85',
    tag: 'Scenic',
  },
  {
    city: 'Dubai',
    iata: 'DXB',
    price: 549,
    duration: '13h 00m',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=85',
    tag: 'Luxury',
  },
];

const TRUST_BADGES = [
  { icon: ShieldCheck, label: 'AES-256 Encrypted', color: 'text-vantage-accent' },
  { icon: Zap, label: 'Real-Time Sync', color: 'text-blue-400' },
  { icon: BadgeDollarSign, label: 'Best Price Guarantee', color: 'text-vantage-gold' },
];

export default function SearchPage() {
  const { setOrigin, setDestination } = useSearchStore();

  const handleSelectPromo = (iata: string) => {
    setOrigin('JFK');
    setDestination(iata);
    const element = document.getElementById('search-funnel-container');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="w-full">
      {/* ── CINEMATIC HERO ──────────────────────────────────── */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden -mt-24 pt-24">

        {/* Ambient video background */}
        <video
          src={`${import.meta.env.BASE_URL || '/'}videos/flight-demo-payment.mp4`}
          className="absolute inset-0 w-full h-full object-cover opacity-20 scale-105"
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Deep gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-vantage-midnight/80 via-vantage-midnight/70 to-vantage-midnight" />

        {/* Ambient glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-sky-500/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-vantage-accent/3 rounded-full blur-[80px] pointer-events-none" />

        {/* Hero content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-lg flex flex-col items-center text-center space-y-xl pb-xl">

          {/* Eyebrow */}
          <div className="fade-in-up fade-in-up-delay-1 flex items-center gap-2xs px-sm py-2xs rounded-full bg-vantage-accent/10 border border-vantage-accent/20 text-[10px] font-mono tracking-widest text-vantage-accent uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-vantage-accent animate-pulse" />
            Capstone.Vantage — The Pinnacle of Global Travel
          </div>

          {/* Main headline */}
          <div className="fade-in-up fade-in-up-delay-2 space-y-sm max-w-5xl">
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.0] tracking-tight">
              <span className="text-white">The Art of</span>
              <br />
              <span className="text-gradient-sky italic">Bespoke Aviation</span>
            </h1>
            <p className="text-vantage-text text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light">
              Experience unparalleled exclusivity with real-time fleet intelligence, seamless global reservations, and uncompromising luxury in the skies.
            </p>
          </div>

          {/* Trust badges */}
          <div className="fade-in-up fade-in-up-delay-3 flex flex-wrap justify-center gap-xs">
            {TRUST_BADGES.map(({ icon: Icon, label, color }) => (
              <div
                key={label}
                className="flex items-center gap-2xs px-sm py-2xs rounded-full bg-white/5 border border-white/10 text-[11px] font-medium text-vantage-text backdrop-blur-sm"
              >
                <Icon className={`w-3.5 h-3.5 ${color} shrink-0`} />
                {label}
              </div>
            ))}
          </div>

          {/* Search widget */}
          <div id="search-funnel-container" className="w-full fade-in-up scroll-mt-32">
            <SearchHero />
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-vantage-midnight to-transparent pointer-events-none" />
      </section>

      {/* ── BELOW FOLD CONTENT ───────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-lg flex flex-col gap-3xl py-3xl">

        {/* Popular Destinations */}
        <section className="space-y-lg">
          <div className="flex justify-between items-end">
            <div className="space-y-2xs">
              <p className="text-[10px] font-mono uppercase tracking-widest text-vantage-accent">
                Exclusive Journeys
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white italic">
                Signature Destinations
              </h2>
              <p className="text-sm text-vantage-muted max-w-md">
                Discover handpicked, luxury global itineraries departing from New York—curated dynamically for the discerning traveler.
              </p>
            </div>
            <span className="hidden sm:flex items-center gap-2xs font-mono text-[10px] text-vantage-emerald font-bold uppercase tracking-wider bg-vantage-emerald/10 px-sm py-2xs rounded-full border border-vantage-emerald/20">
              <span className="h-1.5 w-1.5 rounded-full bg-vantage-emerald inline-block animate-pulse" />
              Live Pricing
            </span>
          </div>
          <PromoCarousel destinations={PROMO_DESTINATIONS} onSelect={handleSelectPromo} />
        </section>

        {/* Loyalty Banner */}
        <LoyaltyBanner />

        {/* Quick Flight Tracker */}
        <QuickFlightTracker />

        {/* Platform Features */}
        <section className="space-y-lg">
          <div className="text-center space-y-2xs">
            <p className="text-[10px] font-mono uppercase tracking-widest text-vantage-accent">
              Enterprise Infrastructure
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white italic">
              Platform Intelligence
            </h2>
          </div>
          <TechFeaturesGrid />
        </section>

        {/* Footer */}
        <StructuredFooter />
      </div>
    </div>
  );
}
