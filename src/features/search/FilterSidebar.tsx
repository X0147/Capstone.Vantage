import React, { useMemo } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import type { FlightOption, FilterState } from './types';

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  rawFlights: FlightOption[];
  maxAvailablePrice: number;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = React.memo(
  ({ filters, onFilterChange, rawFlights, maxAvailablePrice }) => {
    const airlineStats = useMemo(() => {
      const stats: Record<string, number> = {};
      rawFlights.forEach((flight) => {
        const name = flight.outbound[0]?.airline;
        if (name) stats[name] = (stats[name] || 0) + 1;
      });
      return stats;
    }, [rawFlights]);

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onFilterChange({ ...filters, maxPrice: Number(e.target.value) });
    };

    const handleStopToggle = (stop: number) => {
      const updatedStops = filters.stops.includes(stop)
        ? filters.stops.filter((s) => s !== stop)
        : [...filters.stops, stop];
      onFilterChange({ ...filters, stops: updatedStops });
    };

    const handleAirlineToggle = (airline: string) => {
      const updatedAirlines = filters.airlines.includes(airline)
        ? filters.airlines.filter((a) => a !== airline)
        : [...filters.airlines, airline];
      onFilterChange({ ...filters, airlines: updatedAirlines });
    };

    return (
      <aside className="sticky top-24 hidden h-[calc(100vh-7rem)] w-[300px] shrink-0 space-y-md self-start overflow-y-auto rounded-xl border border-white/10 bg-white/5 p-sm backdrop-blur-md lg:block premium-glass">
        <div className="flex items-center gap-2xs border-b border-white/10 pb-2xs">
          <SlidersHorizontal className="h-4 w-4 text-vantage-accent" />
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Filters</h3>
        </div>

        <div className="space-y-2xs">
          <div className="flex justify-between text-xs font-medium">
            <span className="text-vantage-muted">Max Price</span>
            <span className="text-white">${filters.maxPrice}</span>
          </div>
          <input
            type="range"
            min={0}
            max={maxAvailablePrice || 2000}
            value={filters.maxPrice}
            onChange={handlePriceChange}
            className="h-1 w-full cursor-pointer appearance-none rounded-lg bg-white/10 accent-vantage-accent"
          />
        </div>

        <div className="space-y-xs">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-vantage-muted">Stops</h4>
          <div className="space-y-2xs">
            {[0, 1, 2].map((stop) => (
              <label key={stop} className="flex cursor-pointer items-center gap-xs text-sm text-white">
                <input
                  type="checkbox"
                  checked={filters.stops.includes(stop)}
                  onChange={() => handleStopToggle(stop)}
                  className="h-4 w-4 rounded border-white/10 bg-vantage-dark text-vantage-accent focus:ring-0"
                />
                <span>{stop === 0 ? 'Non-stop' : `${stop} stop${stop > 1 ? 's' : ''}`}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-xs">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-vantage-muted">Airlines</h4>
          <div className="max-h-48 space-y-2xs overflow-y-auto pr-2xs">
            {Object.entries(airlineStats).map(([name, count]) => (
              <label key={name} className="flex cursor-pointer items-center justify-between text-sm text-white">
                <div className="flex items-center gap-xs">
                  <input
                    type="checkbox"
                    checked={filters.airlines.includes(name)}
                    onChange={() => handleAirlineToggle(name)}
                    className="h-4 w-4 rounded border-white/10 bg-vantage-dark text-vantage-accent focus:ring-0"
                  />
                  <span>{name}</span>
                </div>
                <span className="text-xs text-vantage-muted">({count})</span>
              </label>
            ))}
          </div>
        </div>
      </aside>
    );
  }
);

FilterSidebar.displayName = 'FilterSidebar';

export default FilterSidebar;
