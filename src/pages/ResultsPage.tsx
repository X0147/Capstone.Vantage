import React, { useState, useMemo } from 'react';
import { LayoutGroup } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSearchStore } from '../store/useSearchStore';
import { useBookingStore } from '../store/useBookingStore';
import { useFlightsQuery } from '../hooks/useFlightsQuery';
import { FilterSidebar } from '../features/search/FilterSidebar';
import { FlightCard } from '../features/search/FlightCard';
import { ResultsSkeleton } from '../features/search/ResultsSkeleton';
import { FilterState, FlightOption } from '../features/search/types';
import { ArrowLeft, Plane } from 'lucide-react';

export const ResultsPage: React.FC = () => {
  const searchParams = useSearchStore((state) => state.searchParams);
  const { data: rawFlights, isLoading, isError } = useFlightsQuery();
  const navigate = useNavigate();
  const selectOutbound = useBookingStore((state) => state.selectOutbound);
  const selectReturn = useBookingStore((state) => state.selectReturn);

  // Route progression/selection states
  const [currentStep, setCurrentStep] = useState<'outbound' | 'return'>('outbound');
  const [selectedOutbound, setSelectedOutbound] = useState<FlightOption | null>(null);
  const [selectedReturn, setSelectedReturn] = useState<FlightOption | null>(null);

  // Accordion card expanding map
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  // Initialize modular client filters
  const [filters, setFilters] = useState<FilterState>({
    maxPrice: 2000,
    stops: [0, 1, 2],
    airlines: [],
  });

  // Dynamically derive maximal pricing boundaries on initial fetch arrays
  const maxAvailablePrice = useMemo(() => {
    if (!rawFlights || rawFlights.length === 0) return 2000;
    return Math.max(...rawFlights.map((f) => f.price));
  }, [rawFlights]);

  const [prevMaxAvailable, setPrevMaxAvailable] = useState<number | null>(null);
  if (maxAvailablePrice !== prevMaxAvailable) {
    setPrevMaxAvailable(maxAvailablePrice);
    setFilters((prev) => ({ ...prev, maxPrice: maxAvailablePrice }));
  }

  // Compute filtering mutations strictly
  const filteredFlights = useMemo(() => {
    if (!rawFlights) return [];
    return rawFlights.filter((flight) => {
      if (flight.price > filters.maxPrice) return false;
      const stops = flight.outbound.length - 1;
      if (!filters.stops.includes(stops)) return false;
      if (
        filters.airlines.length > 0 &&
        flight.outbound[0] &&
        !filters.airlines.includes(flight.outbound[0].airline)
      )
        return false;
      return true;
    });
  }, [rawFlights, filters]);

  const handleSelectFlight = (flight: FlightOption) => {
    const mainSegment = flight.outbound[0];
    if (!mainSegment) return;
    const mappedFlight = {
      id: flight.id,
      airline: { name: mainSegment.airline, logo: '' },
      departure: { iata: mainSegment.origin, time: mainSegment.departureTime },
      arrival: { iata: mainSegment.destination, time: mainSegment.arrivalTime },
      duration: `${String(Math.floor(mainSegment.duration / 60))}h ${String(mainSegment.duration % 60)}m`,
      stops: flight.outbound.length - 1,
      price: flight.price,
    };

    if (currentStep === 'outbound') {
      setSelectedOutbound(flight);
      selectOutbound(mappedFlight);
      if (searchParams.tripType === 'roundtrip') {
        setCurrentStep('return');
        setExpandedCardId(null);
      } else {
        // Go to seat selection
        void navigate('/seat-selection');
      }
    } else {
      setSelectedReturn(flight);
      selectReturn(mappedFlight);
      // after return selected for roundtrip, navigate to seat selection
      void navigate('/seat-selection');
    }
  };

  return (
    <div className="mx-auto max-w-[1200px] space-y-md px-sm py-lg">
      {/* Wizard Step Progression Indicator for Round Trips */}
      {searchParams.tripType === 'roundtrip' && (
        <div className="mx-auto flex max-w-md items-center justify-between rounded-xl border border-white/5 p-xs text-xs font-medium premium-glass w-full">
          <button
            disabled={!selectedOutbound}
            onClick={() => {
              setCurrentStep('outbound');
              setSelectedReturn(null);
            }}
            className={`flex items-center gap-2xs rounded-lg px-sm py-2xs transition-all ${
              currentStep === 'outbound'
                ? 'bg-vantage-accent text-vantage-dark'
                : 'text-vantage-muted'
            }`}
          >
            <Plane className="h-3.5 w-3.5" /> Outbound Flight
          </button>
          <div className="mx-2xs h-px flex-1 bg-white/10" />
          <div
            className={`flex items-center gap-2xs rounded-lg px-sm py-2xs ${
              currentStep === 'return'
                ? 'bg-vantage-accent text-vantage-dark'
                : 'text-vantage-muted'
            }`}
          >
            <Plane className="h-3.5 w-3.5 rotate-90" /> Return Flight
          </div>
        </div>
      )}

      {/* Main Core Dashboard Layout Wrapper */}
      <div className="flex flex-col items-start gap-sm lg:flex-row">
        <FilterSidebar
          filters={filters}
          onFilterChange={setFilters}
          rawFlights={rawFlights ?? []}
          maxAvailablePrice={maxAvailablePrice}
        />

        <main className="w-full flex-1 space-y-sm">
          {currentStep === 'return' && (
            <button
              onClick={() => {
                setCurrentStep('outbound');
                setSelectedOutbound(null);
              }}
              className="mb-2xs flex items-center gap-2xs text-xs font-medium text-vantage-accent hover:underline"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Modify Outbound selection
            </button>
          )}

          {isLoading ? (
            <ResultsSkeleton />
          ) : isError ? (
            <div className="rounded-xl border border-red-500/20 p-lg text-center premium-glass">
              <p className="text-sm font-medium text-red-400">
                Failed to retrieve real-time flight records. Please adjust filters.
              </p>
            </div>
          ) : filteredFlights.length === 0 ? (
            <div className="rounded-xl border border-white/5 p-lg text-center text-sm text-vantage-muted premium-glass">
              No matching flights found matching your current parameters.
            </div>
          ) : (
            <LayoutGroup>
              <div className="space-y-xs">
                {filteredFlights.map((flight) => (
                  <FlightCard
                    key={flight.id}
                    flight={flight}
                    isSelected={
                      currentStep === 'outbound'
                        ? selectedOutbound?.id === flight.id
                        : selectedReturn?.id === flight.id
                    }
                    isExpanded={expandedCardId === flight.id}
                    onToggleExpand={() => {
                      setExpandedCardId(expandedCardId === flight.id ? null : flight.id);
                    }}
                    onSelect={() => {
                      handleSelectFlight(flight);
                    }}
                    actionLabel={
                      currentStep === 'outbound' && searchParams.tripType === 'roundtrip'
                        ? 'Select Outbound'
                        : 'Select Flight'
                    }
                  />
                ))}
              </div>
            </LayoutGroup>
          )}
        </main>
      </div>
    </div>
  );
};

export default ResultsPage;
