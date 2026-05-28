import { create } from 'zustand';

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

interface SearchState {
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
  // UI convenience bindings - mirror searchParams.from/to
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
    // The query is triggered reactively by React Query (useFlightsQuery) when searchParams changes.
    // Navigation is handled inside the submitting form using standard React Router hooks.
  },
}));

export default useSearchStore;
