import { useQuery } from '@tanstack/react-query';
import { fetchFlights, FlightSearchResponse, FlightSearchParams } from '../api/flightApi';

export type SearchCriteria = {
  origin: string;
  destination: string;
  departureDate: string;
  passengers: number;
  returnDate?: string;
};

const fetchLiveFlights = async (criteria: SearchCriteria): Promise<FlightSearchResponse> => {
  const params: FlightSearchParams = {
    origin: criteria.origin,
    destination: criteria.destination,
    departureDate: criteria.departureDate,
    passengers: criteria.passengers,
    ...(criteria.returnDate ? { returnDate: criteria.returnDate } : {}),
  };
  return fetchFlights(params);
};

export const useFlightSearch = (criteria: SearchCriteria, isEnabled: boolean) => {
  return useQuery<FlightSearchResponse, Error>({
    queryKey: ['flightSearch', criteria],
    queryFn: () => fetchLiveFlights(criteria),
    enabled: isEnabled && !!criteria.origin && !!criteria.destination && !!criteria.departureDate,
    refetchInterval: 30000,
    refetchIntervalInBackground: false,
    staleTime: 15000,
    gcTime: 5 * 60 * 1000,
    retry: 2,
  });
};
