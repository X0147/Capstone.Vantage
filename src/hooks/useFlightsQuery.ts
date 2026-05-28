import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useSearchStore from '../store/useSearchStore';
import { searchFlights, type FlightSearchResult } from '../services/flightService.ts';
import type { FlightOption } from '../features/search/types';

const toFlightOption = (flight: FlightSearchResult): FlightOption => ({
  id: flight.id,
  outbound: [
    {
      id: flight.id,
      airline: flight.airlineName,
      airlineCode: flight.airlineIata,
      flightNumber: flight.flightNumber,
      origin: flight.origin,
      destination: flight.destination,
      departureTime: flight.departureIso,
      arrivalTime: flight.arrivalIso,
      duration: flight.durationMinutes,
      aircraft: flight.aircraft,
    },
  ],
  returnLeg:
    flight.leg === 'return'
      ? [
          {
            id: `${flight.id}-return`,
            airline: flight.airlineName,
            airlineCode: flight.airlineIata,
            flightNumber: flight.flightNumber,
            origin: flight.destination,
            destination: flight.origin,
            departureTime: flight.departureIso,
            arrivalTime: flight.arrivalIso,
            duration: flight.durationMinutes,
            aircraft: flight.aircraft,
          },
        ]
      : undefined,
  price: flight.price,
  cabinClass: flight.cabinClass,
  amenities: {
    wifi: flight.stops === 0,
    power: true,
    seatPitch:
      flight.cabinClass === 'first'
        ? '43 in'
        : flight.cabinClass === 'business'
          ? '38 in'
          : '31 in',
    baggage: flight.stops === 0 ? '2 checked bags' : '1 checked bag',
  },
});

const useDebouncedValue = <T>(value: T, delayMs: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
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

  return useQuery<FlightOption[]>({
    queryKey: ['flights', debouncedSearchParams],
    enabled: hasRequiredInputs,
    queryFn: async ({ signal }) => {
      const results = await searchFlights(
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

      return results.map(toFlightOption);
    },
  });
};

export default useFlightsQuery;
