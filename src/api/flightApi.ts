// src/api/flightApi.ts
// ─────────────────────────────────────────────────────────────────────────────
// Client for flight search endpoints. Enhanced with richer types for premium UX.
// ─────────────────────────────────────────────────────────────────────────────

export interface FlightSearchParams {
  origin: string;
  destination: string;
  departureDate: string; // ISO date (YYYY-MM-DD)
  returnDate?: string;
  passengers: number;
  cabinClass?: 'economy' | 'premium' | 'business' | 'first';
}

export interface FlightAmenities {
  wifi: boolean;
  powerOutlet: boolean;
  entertainment: boolean;
  mealIncluded: boolean;
  loungeAccess: boolean;
}

export interface CarbonFootprint {
  totalKg: number;
  perPassengerKg: number;
  rating: 'low' | 'medium' | 'high';
  offsetAvailable: boolean;
  offsetPriceUsd: number;
}

export interface Flight {
  id: string;
  airline: string;
  airlineIata: string;
  origin: string;
  destination: string;
  departureTime: string; // ISO string
  arrivalTime: string; // ISO string
  price: number;
  currency: string;
  aircraft: string;
  cabinClass: string;
  amenities: FlightAmenities;
  carbon: CarbonFootprint;
  onTimePercentage: number; // 0–100
  seatsRemaining: number;
}

export interface FlightSearchResponse {
  outbound: Flight[];
  return?: Flight[];
  meta: {
    totalResults: number;
    searchTimestamp: string;
    cacheHit: boolean;
    responseLatencyMs: number;
  };
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
    ...(params.cabinClass ? { cabinClass: params.cabinClass } : {}),
  }).toString();

  const response = await fetch(`/api/flights/search?${query}`, { signal });
  if (!response.ok) {
    const errorBody = await response.text().catch(() => 'Unknown error');
    throw new Error(`Flight search failed (${response.status}): ${errorBody}`);
  }
  const data = (await response.json()) as FlightSearchResponse;
  return data;
}
