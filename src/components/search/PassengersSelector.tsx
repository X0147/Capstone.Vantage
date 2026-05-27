import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useSearchStore from '../../store/useSearchStore';

const Counter: React.FC<{ value: number; onInc: () => void; onDec: () => void; label: string }> = ({ value, onInc, onDec, label }) => (
  <div className="flex items-center justify-between">
    <div>
      <div className="text-sm font-medium">{label}</div>
      <div className="text-xs text-white/60">{label === 'Adults' ? '12+ years' : 'Under 12'}</div>
    </div>
    <div className="flex items-center gap-2">
      <button onClick={onDec} aria-label={`Decrease ${label}`} className="w-8 h-8 rounded-md bg-white/5">-</button>
      <div className="w-6 text-center">{value}</div>
      <button onClick={onInc} aria-label={`Increase ${label}`} className="w-8 h-8 rounded-md bg-white/5">+</button>
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
    return () => document.removeEventListener('click', onDoc);
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

  return (
    <div className="relative" ref={ref}>
      <label className="block text-sm text-white/90 mb-1">Passengers & Class</label>
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className="w-full text-left bg-white/5 border border-white/10 rounded-lg p-3"
        aria-expanded={open}
      >
        {searchParams.passengers.adults} adults, {searchParams.passengers.children} children • {searchParams.travelClass}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="mt-2 w-full bg-white/6 backdrop-blur-md border border-white/10 rounded-lg p-4 shadow-lg z-50 absolute"
          >
            <div className="space-y-3">
              <Counter label="Adults" value={searchParams.passengers.adults} onInc={() => inc('adults')} onDec={() => dec('adults')} />
              <Counter label="Children" value={searchParams.passengers.children} onInc={() => inc('children')} onDec={() => dec('children')} />
              <Counter label="Infants" value={searchParams.passengers.infants} onInc={() => inc('infants')} onDec={() => dec('infants')} />

              <div className="mt-3">
                <label className="text-sm block mb-2">Class</label>
                <div className="grid grid-cols-2 gap-2">
                  {['economy', 'premium', 'business', 'first'].map((c) => (
                    <button
                      key={c}
                      onClick={() => setSearchParams({ travelClass: c as any })}
                      className={`px-3 py-2 rounded-md text-sm ${searchParams.travelClass === c ? 'bg-white/10' : 'hover:bg-white/5'}`}
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
