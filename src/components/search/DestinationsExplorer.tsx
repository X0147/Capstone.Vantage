import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, X, Percent, DollarSign, Globe, ArrowUpDown,
  Clock, ArrowRight, ChevronLeft, ChevronRight, LayoutGrid, Rows3
} from 'lucide-react';
import type { CountryPromo } from '../../data/allCountries';

// ─── Region definitions ───────────────────────────────────────────────────────

const REGIONS: { label: string; emoji: string; tags: string[] }[] = [
  { label: 'All', emoji: '🌍', tags: [] },
  { label: 'Europe', emoji: '🏛️', tags: ['adriatic','alpine','aegean','balkan','bohemian heritage','baltic sanctuary','bavarian','danube palace','dalmatian','emerald coast','haute couture','heritage','imperial','nordic calm','pyrenees','scandinavian','iberian','guildhouse'] },
  { label: 'Asia', emoji: '🏯', tags: ['exclusive','dynasty','angkor heritage','java sea','sultanate','imperial','persian legacy','mesopotamia','silk road','thunder dragon','caucasus','caspian','gulf pearl','judean hills','petra ruins','bengal','highland ridge'] },
  { label: 'Americas', emoji: '🌎', tags: ['patagonia','tropical','andean','equatorial rhythms','caribbean rhythm','punta cana','antilles','exuma','montego bay','mayan heart','copan ruins','pura vida','andean equatorial','kaieteur forest','volcanic edge','hispaniola peak','reef reef','nature island','spice island'] },
  { label: 'Africa', emoji: '🦁', tags: ['sahara','okavango','gold coast','equatorial','rainforest','sahelian','rift valley','dahomey','oubangui','bioko','dahlak archipelago','highland ridge','equatorial haven','west african coast','lagoon city'] },
  { label: 'Middle East', emoji: '🕌', tags: ['gulf pearl','persian legacy','mesopotamia','judean hills','petra ruins','levantine coast','antiquity'] },
  { label: 'Pacific', emoji: '🌊', tags: ['pacific','melanesia paradise','coral sea','fiji'] },
];

// ─── Sort options ─────────────────────────────────────────────────────────────

type SortMode = 'featured' | 'discount-high' | 'price-low' | 'price-high' | 'name-az';

const SORT_OPTIONS: { label: string; value: SortMode }[] = [
  { label: 'Featured', value: 'featured' },
  { label: 'Best Discount', value: 'discount-high' },
  { label: 'Price ↑', value: 'price-low' },
  { label: 'Price ↓', value: 'price-high' },
  { label: 'A–Z', value: 'name-az' },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function finalPrice(c: CountryPromo) {
  return Math.round(c.price * (1 - c.offRate / 100));
}

function useDebounce<T>(value: T, ms: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), ms);
    return () => clearTimeout(t);
  }, [value, ms]);
  return debounced;
}

// ─── PromoCard (compact grid variant) ────────────────────────────────────────

interface CardProps {
  country: CountryPromo;
  onSelect: (city: string, iata: string, price: number, offRate: number) => void;
}

const DestinationCard: React.FC<CardProps> = ({ country, onSelect }) => {
  const promo = finalPrice(country);
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5, scale: 1.02 }}
      onClick={() => onSelect(country.name, country.code, country.price, country.offRate)}
      className="group relative h-52 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-300"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ')
          onSelect(country.name, country.code, country.price, country.offRate);
      }}
      aria-label={`Fly to ${country.name} from $${promo} — ${country.offRate}% off`}
    >
      {/* BG image */}
      <img
        src={country.image}
        alt={country.name}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
      {/* Discount badge */}
      <span className="absolute top-2.5 right-2.5 z-10 text-[9px] font-mono font-bold tracking-widest text-vantage-emerald bg-black/50 border border-vantage-emerald/30 px-2 py-0.5 rounded-full backdrop-blur-md">
        -{country.offRate}%
      </span>
      {/* Tag */}
      <span className="absolute top-2.5 left-2.5 z-10 text-[8px] font-mono font-bold text-white/70 bg-black/40 border border-white/10 px-2 py-0.5 rounded-full backdrop-blur-md uppercase tracking-widest">
        {country.tag}
      </span>
      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-3 z-10">
        <p className="text-[8px] font-mono text-vantage-accent uppercase tracking-widest">JFK →</p>
        <h3 className="font-display font-bold text-white text-base leading-tight mt-0.5">
          {country.name}
          <span className="text-[11px] font-sans font-normal text-white/50 ml-1">({country.code})</span>
        </h3>
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10">
          <span className="flex items-center gap-1 text-[9px] text-white/50 font-mono">
            <Clock className="w-2.5 h-2.5" />
            {country.duration}
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-[9px] text-white/30 line-through font-mono">${country.price}</span>
            <span className="text-vantage-gold font-bold text-sm">${promo}</span>
          </div>
        </div>
        {/* Hover CTA */}
        <div className="overflow-hidden mt-1.5">
          <div className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-vantage-accent opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 ease-premium">
            Book this flight <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Horizontal carousel (default "browse" mode) ──────────────────────────────

