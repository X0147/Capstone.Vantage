import { useQuery } from '@tanstack/react-query';
import { fetchFlights, FlightSearchResponse, FlightSearchParams } from '../api/flightApi';

export interface SearchCriteria {
  origin: string;
  destination: string;
  departureDate: string;
  passengers: number;
  returnDate?: string;
}

export const useFlightSearch = (criteria: SearchCriteria, isEnabled: boolean) => {
  return useQuery<FlightSearchResponse, unknown>({
    queryKey: ['flightSearch', criteria],
    queryFn: async () => {
      const params: FlightSearchParams = {
        origin: criteria.origin,
        destination: criteria.destination,
        departureDate: criteria.departureDate,
        passengers: criteria.passengers,
        ...(criteria.returnDate ? { returnDate: criteria.returnDate } : {}),
      };
      const resp = await fetch(`/api/flights/search?${new URLSearchParams({
        origin: params.origin,
        destination: params.destination,
        departureDate: params.departureDate,
        passengers: String(params.passengers),
        ...(params.returnDate ? { returnDate: params.returnDate } : {}),
      }).toString()}`);
      if (!resp.ok) throw new Error('Failed to fetch flights');
      const json = await resp.json();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return json as FlightSearchResponse;
    },
    enabled: isEnabled && !!criteria.origin && !!criteria.destination && !!criteria.departureDate,
    refetchInterval: 30000,
    refetchIntervalInBackground: false,
    staleTime: 15000,
    gcTime: 5 * 60 * 1000,
    retry: 2,
  });
};
