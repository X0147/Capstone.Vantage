import { create } from 'zustand';

// ─────────────────────────────────────────────────────────────────────────────
// Ticket tracking types
// ─────────────────────────────────────────────────────────────────────────────
export interface TicketDetails {
  pnr: string;
  lastName: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureTime: string;
  status: 'ON_TIME' | 'BOARDING' | 'DELAYED' | 'DEPARTED' | 'CANCELLED';
  seat: string;
  passengerName: string;
  gate?: string;
  terminal?: string;
  aircraft?: string;
  baggageCarousel?: string;
}

export interface BookingStoreState {
  trackedTicket: TicketDetails | null;
  trackError: string | null;
  trackLoading: boolean;
  lookupTicket: (pnr: string, lastName: string) => Promise<boolean>;
  clearTrackedTicket: () => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// Search types
// ─────────────────────────────────────────────────────────────────────────────
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
  isSearching: boolean;
  lastSearchTimestamp: string | null;
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

// ─────────────────────────────────────────────────────────────────────────────
// Mock ticket database — simulates multiple passenger records
// ─────────────────────────────────────────────────────────────────────────────
const MOCK_TICKETS: Record<string, TicketDetails> = {
  'VNTG6K:laurence': {
    pnr: 'VNTG6K',
    lastName: 'Laurence',
    flightNumber: 'VW-402',
    origin: 'LOS',
    destination: 'DXB',
    departureTime: '2026-06-15T14:30:00Z',
    status: 'ON_TIME',
    seat: '12A',
    passengerName: 'Laurence TechLead',
    gate: 'B42',
    terminal: 'Terminal 3',
    aircraft: 'Airbus A380-800',
    baggageCarousel: 'Carousel 7',
  },
  'VNTG9X:demo': {
    pnr: 'VNTG9X',
    lastName: 'Demo',
    flightNumber: 'EK-205',
    origin: 'JFK',
    destination: 'LHR',
    departureTime: '2026-07-01T08:00:00Z',
    status: 'BOARDING',
    seat: '2K',
    passengerName: 'Demo User',
    gate: 'A14',
    terminal: 'Terminal 1',
    aircraft: 'Boeing 777-300ER',
  },
};

export const useSearchStore = create<SearchState>((set, get) => ({
  // ─────────────────────────────────────────────────────────────────────────
  // Ticket tracking
  // ─────────────────────────────────────────────────────────────────────────
  trackedTicket: null,
  trackError: null,
  trackLoading: false,

  lookupTicket: async (pnr: string, lastName: string) => {
    set({ trackLoading: true, trackError: null });

    // Simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 600));

    const key = `${pnr.toUpperCase()}:${lastName.toLowerCase()}`;
    const ticket = MOCK_TICKETS[key];

    if (ticket) {
      set({ trackedTicket: ticket, trackError: null, trackLoading: false });
      return true;
    }

    set({
      trackError: 'No active reservation found matching those credentials. Please verify your PNR and last name.',
      trackedTicket: null,
      trackLoading: false,
    });
    return false;
  },

  clearTrackedTicket: () => set({ trackedTicket: null, trackError: null, trackLoading: false }),

  // ─────────────────────────────────────────────────────────────────────────
  // Search state
  // ─────────────────────────────────────────────────────────────────────────
  searchParams: defaultParams,
  recentSearches: [],
  isSearching: false,
  lastSearchTimestamp: null,

  setSearchParams: (patch) => {
    set({ searchParams: { ...get().searchParams, ...patch } });
  },

  addRecentSearch: (s) => {
    set((state) => ({ recentSearches: [s].concat(state.recentSearches).slice(0, 8) }));
  },

  reset: () => {
    set({ searchParams: defaultParams, isSearching: false });
  },

  // UI convenience bindings — mirror searchParams.from/to
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
    set({ isSearching: true, lastSearchTimestamp: new Date().toISOString() });
    // The query is triggered reactively by React Query (useFlightsQuery) when searchParams changes.
    // Navigation is handled inside the submitting form using standard React Router hooks.
    await Promise.resolve();
    set({ isSearching: false });
  },
}));

export default useSearchStore;
