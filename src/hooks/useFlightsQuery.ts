import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useSearchStore from '../store/useSearchStore';
import { searchFlights, type FlightSearchResult } from '../services/flightService';

const useDebouncedValue = <T,>(value: T, delayMs: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    return () => window.clearTimeout(timeoutId);
  }, [value, delayMs]);

  return debouncedValue;
};

export const useFlightsQuery = () => {
  const searchParams = useSearchStore((state) => state.searchParams);
  const debouncedSearchParams = useDebouncedValue(searchParams, 300);

  const hasRequiredInputs =
    debouncedSearchParams.from.trim().length > 0 &&
    debouncedSearchParams.to.trim().length > 0 &&
    debouncedSearchParams.departDate.trim().length > 0;

  return useQuery<FlightSearchResult[], Error>({
    queryKey: ['flights', debouncedSearchParams],
    enabled: hasRequiredInputs,
    queryFn: async ({ signal }) => {
      return searchFlights(
        {
          origin: debouncedSearchParams.from,
          destination: debouncedSearchParams.to,
          date: debouncedSearchParams.departDate,
          passengers: debouncedSearchParams.passengers,
          tripType: debouncedSearchParams.tripType,
          cabinClass: debouncedSearchParams.travelClass,
        },
        signal
      );
    },
  });
};

export default useFlightsQuery;