interface CarouselProps {
  destinations: CountryPromo[];
  onSelect: (city: string, iata: string, price: number, offRate: number) => void;
}

const HorizontalCarousel: React.FC<CarouselProps> = ({ destinations, onSelect }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);
  const [progress, setProgress] = useState(0);

  const check = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft < max - 8);
    setProgress(max > 0 ? (el.scrollLeft / max) * 100 : 0);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    check();
    return () => {
      el.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, [check, destinations.length]);

  const scrollBy = (dir: 'left' | 'right') => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'left' ? -el.clientWidth * 0.8 : el.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <div className="relative group/carousel">
      {canLeft && (
        <button
          onClick={() => scrollBy('left')}
          aria-label="Scroll left"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-vantage-midnight/90 backdrop-blur-md border border-white/15 text-white flex items-center justify-center hover:bg-vantage-accent hover:text-vantage-midnight hover:border-vantage-accent transition-all duration-200 shadow-xl"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      )}
      {canRight && (
        <button
          onClick={() => scrollBy('right')}
          aria-label="Scroll right"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-vantage-midnight/90 backdrop-blur-md border border-white/15 text-white flex items-center justify-center hover:bg-vantage-accent hover:text-vantage-midnight hover:border-vantage-accent transition-all duration-200 shadow-xl"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
      <div
        ref={ref}
        className="flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {destinations.map((d) => (
          <div key={d.code} className="snap-start shrink-0 w-[230px] sm:w-[250px]">
            <DestinationCard country={d} onSelect={onSelect} />
          </div>
        ))}
      </div>
      {/* Scroll progress bar */}
      <div className="flex items-center gap-3 max-w-[200px] mx-auto mt-2">
        <span className="text-[8px] font-mono text-vantage-accent font-bold">01</span>
        <div className="flex-1 h-[1.5px] bg-white/5 rounded-full relative overflow-hidden">
          <div
            className="absolute top-0 bottom-0 w-1/4 bg-vantage-gold rounded-full transition-all duration-150 ease-out"
            style={{ transform: `translateX(${progress * 3}%)` }}
          />
        </div>
        <span className="text-[8px] font-mono text-white/40">{destinations.length < 10 ? `0${destinations.length}` : destinations.length}</span>
      </div>
    </div>
  );
};

// ─── Main DestinationsExplorer ────────────────────────────────────────────────

interface DestinationsExplorerProps {
  destinations: CountryPromo[];
  onSelect: (city: string, iata: string, price: number, offRate: number) => void;
}

