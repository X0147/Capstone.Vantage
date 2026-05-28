import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchStore, TripType } from '../../store/useSearchStore';
import { GlobalLocationInput } from '../GlobalLocationInput';
import { TabSwitcher } from './TabSwitcher';
import { DateRangePicker } from './DateRangePicker';
import { PassengersSelector } from './PassengersSelector';
import { AlertCircle, PlaneTakeoff, Plus, Trash2 } from 'lucide-react';

interface MultiCitySegment {
  origin: string;
  destination: string;
  date: string;
}

export const SearchHero: React.FC = () => {
  const navigate = useNavigate();
  const {
    origin,
    destination,
    setOrigin,
    setDestination,
    executeSearch,
    searchParams,
    setSearchParams,
  } = useSearchStore();
  const [error, setError] = useState<string | null>(null);

  // Multi-city segments state
  const [multiCitySegments, setMultiCitySegments] = useState<MultiCitySegment[]>([
    { origin: '', destination: '', date: '' },
    { origin: '', destination: '', date: '' },
  ]);

  const handleAddSegment = () => {
    if (multiCitySegments.length >= 4) return;
    setMultiCitySegments([...multiCitySegments, { origin: '', destination: '', date: '' }]);
  };

  const handleRemoveSegment = (idx: number) => {
    if (multiCitySegments.length <= 2) return;
    setMultiCitySegments(multiCitySegments.filter((_, i) => i !== idx));
  };

  const handleSegmentChange = (idx: number, patch: Partial<MultiCitySegment>) => {
    setMultiCitySegments(multiCitySegments.map((s, i) => (i === idx ? { ...s, ...patch } : s)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchParams.tripType === 'multicity') {
      const hasEmpty = multiCitySegments.some((s) => !s.origin || !s.destination || !s.date);
      if (hasEmpty) {
        setError('Please fill in all details for all multi-city flights.');
        return;
      }
      setError(null);
      executeSearch();
      navigate('/search-results');
      return;
    }

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
    navigate('/search-results');
  };

  return (
    <div className="w-full max-w-4xl mx-auto premium-glass rounded-3xl p-md border border-white/5 space-y-md">
      {/* Tab Switcher Area */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-xs">
        <TabSwitcher
          value={searchParams.tripType}
          onChange={(type) => {
            setSearchParams({ tripType: type });
            setError(null);
          }}
        />

        <span className="text-[10px] uppercase font-mono tracking-widest text-vantage-accent">
          Vantage Premium Search Portal
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-md">
        {searchParams.tripType === 'multicity' ? (
          /* Multi-city Dynamic Rows */
          <div className="space-y-sm">
            {multiCitySegments.map((segment, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-12 gap-xs items-end bg-white/5 p-sm rounded-2xl border border-white/5 relative"
              >
                <div className="md:col-span-4">
                  <GlobalLocationInput
                    label={`Flight ${idx + 1}: Departure`}
                    placeholder="Departure airport"
                    value={segment.origin}
                    onChange={(code) => {
                      handleSegmentChange(idx, { origin: code });
                    }}
                  />
                </div>
                <div className="md:col-span-4">
                  <GlobalLocationInput
                    label={`Flight ${idx + 1}: Arrival`}
                    placeholder="Arrival destination"
                    value={segment.destination}
                    onChange={(code) => {
                      handleSegmentChange(idx, { destination: code });
                    }}
                  />
                </div>
                <div className="md:col-span-3">
                  <label className="block text-xs uppercase tracking-wider text-vantage-muted font-bold mb-2xs">
                    Date
                  </label>
                  <input
                    type="date"
                    value={segment.date}
                    onChange={(e) => {
                      handleSegmentChange(idx, { date: e.target.value });
                    }}
                    className="w-full bg-vantage-dark/50 border border-white/10 rounded-xl px-sm py-xs text-xs text-white focus:outline-none focus:border-vantage-accent transition-colors"
                  />
                </div>
                <div className="md:col-span-1 flex justify-center pb-2xs">
                  {multiCitySegments.length > 2 && (
                    <button
                      type="button"
                      onClick={() => {
                        handleRemoveSegment(idx);
                      }}
                      className="p-2xs rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                      title="Remove flight segment"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}

            {multiCitySegments.length < 4 && (
              <button
                type="button"
                onClick={handleAddSegment}
                className="flex items-center gap-2xs px-sm py-2xs border border-dashed border-white/10 hover:border-vantage-accent hover:text-vantage-accent rounded-xl text-xs font-bold text-vantage-muted transition-all"
              >
                <Plus className="w-3 h-3" /> Add Another Flight Segment
              </button>
            )}
          </div>
        ) : (
          /* One-way & Round-trip standard grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-sm">
            <GlobalLocationInput
              label="Departure Airport"
              placeholder="From where?"
              value={origin}
              onChange={(code) => {
                setOrigin(code);
                if (error) setError(null);
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
        )}

        {/* Date, Class and Passenger Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-sm border-t border-white/5 pt-sm">
          <DateRangePicker />
          <PassengersSelector />
        </div>

        {/* Dynamic Error Messaging Plane */}
        {error && (
          <div className="flex items-center gap-2xs p-xs rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium animate-pulse">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="flex justify-end border-t border-white/5 pt-sm">
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
