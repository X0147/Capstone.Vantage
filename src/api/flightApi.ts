// src/api/flightApi.ts
export interface FlightSearchParams {
  origin: string;
  destination: string;
  departureDate: string; // ISO date (YYYY-MM-DD)
  returnDate?: string; // optional for round‑trip
  passengers: number;
}

export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureTime: string; // ISO string
  arrivalTime: string;   // ISO string
  price: number;
  // Add any extra fields needed by UI
}

/**
 * Mock API call – replace with real endpoint.
 */
export async function fetchFlights(params: FlightSearchParams, signal?: AbortSignal): Promise<Flight[]> {
  const query = new URLSearchParams({
    origin: params.origin,
    destination: params.destination,
    departureDate: params.departureDate,
    passengers: String(params.passengers),
    ...(params.returnDate ? { returnDate: params.returnDate } : {}),
  }).toString();

  const response = await fetch(`/api/flights?${query}`, { signal });
  if (!response.ok) {
    throw new Error('Failed to fetch flights');
  }
  const data = (await response.json()) as Flight[];
  return data;
}
