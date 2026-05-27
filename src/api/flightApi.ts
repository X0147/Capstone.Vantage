// src/api/flightApi.ts
export interface FlightSearchParams {
  origin: string;
  destination: string;
  departureDate: string; // ISO date (YYYY-MM-DD)
  returnDate?: string;
  passengers: number;
}

export interface Flight {
  id: string;
  airline: string;
  origin: string;
  destination: string;
  departureTime: string; // ISO string
  arrivalTime: string; // ISO string
  price: number;
}

export interface FlightSearchResponse {
  outbound: Flight[];
  return?: Flight[];
}

/**
 * Client for flight search endpoints. Returns unified shape matching mock service.
 */
export async function fetchFlights(
  params: FlightSearchParams,
  signal?: AbortSignal
): Promise<FlightSearchResponse> {
  const query = new URLSearchParams({
    origin: params.origin,
    destination: params.destination,
    departureDate: params.departureDate,
    passengers: String(params.passengers),
    ...(params.returnDate ? { returnDate: params.returnDate } : {}),
  }).toString();

  const response = await fetch(`/api/flights/search?${query}`, { signal });
  if (!response.ok) {
    throw new Error('Failed to fetch flights');
  }
  const data = (await response.json()) as FlightSearchResponse;
  return data;
}
