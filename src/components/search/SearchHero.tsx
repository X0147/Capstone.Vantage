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
    <div className="w-full max-w-4xl mx-auto premium-glass rounded-3xl p-md border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] bg-black/40 backdrop-blur-2xl space-y-md relative overflow-hidden">
      {/* Decorative gradient orb for glassmorphism effect */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      
      {/* Tab Switcher Area */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-xs relative z-10">
        <TabSwitcher
          value={searchParams.tripType}
          onChange={(type) => {
            setSearchParams({ tripType: type });
            setError(null);
          }}
        />

        <span className="text-[10px] uppercase font-mono tracking-widest text-sky-400 font-semibold bg-sky-500/10 px-2 py-1 rounded-md border border-sky-500/20 shadow-sm">
          Vantage Premium Search Portal
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-md relative z-10">
        {searchParams.tripType === 'multicity' ? (
          /* Multi-city Dynamic Rows */
          <div className="space-y-sm">
            {multiCitySegments.map((segment, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-12 gap-xs items-end bg-black/40 p-sm rounded-2xl border border-white/10 shadow-inner relative group hover:border-white/20 transition-colors"
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
                    className="w-full bg-black/50 border border-white/20 rounded-xl px-sm py-xs text-xs text-white focus:outline-none focus:border-sky-400 focus:bg-black/70 transition-all shadow-sm"
                  />
                </div>
                <div className="md:col-span-1 flex justify-center pb-2xs">
                  {multiCitySegments.length > 2 && (
                    <button
                      type="button"
                      onClick={() => {
                        handleRemoveSegment(idx);
                      }}
                      className="p-2xs rounded-lg text-red-400/80 hover:text-red-400 hover:bg-red-500/20 hover:shadow-[0_0_10px_rgba(239,68,68,0.2)] transition-all"
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
                className="flex items-center gap-2xs px-sm py-2xs border border-dashed border-white/20 hover:border-sky-400 hover:text-sky-400 hover:bg-sky-500/5 rounded-xl text-xs font-bold text-vantage-muted transition-all w-full justify-center sm:w-auto"
              >
                <Plus className="w-3 h-3" /> Add Another Flight Segment
              </button>
            )}
          </div>
        ) : (
          /* One-way & Round-trip standard grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-sm">
            <div className="bg-black/20 rounded-2xl p-xs border border-white/5 hover:border-white/10 transition-colors">
              <GlobalLocationInput
                label="Departure Airport"
                placeholder="From where?"
                value={origin}
                onChange={(code) => {
                  setOrigin(code);
                  if (error) setError(null);
                }}
              />
            </div>

            <div className="bg-black/20 rounded-2xl p-xs border border-white/5 hover:border-white/10 transition-colors">
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
          </div>
        )}

        {/* Date, Class and Passenger Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-sm border-t border-white/10 pt-sm">
          <DateRangePicker />
          <PassengersSelector />
        </div>

        {/* Dynamic Error Messaging Plane */}
        {error && (
          <div className="flex items-center gap-2xs p-xs rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium animate-pulse shadow-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="flex justify-end border-t border-white/10 pt-sm">
          <button
            type="submit"
            className="px-lg py-sm rounded-xl bg-gradient-to-r from-sky-400 to-blue-600 text-vantage-dark font-black text-xs uppercase tracking-widest flex items-center gap-2xs transition-all hover:opacity-95 hover:shadow-[0_0_25px_rgba(56,189,248,0.4)] active:scale-[0.98] shadow-lg"
          >
            <PlaneTakeoff className="w-4 h-4" /> Search Availability
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchHero;
