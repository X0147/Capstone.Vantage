import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useSearchStore from '../../store/useSearchStore';
import { Calendar } from 'lucide-react';

interface Props {}

export const DateRangePicker: React.FC<Props> = () => {
  const { searchParams, setSearchParams } = useSearchStore();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('click', onDoc);
    return () => {
      document.removeEventListener('click', onDoc);
    };
  }, []);

  return (
    <div className="relative flex-1" ref={ref}>
      <label htmlFor="departDate" className="block text-[10px] uppercase tracking-wider text-vantage-muted font-mono mb-1 select-none">
        Dates
      </label>
      <div className="flex items-center gap-xs mt-0.5">
        <Calendar className="w-4 h-4 text-vantage-gold/75 shrink-0" />
        <div className="flex-1 flex items-center gap-2">
          <input
            id="departDate"
            aria-label="Departure date"
            value={searchParams.departDate}
            onFocus={() => {
              setOpen(true);
            }}
            onChange={(e) => {
              setSearchParams({ departDate: e.target.value });
            }}
            className="w-full bg-transparent border-0 p-0 text-sm font-semibold text-white focus:outline-none focus:ring-0 transition-colors [color-scheme:dark]"
            type="date"
          />
          {searchParams.tripType === 'roundtrip' && (
            <>
              <label htmlFor="returnDate" className="sr-only">Return date</label>
              <span className="text-white/20 font-bold select-none text-xs">→</span>
              <input
                id="returnDate"
                aria-label="Return date"
                value={searchParams.returnDate ?? ''}
                onFocus={() => {
                  setOpen(true);
                }}
                onChange={(e) => {
                  setSearchParams({ returnDate: e.target.value });
                }}
                className="w-full bg-transparent border-0 p-0 text-sm font-semibold text-white focus:outline-none focus:ring-0 transition-colors [color-scheme:dark]"
                type="date"
              />
            </>
          )}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="mt-xs w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-sm shadow-2xl z-50 absolute left-0 right-0"
          >
            <div className="text-xs text-white/90 font-medium">Select Travel Dates</div>
            <div className="mt-xs text-[10px] text-vantage-muted font-mono leading-relaxed">
              Use the date selectors above to set your custom itinerary departure and arrival dates.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DateRangePicker;
