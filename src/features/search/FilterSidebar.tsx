import React from 'react';
import type { FlightSearchResult } from '../../services/flightService.ts';

export interface FlightFilters {
  minPrice: number;
  maxPrice: number;
  stops: Array<0 | 1 | '2+'>;
  airlines: string[];
}

export interface FilterSidebarProps {
  flights: FlightSearchResult[];
  filters: FlightFilters;
  onChange: (filters: FlightFilters) => void;
}

const STOP_OPTIONS: Array<0 | 1 | '2+'> = [0, 1, '2+'];

export function FilterSidebar({ flights, filters, onChange }: FilterSidebarProps) {
  const priceValues = flights.map((flight) => flight.price);
  const minFlightPrice = priceValues.length > 0 ? Math.min(...priceValues) : 0;
  const maxFlightPrice = priceValues.length > 0 ? Math.max(...priceValues) : 0;

  const airlineCounts = flights.reduce<Record<string, number>>((accumulator, flight) => {
    accumulator[flight.airlineName] = (accumulator[flight.airlineName] ?? 0) + 1;
    return accumulator;
  }, {});

  const toggleStop = (stop: 0 | 1 | '2+') => {
    const isSelected = filters.stops.includes(stop);
    onChange({
      ...filters,
      stops: isSelected ? filters.stops.filter((item) => item !== stop) : [...filters.stops, stop],
    });
  };

  const toggleAirline = (airlineName: string) => {
    const isSelected = filters.airlines.includes(airlineName);
    onChange({
      ...filters,
      airlines: isSelected ? filters.airlines.filter((item) => item !== airlineName) : [...filters.airlines, airlineName],
    });
  };

  return (
    <aside className="sticky top-24 hidden h-[calc(100vh-7rem)] w-[300px] shrink-0 overflow-y-auto rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-md lg:block">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-white">Filters</h2>
          <p className="mt-1 text-sm text-white/60">Refine results instantly without breaking flow.</p>
        </div>

        <section className="space-y-3">
          <div className="flex items-center justify-between text-sm text-white/75">
            <span>Price range</span>
            <span>${filters.minPrice} - ${filters.maxPrice}</span>
          </div>
          <div className="space-y-3">
            <label className="block text-xs uppercase tracking-[0.2em] text-white/50">Minimum</label>
            <input
              type="range"
              min={minFlightPrice}
              max={maxFlightPrice}
              value={filters.minPrice}
              onChange={(event) => onChange({ ...filters, minPrice: Number(event.target.value) })}
              className="w-full accent-vantage-accent"
            />
            <label className="block text-xs uppercase tracking-[0.2em] text-white/50">Maximum</label>
            <input
              type="range"
              min={minFlightPrice}
              max={maxFlightPrice}
              value={filters.maxPrice}
              onChange={(event) => onChange({ ...filters, maxPrice: Number(event.target.value) })}
              className="w-full accent-vantage-accent"
            />
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-white/50">Stops</h3>
          <div className="space-y-2">
            {STOP_OPTIONS.map((stop) => (
              <label key={String(stop)} className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/10 px-3 py-2 text-sm text-white/80">
                <input
                  type="checkbox"
                  checked={filters.stops.includes(stop)}
                  onChange={() => toggleStop(stop)}
                  className="h-4 w-4 rounded border-white/20 bg-transparent text-vantage-accent focus:ring-vantage-accent"
                />
                {stop === 0 ? 'Non-stop' : stop === 1 ? '1 stop' : '2+ stops'}
              </label>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-white/50">Airlines</h3>
          <div className="space-y-2">
            {Object.entries(airlineCounts).map(([airlineName, count]) => (
              <label key={airlineName} className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/10 px-3 py-2 text-sm text-white/80">
                <span className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={filters.airlines.includes(airlineName)}
                    onChange={() => toggleAirline(airlineName)}
                    className="h-4 w-4 rounded border-white/20 bg-transparent text-vantage-accent focus:ring-vantage-accent"
                  />
                  <span>{airlineName}</span>
                </span>
                <span className="text-white/45">({count})</span>
              </label>
            ))}
          </div>
        </section>
      </div>
    </aside>
  );
}

export default FilterSidebar;
