import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useSearchStore from '../../store/useSearchStore';
import { LucideSearch } from 'lucide-react';

type Props = {
  label: string;
  field: 'from' | 'to';
};

const popular = [
  { code: 'SFO', name: 'San Francisco' },
  { code: 'JFK', name: 'New York (JFK)' },
  { code: 'LHR', name: 'London Heathrow' },
  { code: 'SYD', name: 'Sydney' },
];

export const LocationInput: React.FC<Props> = ({ label, field }) => {
  const { searchParams, setSearchParams, recentSearches } = useSearchStore();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  const value = searchParams[field];

  const candidates = query
    ? popular.filter((p) => p.code.includes(query.toUpperCase()) || p.name.toLowerCase().includes(query.toLowerCase()))
    : recentSearches.map((r) => ({ code: r.from || r.to, name: `${r.from} → ${r.to}` })).filter(Boolean);

  return (
    <div className="relative" ref={ref}>
      <label className="block text-sm text-white/90 mb-1">{label}</label>
      <div className="relative">
        <input
          aria-label={label}
          value={query || value}
          onFocus={() => setOpen(true)}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-vantage-accent"
          placeholder="City or airport code"
        />
        <div className="absolute right-3 top-3 text-white/60">
          <LucideSearch size={16} />
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="mt-2 w-full bg-white/6 backdrop-blur-md border border-white/10 rounded-lg p-3 shadow-lg z-50 absolute"
          >
            <div className="text-xs text-white/60 mb-2">Popular destinations</div>
            <ul className="space-y-2">
              {candidates.length ? (
                candidates.map((c: any) => (
                  <li key={c.code}>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchParams({ [field]: c.code } as any);
                        setOpen(false);
                        setQuery('');
                      }}
                      className="w-full text-left px-2 py-2 rounded hover:bg-white/5"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium">{c.code}</div>
                          <div className="text-xs text-white/60">{c.name}</div>
                        </div>
                      </div>
                    </button>
                  </li>
                ))
              ) : (
                <li className="text-sm text-white/60">No suggestions</li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LocationInput;
