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

type SearchState = {
  searchParams: SearchParams;
  recentSearches: SearchParams[];
  setSearchParams: (patch: Partial<SearchParams>) => void;
  addRecentSearch: (s: SearchParams) => void;
  reset: () => void;
};

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
  setSearchParams: (patch) =>
    set({ searchParams: { ...get().searchParams, ...patch } }),
  addRecentSearch: (s) =>
    set((state) => ({ recentSearches: [s].concat(state.recentSearches).slice(0, 6) })),
  reset: () => set({ searchParams: defaultParams }),
}));

export default useSearchStore;
