import React, { useState, useMemo } from 'react';
import SearchHero from '../components/search/SearchHero';
import { useSearchStore } from '../store/useSearchStore';
import { ShieldCheck, Zap, BadgeDollarSign, Search, X, SortAsc, Percent, DollarSign } from 'lucide-react';
import LoyaltyBanner from '../components/LoyaltyBanner';
import TechFeaturesGrid from '../components/TechFeaturesGrid';
import StructuredFooter from '../components/StructuredFooter';
import { PromoCarousel } from '../components/search/PromoCarousel';
import { QuickFlightTracker } from '../components/search/QuickFlightTracker';

import { ALL_COUNTRIES } from '../data/allCountries';

const TRUST_BADGES = [
  { icon: ShieldCheck, label: 'AES-256 Encrypted', color: 'text-vantage-accent' },
  { icon: Zap, label: 'Real-Time Sync', color: 'text-blue-400' },
  { icon: BadgeDollarSign, label: 'Best Price Guarantee', color: 'text-vantage-gold' },
];

type SortMode = 'default' | 'discount-high' | 'price-low' | 'price-high' | 'name-az';

const SORT_OPTIONS: { label: string; value: SortMode; icon: typeof Percent }[] = [
  { label: 'Featured', value: 'default', icon: SortAsc },
  { label: 'Best Discount', value: 'discount-high', icon: Percent },
  { label: 'Price: Low', value: 'price-low', icon: DollarSign },
  { label: 'Price: High', value: 'price-high', icon: DollarSign },
  { label: 'A–Z', value: 'name-az', icon: SortAsc },
];

