import { create } from 'zustand';

// ---------------------------------------------------------------------------
// Ticket tracking types
// ---------------------------------------------------------------------------
export interface TicketDetails {
  pnr: string;
  lastName: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureTime: string;
  status: 'ON_TIME' | 'BOARDING' | 'DELAYED' | 'DEPARTED';
  seat: string;
  passengerName: string;
}

export interface BookingStoreState {
  trackedTicket: TicketDetails | null;
  trackError: string | null;
  lookupTicket: (pnr: string, lastName: string) => Promise<boolean>;
  clearTrackedTicket: () => void;
}

// Existing imports and types
export type TripType = 'oneway' | 'roundtrip' | 'multicity';
export type TravelClass = 'economy' | 'premium' | 'business' | 'first';

export interface Passengers {
  adults: number;
  children: number;
  infants: number;
}

export interface SearchParams {
  tripType: TripType;
  from: string;
  to: string;
  departDate: string; // ISO yyyy-mm-dd
  returnDate?: string;
  passengers: Passengers;
  travelClass: TravelClass;
}

interface SearchState extends BookingStoreState {
  searchParams: SearchParams;
  recentSearches: SearchParams[];
  setSearchParams: (patch: Partial<SearchParams>) => void;
  addRecentSearch: (s: SearchParams) => void;
  reset: () => void;
  // convenience bindings for UI
  origin: string;
  destination: string;
  setOrigin: (code: string) => void;
  setDestination: (code: string) => void;
  executeSearch: () => Promise<void>;
}

const defaultParams: SearchParams = {
  tripType: 'roundtrip',
  from: '',
  to: '',
  departDate: '',
  returnDate: '',
  passengers: { adults: 1, children: 0, infants: 0 },
  travelClass: 'economy',
};

export const useSearchStore = create<SearchState>((set, get) => ({
  // -----------------------------------------------------------------------
  // Ticket tracking state
  // -----------------------------------------------------------------------
  trackedTicket: null,
  trackError: null,
  lookupTicket: async (pnr: string, lastName: string) => {
    await Promise.resolve();
    // Simulated high‑performance lookup – replace with real API call later
    if (pnr.toUpperCase() === 'VNTG6K' && lastName.toLowerCase() === 'laurence') {
      set({
        trackedTicket: {
          pnr: 'VNTG6K',
          lastName: 'Laurence',
          flightNumber: 'VW-402',
          origin: 'LOS',
          destination: 'DXB',
          departureTime: '2026-06-15T14:30:00Z',
          status: 'ON_TIME',
          seat: '12A',
          passengerName: 'Laurence TechLead',
        },
        trackError: null,
      });
      return true;
    }
    set({ trackError: 'No active reservation found matching those credentials.', trackedTicket: null });
    return false;
  },
  clearTrackedTicket: () => set({ trackedTicket: null, trackError: null }),

  // -----------------------------------------------------------------------
  // Existing search store logic
  // -----------------------------------------------------------------------
  searchParams: defaultParams,
  recentSearches: [],
  setSearchParams: (patch) => {
    set({ searchParams: { ...get().searchParams, ...patch } });
  },
  addRecentSearch: (s) => {
    set((state) => ({ recentSearches: [s].concat(state.recentSearches).slice(0, 6) }));
  },
  reset: () => {
    set({ searchParams: defaultParams });
  },
  // UI convenience bindings – mirror searchParams.from/to
  origin: defaultParams.from,
  destination: defaultParams.to,
  setOrigin: (code: string) => {
    set((state) => ({
      searchParams: { ...state.searchParams, from: code },
      origin: code,
    }));
  },
  setDestination: (code: string) => {
    set((state) => ({
      searchParams: { ...state.searchParams, to: code },
      destination: code,
    }));
  },
  executeSearch: async () => {
    await Promise.resolve();
    // The query is triggered reactively by React Query (useFlightsQuery) when searchParams changes.
    // Navigation is handled inside the submitting form using standard React Router hooks.
  },
}));


export default useSearchStore;