export const DestinationsExplorer: React.FC<DestinationsExplorerProps> = ({ destinations, onSelect }) => {
  const [rawQuery, setRawQuery] = useState('');
  const [region, setRegion] = useState('All');
  const [sort, setSort] = useState<SortMode>('featured');
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [showSort, setShowSort] = useState(false);
  const query = useDebounce(rawQuery, 160);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    let res = destinations;

    // region filter
    const reg = REGIONS.find((r) => r.label === region);
    if (reg && reg.tags.length > 0) {
      res = res.filter((c) =>
        reg.tags.some((t) => c.tag.toLowerCase().includes(t) || t.includes(c.tag.toLowerCase()))
      );
    }

    // text search
    if (query.trim()) {
      const q = query.toLowerCase();
      res = res.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.code.toLowerCase().includes(q) ||
          c.tag.toLowerCase().includes(q)
      );
    }

    // sort
    switch (sort) {
      case 'discount-high': return [...res].sort((a, b) => b.offRate - a.offRate);
      case 'price-low':     return [...res].sort((a, b) => finalPrice(a) - finalPrice(b));
      case 'price-high':    return [...res].sort((a, b) => finalPrice(b) - finalPrice(a));
      case 'name-az':       return [...res].sort((a, b) => a.name.localeCompare(b.name));
      default:              return res;
    }
  }, [destinations, query, region, sort]);

  const isSearching = !!query.trim() || region !== 'All' || sort !== 'featured';
  const activeMode = isSearching ? 'grid' : viewMode;

  return (
    <div className="space-y-4">
      {/* ── Search bar ── */}
      <div className="relative group/search">
        {/* glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-sky-500/8 via-blue-600/4 to-sky-500/8 opacity-0 group-focus-within/search:opacity-100 blur-md transition-opacity duration-300 pointer-events-none" />
        <div className="relative flex items-center gap-3 bg-white/[0.03] border border-white/8 group-focus-within/search:border-sky-400/35 rounded-2xl px-5 py-3.5 transition-all duration-300 backdrop-blur-md">
          <Search className="w-4 h-4 text-sky-400/50 group-focus-within/search:text-sky-400 transition-colors shrink-0" />
          <input
            ref={inputRef}
            id="country-search-input"
            type="text"
            value={rawQuery}
            onChange={(e) => setRawQuery(e.target.value)}
            placeholder="Search any country, region, or offer tag…"
            className="flex-1 bg-transparent text-sm text-white placeholder:text-white/20 focus:outline-none font-light tracking-wide"
          />
          <div className="flex items-center gap-2 shrink-0">
            {rawQuery && (
              <button
                onClick={() => { setRawQuery(''); inputRef.current?.focus(); }}
                className="w-6 h-6 flex items-center justify-center rounded-lg text-white/25 hover:text-white hover:bg-white/10 transition-all"
                aria-label="Clear"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <span className="px-2 py-1 rounded-full bg-sky-500/8 border border-sky-400/15 text-[9px] font-mono font-bold text-sky-400 tracking-widest uppercase">
              {filtered.length}
            </span>
          </div>
        </div>
      </div>

      {/* ── Toolbar: regions + sort + view mode ── */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Region chips */}
        <div className="flex items-center gap-1.5 flex-1 flex-wrap">
          {REGIONS.map((r) => (
            <button
              key={r.label}
              onClick={() => setRegion(r.label)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-bold font-mono uppercase tracking-widest transition-all duration-200 border ${
                region === r.label
                  ? 'bg-sky-500/15 border-sky-400/40 text-sky-300 shadow-[0_0_10px_rgba(56,189,248,0.12)]'
                  : 'bg-white/[0.02] border-white/6 text-white/35 hover:text-white/60 hover:border-white/15 hover:bg-white/[0.04]'
              }`}
            >
              <span>{r.emoji}</span> {r.label}
            </button>
          ))}
        </div>

        {/* Sort dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowSort(!showSort)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold font-mono uppercase tracking-widest border transition-all duration-200 ${
              sort !== 'featured'
                ? 'bg-sky-500/15 border-sky-400/40 text-sky-300'
                : 'bg-white/[0.02] border-white/6 text-white/35 hover:text-white/60 hover:border-white/15 hover:bg-white/[0.04]'
            }`}
          >
            <ArrowUpDown className="w-3 h-3" />
            {SORT_OPTIONS.find((o) => o.value === sort)?.label}
          </button>
          <AnimatePresence>
            {showSort && (
              <motion.div
                initial={{ opacity: 0, y: 4, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-40 rounded-xl bg-[#0d1117] border border-white/10 shadow-2xl z-50 overflow-hidden"
              >
                {SORT_OPTIONS.map((o) => (
                  <button
                    key={o.value}
                    onClick={() => { setSort(o.value); setShowSort(false); }}
                    className={`w-full text-left px-4 py-2.5 text-[11px] font-mono uppercase tracking-widest transition-colors ${
                      sort === o.value
                        ? 'text-sky-300 bg-sky-500/10'
                        : 'text-white/50 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {o.value === sort && <span className="mr-1.5">✓</span>}{o.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* View mode toggle (only visible when not auto-switching) */}
        {!isSearching && (
          <div className="flex items-center bg-white/[0.03] border border-white/8 rounded-full p-0.5">
            <button
              onClick={() => setViewMode('carousel')}
              className={`w-7 h-7 flex items-center justify-center rounded-full transition-all duration-200 ${viewMode === 'carousel' ? 'bg-sky-500/20 text-sky-300' : 'text-white/25 hover:text-white/50'}`}
              aria-label="Carousel view"
            >
              <Rows3 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`w-7 h-7 flex items-center justify-center rounded-full transition-all duration-200 ${viewMode === 'grid' ? 'bg-sky-500/20 text-sky-300' : 'text-white/25 hover:text-white/50'}`}
              aria-label="Grid view"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* ── Results ── */}
      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center gap-4"
          >
            <div className="w-14 h-14 rounded-full bg-white/5 border border-white/8 flex items-center justify-center">
              <Globe className="w-6 h-6 text-white/15" />
            </div>
            <div>
              <p className="text-sm text-white/50">No destinations match your filters</p>
              <button
                onClick={() => { setRawQuery(''); setRegion('All'); setSort('featured'); }}
                className="mt-2 text-[10px] font-mono uppercase tracking-widest text-sky-400 hover:text-sky-300 underline underline-offset-4 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          </motion.div>
        ) : activeMode === 'carousel' ? (
          <motion.div key="carousel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <HorizontalCarousel destinations={filtered} onSelect={onSelect} />
          </motion.div>
        ) : (
          <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Grid header */}
            <div className="flex items-center justify-between mb-3">
              <p className="text-[9px] font-mono uppercase tracking-widest text-white/30">
                Showing {filtered.length} destination{filtered.length !== 1 ? 's' : ''}
                {region !== 'All' && <> · {region}</>}
                {query && <> · "{query}"</>}
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              <AnimatePresence>
                {filtered.map((d) => (
                  <DestinationCard key={d.code} country={d} onSelect={onSelect} />
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay to close sort dropdown */}
      {showSort && <div className="fixed inset-0 z-40" onClick={() => setShowSort(false)} />}
    </div>
  );
};

export default DestinationsExplorer;
