import React, { useState } from 'react';
import { useSearchStore } from '../../store/useSearchStore';
import { GlobalLocationInput } from '../GlobalLocationInput';
import { AlertCircle, PlaneTakeoff } from 'lucide-react';

export const SearchHero: React.FC = () => {
  const { origin, destination, setOrigin, setDestination, executeSearch } = useSearchStore();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Invariant Check 01: Mandatory Fields
    if (!origin || !destination) {
      setError('Please select both a departure and arrival airport.');
      return;
    }

    // Invariant Check 02: Duplicate Prevention Guard
    if (origin.toUpperCase() === destination.toUpperCase()) {
      setError('Departure and arrival airports cannot be identical.');
      return;
    }

    setError(null);
    executeSearch();
  };

  return (
    <div className="w-full max-w-4xl mx-auto premium-glass rounded-3xl p-md border border-white/5 space-y-sm">
      <form onSubmit={handleSubmit} className="space-y-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-sm">
          <GlobalLocationInput 
            label="Departure Airport"
            placeholder="From where?"
            value={origin}
            onChange={(code) => {
              setOrigin(code);
              if (error) setError(null); // Real-time UX clearance
            }}
          />

          <GlobalLocationInput 
            label="Arrival Destination"
            placeholder="Going where?"
            value={destination}
            onChange={(code) => {
              setDestination(code);
              if (error) setError(null);
            }}
          />
        </div>

        {/* Dynamic Error Messaging Plane */}
        {error && (
          <div className="flex items-center gap-2xs p-xs rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium animate-pulse">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-md py-xs rounded-xl bg-gradient-to-r from-vantage-accent to-blue-500 text-vantage-dark font-black text-xs uppercase tracking-wider flex items-center gap-2xs transition-all hover:opacity-90 active:scale-[0.98]"
          >
            <PlaneTakeoff className="w-4 h-4" /> Search Availability
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchHero;
