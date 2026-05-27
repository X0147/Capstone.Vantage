import { useQuery } from '@tanstack/react-query';

export interface SearchCriteria {
  origin: string;
  destination: string;
  departureDate: string;
  passengerCount: number;
}

interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
}

interface FlightAPIResponse {
  flights: Flight[];
  lastUpdated: string;
  status: 'active' | 'complete';
}

const fetchLiveFlights = async (criteria: SearchCriteria): Promise<FlightAPIResponse> => {
  const queryParams = new URLSearchParams({
    origin: criteria.origin,
    destination: criteria.destination,
    departureDate: criteria.departureDate,
    passengers: criteria.passengerCount.toString(),
  });

  const response = await fetch(`/api/flights/search?${queryParams.toString()}`);
  if (!response.ok) {
    throw new Error('Failed to retrieve live flight options');
  }
  return response.json() as Promise<FlightAPIResponse>;
};

export const useFlightSearch = (criteria: SearchCriteria, isEnabled: boolean) => {
  return useQuery<FlightAPIResponse, Error>({
    queryKey: ['flightSearch', criteria],
    queryFn: () => fetchLiveFlights(criteria),
    enabled: isEnabled && !!criteria.origin && !!criteria.destination && !!criteria.departureDate,
    // Flight rates vary continuously. Force refresh background pools:
    refetchInterval: 30000, // Background poll every 30 seconds
    refetchIntervalInBackground: false,
    staleTime: 15000, // Data becomes stale after 15 seconds
    gcTime: 5 * 60 * 1000, // Keep in cache for 5 minutes
    retry: 2,
  });
};
