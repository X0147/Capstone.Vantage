import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useSearchStore from '../../store/useSearchStore';
import { Users } from 'lucide-react';

const Counter: React.FC<{ value: number; onInc: () => void; onDec: () => void; label: string }> = ({
  value,
  onInc,
  onDec,
  label,
}) => (
  <div className="flex items-center justify-between">
    <div>
      <div className="text-sm font-semibold text-white">{label}</div>
      <div className="text-[10px] text-vantage-muted">{label === 'Adults' ? '12+ years' : 'Under 12'}</div>
    </div>
    <div className="flex items-center gap-2">
      <button
        onClick={onDec}
        aria-label={`Decrease ${label}`}
        className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-white font-bold transition-colors"
      >
        -
      </button>
      <div className="w-6 text-center text-sm font-semibold text-white">{value}</div>
      <button
        onClick={onInc}
        aria-label={`Increase ${label}`}
        className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-white font-bold transition-colors"
      >
        +
      </button>
    </div>
  </div>
);

export const PassengersSelector: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { searchParams, setSearchParams } = useSearchStore();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('click', onDoc);
    return () => {
      document.removeEventListener('click', onDoc);
    };
  }, []);

  const inc = (key: keyof typeof searchParams.passengers) => {
    const p = { ...searchParams.passengers };
    (p as any)[key] = Math.min(((p as any)[key] as number) + 1, 9);
    setSearchParams({ passengers: p });
  };
  const dec = (key: keyof typeof searchParams.passengers) => {
    const p = { ...searchParams.passengers };
    (p as any)[key] = Math.max(((p as any)[key] as number) - 1, 0);
    setSearchParams({ passengers: p });
  };

  const classLabel = searchParams.travelClass.charAt(0).toUpperCase() + searchParams.travelClass.slice(1);

  return (
    <div className="relative flex-1" ref={ref}>
      <label htmlFor="passenger-toggle" className="block text-[10px] uppercase tracking-wider text-vantage-muted font-mono mb-1 select-none">
        Passengers & Class
      </label>
      <div className="flex items-center gap-xs mt-0.5">
        <Users className="w-4 h-4 text-vantage-gold/75 shrink-0" />
        <div className="flex-1">
          <button
            id="passenger-toggle"
            type="button"
            onClick={() => {
              setOpen((s) => !s);
            }}
            className="w-full text-left bg-transparent border-0 p-0 text-sm font-semibold text-white focus:outline-none focus:ring-0 transition-colors"
            aria-expanded={open}
          >
            {searchParams.passengers.adults} {searchParams.passengers.adults === 1 ? 'Adult' : 'Adults'},{' '}
            {searchParams.passengers.children} {searchParams.passengers.children === 1 ? 'Child' : 'Children'} •{' '}
            <span className="text-vantage-gold">{classLabel}</span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="mt-xs w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-sm shadow-2xl z-50 absolute left-0 right-0"
          >
            <div className="space-y-sm">
              <Counter
                label="Adults"
                value={searchParams.passengers.adults}
                onInc={() => {
                  inc('adults');
                }}
                onDec={() => {
                  dec('adults');
                }}
              />
              <Counter
                label="Children"
                value={searchParams.passengers.children}
                onInc={() => {
                  inc('children');
                }}
                onDec={() => {
                  dec('children');
                }}
              />
              <Counter
                label="Infants"
                value={searchParams.passengers.infants}
                onInc={() => {
                  inc('infants');
                }}
                onDec={() => {
                  dec('infants');
                }}
              />

              <div className="mt-sm border-t border-white/10 pt-sm">
                <label className="text-[10px] uppercase font-mono tracking-widest text-vantage-muted block mb-2 select-none">Class</label>
                <div className="grid grid-cols-2 gap-xs">
                  {['economy', 'premium', 'business', 'first'].map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setSearchParams({ travelClass: c as any });
                      }}
                      className={`px-sm py-xs rounded-lg text-xs font-semibold transition-all ${
                        searchParams.travelClass === c
                          ? 'bg-vantage-gold text-vantage-midnight shadow-glow-gold'
                          : 'bg-white/5 text-white hover:bg-white/10'
                      }`}
                    >
                      {c.charAt(0).toUpperCase() + c.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PassengersSelector;
