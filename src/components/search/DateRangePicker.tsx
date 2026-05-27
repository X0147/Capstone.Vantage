import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useSearchStore from '../../store/useSearchStore';

type Props = {};

export const DateRangePicker: React.FC<Props> = () => {
  const { searchParams, setSearchParams } = useSearchStore();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <label className="block text-sm text-white/90 mb-1">Dates</label>
      <div className="flex gap-3">
        <input
          aria-label="Departure date"
          value={searchParams.departDate}
          onFocus={() => setOpen(true)}
          onChange={(e) => setSearchParams({ departDate: e.target.value })}
          className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none"
          type="date"
        />
        <input
          aria-label="Return date"
          value={searchParams.returnDate || ''}
          onFocus={() => setOpen(true)}
          onChange={(e) => setSearchParams({ returnDate: e.target.value })}
          className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none"
          type="date"
        />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="mt-2 w-full bg-white/6 backdrop-blur-md border border-white/10 rounded-lg p-4 shadow-lg z-50 absolute"
          >
            <div className="text-sm text-white/80">Pick departure and return dates</div>
            <div className="mt-3 text-xs text-white/60">(Inline calendar UI can be implemented here — placeholder uses native date inputs for accessibility.)</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DateRangePicker;
