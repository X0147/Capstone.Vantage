import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { flightService } from '../services/flightService';

export interface Passenger {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  passportNumber: string;
  email: string;
  phone: string;
}

export interface Flight {
  id: string;
  airline: { name: string; logo: string };
  departure: { iata: string; time: string };
  arrival: { iata: string; time: string };
  duration: string;
  stops: number;
  stopover?: string;
  price: number;
}
export interface SearchParams {
  from: string;
  to: string;
  departDate: string;
  returnDate?: string;
  passengers: { adults: number; children: number };
}

export interface BookingState {
  // Booking flow
  step: 'search' | 'selection' | 'passengers' | 'seats' | 'checkout' | 'confirmation';
  selectedFlight: Flight | null;
  passengers: Passenger[];
  selectedSeats: Record<string, string>;

  // Search state
  searchParams: SearchParams;
  setSearchParams: (params: Partial<SearchParams>) => void;
  flightsOutbound: Flight[];
  flightsReturn: Flight[];
  selectedOutbound: Flight | null;
  selectedReturn: Flight | null;
  isSearching: boolean;
  searchFlights: () => Promise<void>;
  selectOutbound: (flight: Flight) => void;
  selectReturn: (flight: Flight) => void;

  payment: any | null;
  setPayment: (payment: any) => void;
  bookingReference: string | null;
  bookingConfirmed: boolean;
  confirmBooking: () => Promise<void>;

  // helpers
  setStep: (step: BookingState['step']) => void;
  setSelectedFlight: (flight: Flight | null) => void;
  setPassengers: (passengers: Passenger[]) => void;
  setSelectedSeats: (selectedSeats: Record<string, string>) => void;
  resetStore: () => void;
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      // Booking flow defaults
      step: 'search',
      selectedFlight: null,
      passengers: [],
      selectedSeats: {},

      // Search defaults
      searchParams: {
        from: '',
        to: '',
        departDate: '',
        returnDate: '',
        passengers: { adults: 1, children: 0 },
      },
      setSearchParams: (params) =>
        set((state) => ({ searchParams: { ...state.searchParams, ...params } })),

      flightsOutbound: [],
      flightsReturn: [],
      selectedOutbound: null,
      selectedReturn: null,
      isSearching: false,
      searchFlights: async () => {
        set({ isSearching: true });
        try {
          const { searchParams } = get();
          const results = await flightService.searchFlights({
            from: searchParams.from,
            to: searchParams.to,
            departDate: searchParams.departDate,
            returnDate: searchParams.returnDate,
          });
          set({
            flightsOutbound: results.outbound || [],
            flightsReturn: results.return || [],
            selectedOutbound: null,
            selectedReturn: null,
          });
        } catch (error) {
          // Keep simple for now; UI can read flights arrays and show empty state.
          // In dev, log for quick debugging.
          // eslint-disable-next-line no-console
          console.error('Flight search failed', error);
        } finally {
          set({ isSearching: false });
        }
      },
      selectOutbound: (flight) => set({ selectedOutbound: flight }),
      selectReturn: (flight) => set({ selectedReturn: flight }),

      // helpers (booking flow)
      setStep: (step) => set({ step }),
      setSelectedFlight: (selectedFlight) => set({ selectedFlight }),
      setPassengers: (passengers) => set({ passengers }),
      setSelectedSeats: (selectedSeats) => set({ selectedSeats }),

      payment: null,
      setPayment: (payment) => set({ payment }),

      bookingReference: null,
      bookingConfirmed: false,
      confirmBooking: async () => {
        // simulate checkout
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const ref = Math.random().toString(36).substring(2, 8).toUpperCase();
        set({ bookingConfirmed: true, bookingReference: ref });
      },

      resetStore: () =>
        set({
          step: 'search',
          selectedFlight: null,
          passengers: [],
          selectedSeats: {},
          searchParams: {
            from: '',
            to: '',
            departDate: '',
            returnDate: '',
            passengers: { adults: 1, children: 0 },
          },
          flightsOutbound: [],
          flightsReturn: [],
          selectedOutbound: null,
          selectedReturn: null,
          isSearching: false,
          payment: null,
          bookingReference: null,
          bookingConfirmed: false,
        }),
    }),
    {
      name: 'vantage-booking-store',
      // Provide a safe fallback storage when `localStorage` is unavailable (tests / SSR).
      storage: createJSONStorage(() => {
        if (
          typeof window !== 'undefined' &&
          window.localStorage &&
          typeof window.localStorage.setItem === 'function'
        )
          return window.localStorage;
        // lightweight in-memory fallback
        const store: Record<string, string> = {};
        return {
          getItem: (key: string) => (key in store ? store[key] : null),
          setItem: (key: string, value: string) => {
            store[key] = value;
          },
          removeItem: (key: string) => {
            delete store[key];
          },
        } as Storage;
      }),
    }
  )
);
