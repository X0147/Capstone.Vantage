import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchStore, TripType } from '../../store/useSearchStore';
import { GlobalLocationInput } from '../GlobalLocationInput';
import { TabSwitcher } from './TabSwitcher';
import { DateRangePicker } from './DateRangePicker';
import { PassengersSelector } from './PassengersSelector';
import { AlertCircle, PlaneTakeoff, Plus, Trash2, ArrowRight } from 'lucide-react';

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
        setError('Please fill in all flight details for every segment.');
        return;
      }
      setError(null);
      executeSearch();
      navigate('/search-results');
      return;
    }

    if (!origin || !destination) {
      setError('Please select both a departure and arrival airport.');
      return;
    }

    if (origin.toUpperCase() === destination.toUpperCase()) {
      setError('Departure and arrival airports cannot be identical.');
      return;
    }

    setError(null);
    executeSearch();
    navigate('/search-results');
  };

  return (
    <div className="w-full max-w-5xl mx-auto premium-glass-strong rounded-4xl shadow-card border border-white/8 overflow-hidden">
      {/* Top bar — tabs + portal label */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-xs px-lg pt-md pb-0">
        <TabSwitcher
          value={searchParams.tripType}
          onChange={(type) => {
            setSearchParams({ tripType: type });
            setError(null);
          }}
        />
        <span className="text-[9px] uppercase font-mono tracking-widest text-vantage-accent/70 pb-sm">
          Vantage Premium Search Portal
        </span>
      </div>

      {/* Divider */}
      <div className="h-px bg-white/5 mx-lg" />

      <form onSubmit={handleSubmit} className="px-lg pb-lg pt-md space-y-md">
        {searchParams.tripType === 'multicity' ? (
          <div className="space-y-sm">
            {multiCitySegments.map((segment, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-12 gap-xs items-end bg-black/20 p-sm rounded-3xl border border-white/6 hover:border-white/10 transition-colors"
              >
                <div className="md:col-span-4">
                  <GlobalLocationInput
                    label={`Leg ${idx + 1} — Departure`}
                    placeholder="City or airport"
                    value={segment.origin}
                    onChange={(code) => handleSegmentChange(idx, { origin: code })}
                  />
                </div>
                <div className="md:col-span-4">
                  <GlobalLocationInput
                    label={`Leg ${idx + 1} — Arrival`}
                    placeholder="City or airport"
                    value={segment.destination}
                    onChange={(code) => handleSegmentChange(idx, { destination: code })}
                  />
                </div>
                <div className="md:col-span-3">
                  <label className="block text-[9px] uppercase tracking-widest text-vantage-muted font-bold mb-2xs">
                    Departure Date
                  </label>
                  <input
                    type="date"
                    value={segment.date}
                    onChange={(e) => handleSegmentChange(idx, { date: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-sm py-xs text-xs text-white focus:outline-none focus:border-vantage-accent/60 focus:bg-black/60 transition-all"
                  />
                </div>
                <div className="md:col-span-1 flex justify-center pb-2xs">
                  {multiCitySegments.length > 2 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveSegment(idx)}
                      className="p-2xs rounded-xl text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-all"
                      title="Remove segment"
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
                className="flex items-center gap-2xs px-sm py-2xs border border-dashed border-white/15 hover:border-vantage-accent/50 hover:text-vantage-accent hover:bg-vantage-accent/5 rounded-2xl text-xs font-semibold text-vantage-muted transition-all"
              >
                <Plus className="w-3.5 h-3.5" /> Add Another Flight
              </button>
            )}
          </div>
        ) : (
          /* One-way & Round-trip */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-xs">
            <div className="bg-black/20 rounded-3xl px-sm py-xs border border-white/6 hover:border-white/10 focus-within:border-vantage-accent/40 transition-colors">
              <GlobalLocationInput
                label="From"
                placeholder="Departure city or airport"
                value={origin}
                onChange={(code) => { setOrigin(code); if (error) setError(null); }}
              />
            </div>
            <div className="bg-black/20 rounded-3xl px-sm py-xs border border-white/6 hover:border-white/10 focus-within:border-vantage-accent/40 transition-colors">
              <GlobalLocationInput
                label="To"
                placeholder="Arrival city or airport"
                value={destination}
                onChange={(code) => { setDestination(code); if (error) setError(null); }}
              />
            </div>
          </div>
        )}

        {/* Date & Passengers row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-xs">
          <div className="bg-black/20 rounded-3xl px-sm py-xs border border-white/6 hover:border-white/10 focus-within:border-vantage-accent/40 transition-colors">
            <DateRangePicker />
          </div>
          <div className="bg-black/20 rounded-3xl px-sm py-xs border border-white/6 hover:border-white/10 focus-within:border-vantage-accent/40 transition-colors">
            <PassengersSelector />
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2xs p-xs rounded-2xl bg-red-500/8 border border-red-500/20 text-red-400 text-xs font-medium">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Submit */}
        <div className="flex justify-end pt-xs border-t border-white/5">
          <button
            type="submit"
            className="group flex items-center gap-sm px-xl py-sm rounded-2xl bg-gradient-to-r from-sky-400 to-blue-600 text-vantage-midnight font-bold text-sm uppercase tracking-widest transition-all duration-300 hover:shadow-glow-accent hover:scale-[1.02] active:scale-[0.98] shadow-lg"
          >
            <PlaneTakeoff className="w-4 h-4 transition-transform duration-300 group-hover:-rotate-6" />
            Search Flights
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchHero;