export default function SearchPage() {
  const { setOrigin, setDestination } = useSearchStore();
  const [query, setQuery] = useState('');
  const [sortMode, setSortMode] = useState<SortMode>('default');

  const filteredDestinations = useMemo(() => {
    let results = ALL_COUNTRIES;

    // Filter by search query
    if (query.trim()) {
      const q = query.toLowerCase();
      results = results.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.code.toLowerCase().includes(q) ||
          c.tag.toLowerCase().includes(q)
      );
    }

    // Sort
    switch (sortMode) {
      case 'discount-high':
        return [...results].sort((a, b) => b.offRate - a.offRate);
      case 'price-low':
        return [...results].sort((a, b) => {
          const pa = Math.round(a.price * (1 - a.offRate / 100));
          const pb = Math.round(b.price * (1 - b.offRate / 100));
          return pa - pb;
        });
      case 'price-high':
        return [...results].sort((a, b) => {
          const pa = Math.round(a.price * (1 - a.offRate / 100));
          const pb = Math.round(b.price * (1 - b.offRate / 100));
          return pb - pa;
        });
      case 'name-az':
        return [...results].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return results;
    }
  }, [query, sortMode]);

  const handleSelectPromo = (city: string, iata: string, originalPrice: number, offRate: number) => {
    const discountedPrice = Math.round(originalPrice * (1 - offRate / 100));
    const promoCode = `VANTAGE-${city.toUpperCase().replace(/[^A-Z0-9]/g, '')}-${offRate}`;
    const subject = encodeURIComponent(`Bespoke Flight Booking Request — ${city} (${iata})`);
    const body = encodeURIComponent(
      `Dear Vantage Elite Booking Desk,\n\n` +
      `I would like to request a bespoke private flight booking to ${city} (${iata}) departing from New York (JFK).\n\n` +
      `Flight & Promo Details:\n` +
      `- Origin: New York (JFK)\n` +
      `- Destination: ${city} (${iata})\n` +
      `- Standard Price: $${originalPrice}\n` +
      `- Exclusive Promo Applied: ${promoCode} (${offRate}% OFF)\n` +
      `- Final Sovereign Price: $${discountedPrice}\n\n` +
      `Please contact me immediately to finalize my itinerary, schedule, and aircraft selection (Gulfstream G700 / Bombardier Global 7500).\n\n` +
      `Sovereign Regards,\n` +
      `[Your Name]`
    );
    window.location.href = `mailto:concierge@vantage.aero?subject=${subject}&body=${body}`;
  };

  return (
    <div className="w-full">
      {/* ── CINEMATIC HERO ──────────────────────────────────── */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden -mt-24 pt-24">

        {/* Ambient video background */}
        <video
          src={`${import.meta.env.BASE_URL || '/'}videos/flight-demo-payment.mp4`}
          className="absolute inset-0 w-full h-full object-cover opacity-20 scale-110 animate-slow-zoom"
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
            <p className="text-vantage-text text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light tracking-wide">
              Where military-grade airspace intelligence meets the quiet precision of true luxury. Every reservation is a masterwork, every departure a sovereign statement, every altitude a world apart.
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
          {/* Section header */}
          <div className="flex justify-between items-end flex-wrap gap-md">
            <div className="space-y-2xs">
              <p className="text-[10px] font-mono uppercase tracking-widest text-vantage-accent">
                Exclusive Journeys
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white italic">
                Signature Destinations
              </h2>
              <p className="text-sm text-vantage-muted max-w-[448px]">
                Discover handpicked, luxury global itineraries departing from New York—curated dynamically for the discerning traveler.
              </p>
            </div>
            <span className="hidden sm:flex items-center gap-2xs font-mono text-[10px] text-vantage-emerald font-bold uppercase tracking-wider bg-vantage-emerald/10 px-sm py-2xs rounded-full border border-vantage-emerald/20">
              <span className="h-1.5 w-1.5 rounded-full bg-vantage-emerald inline-block animate-pulse" />
              Live Pricing
            </span>
          </div>

          {/* ── PREMIUM SEARCH & FILTER BAR ── */}
          <div className="space-y-sm">
            {/* Search input */}
            <div className="relative group">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-sky-500/10 via-blue-500/5 to-sky-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-sm pointer-events-none" />
              <div className="relative flex items-center gap-sm bg-white/[0.03] border border-white/8 group-focus-within:border-sky-400/40 rounded-2xl px-md py-sm transition-all duration-300 backdrop-blur-md">
                <Search className="w-4 h-4 text-sky-400/60 group-focus-within:text-sky-400 transition-colors shrink-0" />
                <input
                  id="country-search-input"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search countries, regions, or experiences... (e.g. Japan, Alpine, 25%)"
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-white/25 focus:outline-none font-light tracking-wide"
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="p-2xs rounded-lg text-white/30 hover:text-white hover:bg-white/10 transition-all"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
                {/* Results count badge */}
                <span className="hidden sm:flex items-center px-xs py-3xs rounded-full bg-sky-500/10 border border-sky-400/20 text-[9px] font-mono font-bold text-sky-400 tracking-widest uppercase shrink-0">
                  {filteredDestinations.length} destinations
                </span>
              </div>
            </div>

            {/* Sort filters pill row */}
            <div className="flex items-center gap-xs flex-wrap">
              <span className="text-[9px] font-mono uppercase tracking-widest text-white/30 mr-2xs">Sort by:</span>
              {SORT_OPTIONS.map(({ label, value, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => setSortMode(value)}
                  className={`flex items-center gap-2xs px-sm py-2xs rounded-full text-[10px] font-bold font-mono uppercase tracking-widest transition-all duration-200 border ${
                    sortMode === value
                      ? 'bg-sky-500/20 border-sky-400/50 text-sky-300 shadow-[0_0_12px_rgba(56,189,248,0.15)]'
                      : 'bg-white/[0.03] border-white/8 text-white/40 hover:text-white/70 hover:border-white/20 hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  {label}
                </button>
              ))}
            </div>

            {/* No results message */}
            {filteredDestinations.length === 0 && (
              <div className="flex flex-col items-center justify-center py-2xl text-center space-y-sm">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <Search className="w-6 h-6 text-white/20" />
                </div>
                <p className="text-sm text-vantage-muted">No destinations match <span className="text-white font-medium">"{query}"</span></p>
                <button
                  onClick={() => setQuery('')}
                  className="text-[10px] font-mono uppercase tracking-widest text-sky-400 hover:text-sky-300 underline underline-offset-4 transition-colors"
                >
                  Clear filter
                </button>
              </div>
            )}
          </div>

          {filteredDestinations.length > 0 && (
            <PromoCarousel destinations={filteredDestinations} onSelect={handleSelectPromo} />
          )}
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


