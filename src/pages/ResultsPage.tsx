import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useSearchStore from '../store/useSearchStore';
import useFlightsQuery from '../hooks/useFlightsQuery';
import FilterSidebar, { type FlightFilters } from '../features/search/FilterSidebar';
import FlightCard from '../features/search/FlightCard';
import ResultsSkeleton from '../features/search/ResultsSkeleton';
import ResultsEmptyState from '../features/search/ResultsEmptyState';
import type { FlightSearchResult } from '../services/flightService.ts';

const createDefaultFilters = (flights: FlightSearchResult[]): FlightFilters => {
  const prices = flights.map((flight) => flight.price);
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;

  return {
    minPrice,
    maxPrice,
    stops: [0, 1, '2+'],
    airlines: [],
  };
};

const filterFlights = (flights: FlightSearchResult[], filters: FlightFilters) => {
  return flights.filter((flight) => {
    const stopBucket = flight.stops === 0 ? 0 : flight.stops === 1 ? 1 : '2+';
    const matchesPrice = flight.price >= filters.minPrice && flight.price <= filters.maxPrice;
    const matchesStops = filters.stops.includes(stopBucket);
    const matchesAirline = filters.airlines.length === 0 || filters.airlines.includes(flight.airlineName);
    return matchesPrice && matchesStops && matchesAirline;
  });
};

export default function ResultsPage() {
  const { searchParams } = useSearchStore();
  const { data, isLoading, isFetching } = useFlightsQuery();
  const [filters, setFilters] = useState<FlightFilters>({
    minPrice: 0,
    maxPrice: 9999,
    stops: [0, 1, '2+'],
    airlines: [],
  });
  const [selectedOutboundFlight, setSelectedOutboundFlight] = useState<FlightSearchResult | null>(null);
  const [selectedReturnFlight, setSelectedReturnFlight] = useState<FlightSearchResult | null>(null);
  const [expandedFlightId, setExpandedFlightId] = useState<string | null>(null);

  const outboundFlights = useMemo(() => data?.filter((flight) => flight.leg === 'outbound') ?? [], [data]);
  const returnFlights = useMemo(() => data?.filter((flight) => flight.leg === 'return') ?? [], [data]);
  const isRoundTrip = searchParams.tripType === 'roundtrip';

  const effectiveFilters = useMemo(() => {
    const base = createDefaultFilters(outboundFlights);
    return {
      ...base,
      ...filters,
      minPrice: Math.min(filters.minPrice || base.minPrice, filters.maxPrice || base.maxPrice),
      maxPrice: Math.max(filters.maxPrice || base.maxPrice, filters.minPrice || base.minPrice),
    };
  }, [filters, outboundFlights]);

  const visibleOutboundFlights = useMemo(
    () => filterFlights(outboundFlights, effectiveFilters),
    [effectiveFilters, outboundFlights]
  );
  const visibleReturnFlights = useMemo(
    () => filterFlights(returnFlights, effectiveFilters),
    [effectiveFilters, returnFlights]
  );

  const activeStep: 1 | 2 = isRoundTrip && selectedOutboundFlight ? 2 : 1;

  const visibleFlights = activeStep === 1 || !isRoundTrip ? visibleOutboundFlights : visibleReturnFlights;
  const emptyState = !isLoading && visibleFlights.length === 0;

  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 py-6 lg:px-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <FilterSidebar flights={outboundFlights} filters={effectiveFilters} onChange={setFilters} />

        <main className="min-w-0 flex-1 space-y-5">
          <section className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_16px_50px_rgba(0,0,0,0.18)] backdrop-blur-md lg:p-6">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-white/45">Search results</p>
                <h1 className="mt-2 text-2xl font-semibold text-white md:text-3xl">
                  {searchParams.from} → {searchParams.to}
                </h1>
                <p className="mt-2 text-sm text-white/60">
                  {isRoundTrip ? 'Round-trip itinerary with outbound and return options.' : 'One-way results with premium airline options.'}
                </p>
              </div>

              {isRoundTrip && (
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 10, x: activeStep === 2 ? 16 : -16 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-white/80"
                >
                  {activeStep === 1
                    ? 'Step 1: Select outbound flight'
                    : 'Step 2: Select return flight'}
                </motion.div>
              )}
            </div>

            {isRoundTrip && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                  className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70"
                >
                  {activeStep === 1
                    ? 'Choose the outbound itinerary to unlock return options.'
                    : 'Your outbound selection is locked in. Now choose the matching return option.'}
                </motion.div>
              </AnimatePresence>
            )}
          </section>

          {isLoading || isFetching ? (
            <ResultsSkeleton count={6} />
          ) : emptyState ? (
            <ResultsEmptyState
              title="No flights match these filters"
              description="Try widening the price range, relaxing stop preferences, or removing airline constraints."
            />
          ) : (
            <div className="space-y-6">
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-white/45">
                    {activeStep === 1 || !isRoundTrip ? 'Outbound' : 'Return'}
                  </h2>
                  <p className="text-sm text-white/55">
                    {activeStep === 1 || !isRoundTrip ? visibleOutboundFlights.length : visibleReturnFlights.length} options
                  </p>
                </div>
                <div className="grid gap-4">
                  <AnimatePresence initial={false} mode="popLayout">
                    {visibleFlights
                      .map((flight) => (
                        <motion.div
                          key={flight.id}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <FlightCard
                            flight={flight}
                            expanded={expandedFlightId === flight.id}
                            selected={selectedOutboundFlight?.id === flight.id}
                            onSelect={(selectedFlight) => setSelectedOutboundFlight(selectedFlight)}
                            onToggleExpand={(flightId) =>
                              setExpandedFlightId((current) => (current === flightId ? null : flightId))
                            }
                          />
                        </motion.div>
                      ))}
                  </AnimatePresence>
                </div>
              </section>

              {isRoundTrip && activeStep === 2 && (
                <section className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-white/45">Return</h2>
                    <p className="text-sm text-white/55">{visibleReturnFlights.length} options</p>
                  </div>
                  <div className="grid gap-4">
                    <AnimatePresence initial={false} mode="popLayout">
                      {visibleReturnFlights.map((flight) => (
                        <motion.div
                          key={flight.id}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <FlightCard
                            flight={flight}
                            expanded={expandedFlightId === flight.id}
                            selected={selectedReturnFlight?.id === flight.id}
                            onSelect={(selectedFlight) => setSelectedReturnFlight(selectedFlight)}
                            onToggleExpand={(flightId) =>
                              setExpandedFlightId((current) => (current === flightId ? null : flightId))
                            }
                          />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </section>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
