import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { searchFlights } from '../services/flightService';

export interface Passenger {
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  passportNumber?: string;
  email?: string;
  phone?: string;
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

export interface BookingRecord {
  pnr: string;
  lastName: string;
  outbound: Flight | null;
  returnFlight: Flight | null;
  passengers: Passenger[];
  seats: string[];
  totalPrice: number;
  dateBooked: string;
}

export interface TicketDetails {
  pnr: string;
  lastName: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  status: string;
  seat: string;
  passengerName: string;
  passengerFirstName: string;
  passengerLastName: string;
  cabin: string;
  gate: string;
  terminal: string;
}

export interface SearchParams {
  from: string;
  to: string;
  departDate: string;
  returnDate?: string;
  passengers: { adults: number; children: number };
}

export type BookingFlowStep =
  | 'search'
  | 'selection'
  | 'passengers'
  | 'seats'
  | 'checkout'
  | 'confirmation';

export interface BookingState {
  // Wizard-style step tracker (Flow 1)
  currentStep: number;
  // Step route tracker (Flow 2)
  step: BookingFlowStep;

  // Flight Selections
  selectedFlight: Flight | null;
  selectedOutbound: Flight | null;
  selectedReturn: Flight | null;

  // Passenger state
  passenger: Passenger | null;
  passengers: Passenger[];

  // Seating state
  selectedSeats: string[] & { outbound?: string[] };
  seatPriceTotal: number;

  // Search state
  searchParams: SearchParams;
  flightsOutbound: Flight[];
  flightsReturn: Flight[];
  isSearching: boolean;

  // Payment/Confirmation state
  payment: Record<string, unknown> | null;
  paymentComplete: boolean;
  bookingReference: string | null;
  bookingConfirmed: boolean;

  // Saved Bookings
  pastBookings: BookingRecord[];

  // Core Actions
  setStep: (step: number | BookingFlowStep) => void;
  setPassenger: (details: Passenger) => void;
  setPassengers: (passengers: Passenger[]) => void;
  setSeats: (seatIds: string[], price: number) => void;
  setSelectedSeats: (selectedSeats: Record<string, string[]>) => void;
  completePayment: () => void;
  confirmBooking: () => Promise<void>;
  setSelectedFlight: (flight: Flight | null) => void;
  selectOutbound: (flight: Flight) => void;
  selectReturn: (flight: Flight) => void;
  setSearchParams: (params: Partial<SearchParams>) => void;
  searchFlights: () => Promise<void>;
  setPayment: (payment: Record<string, unknown>) => void;
  resetStore: () => void;
  resetBooking: () => void;
  getBooking: (pnr: string, lastName: string) => BookingRecord | null;

  // Ticket Tracking
  trackedTicket: TicketDetails | null;
  trackError: string | null;
  lookupTicket: (pnr: string, lastName: string) => Promise<boolean>;
  clearTrackedTicket: () => void;
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      // Defaults
      currentStep: 1,
      step: 'search',
      selectedFlight: null,
      selectedOutbound: null,
      selectedReturn: null,
      passenger: null,
      passengers: [],
      selectedSeats: (() => {
        const arr = [] as string[] & { outbound?: string[] };
        arr.outbound = [];
        return arr;
      })(),
      seatPriceTotal: 0,
      searchParams: {
        from: '',
        to: '',
        departDate: '',
        returnDate: '',
        passengers: { adults: 1, children: 0 },
      },
      flightsOutbound: [],
      flightsReturn: [],
      isSearching: false,
      payment: null,
      paymentComplete: false,
      bookingReference: null,
      bookingConfirmed: false,
      pastBookings: [],
      trackedTicket: null,
      trackError: null,

      // Actions
      setStep: (step) => {
        if (typeof step === 'number') {
          set({ currentStep: step });
        } else {
          set({ step });
        }
      },

      setPassenger: (passenger) => {
        set({
          passenger,
          passengers: [passenger],
          currentStep: 2,
        });
      },

      setPassengers: (passengers) => {
        set({
          passengers,
          passenger: passengers[0] ?? null,
        });
      },

      setSeats: (seatIds, seatPriceTotal) => {
        const selectedSeats = [...seatIds] as string[] & { outbound?: string[] };
        selectedSeats.outbound = seatIds;
        set({
          selectedSeats,
          seatPriceTotal,
          currentStep: 3,
        });
      },

      setSelectedSeats: (seatsRecord) => {
        // Handle record format (e.g. from tests or flow 2)
        const outboundSeats = seatsRecord.outbound ?? [];
        const selectedSeats = [...outboundSeats] as string[] & { outbound?: string[] };
        selectedSeats.outbound = outboundSeats;
        set({ selectedSeats });
      },

      completePayment: () => {
        set({ paymentComplete: true, currentStep: 4 });
      },

      confirmBooking: async () => {
        set({ isSearching: true });
        try {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          const state = get();
          const ref = Math.random().toString(36).substring(2, 8).toUpperCase();

          const newBooking: BookingRecord = {
            pnr: ref,
            lastName: state.passengers[0]?.lastName ?? '',
            outbound: state.selectedOutbound,
            returnFlight: state.selectedReturn,
            passengers: state.passengers,
            seats: state.selectedSeats,
            totalPrice:
              (state.selectedOutbound?.price ?? 0) +
              (state.selectedReturn?.price ?? 0) +
              state.seatPriceTotal,
            dateBooked: new Date().toISOString(),
          };

          set((prev) => ({
            bookingConfirmed: true,
            bookingReference: ref,
            paymentComplete: true,
            currentStep: 4,
            pastBookings: [...prev.pastBookings, newBooking],
          }));
        } finally {
          set({ isSearching: false });
        }
      },

      setSelectedFlight: (selectedFlight) => set({ selectedFlight }),
      selectOutbound: (flight) => set({ selectedOutbound: flight, selectedFlight: flight }),
      selectReturn: (flight) => set({ selectedReturn: flight }),

      setSearchParams: (params) =>
        set((state) => ({ searchParams: { ...state.searchParams, ...params } })),

      searchFlights: async () => {
        set({ isSearching: true });
        try {
          const { searchParams } = get();
          const results = await searchFlights({
            origin: searchParams.from,
            destination: searchParams.to,
            date: searchParams.departDate,
            passengers: {
              adults: searchParams.passengers.adults,
              children: searchParams.passengers.children,
              infants: 0,
            },
            tripType: searchParams.returnDate ? 'roundtrip' : 'oneway',
            cabinClass: 'economy',
          });

          // Map results to Flight type
          const outbound = results
            .filter((r) => r.leg === 'outbound')
            .map((r) => ({
              id: r.id,
              airline: { name: r.airlineName, logo: '' },
              departure: { iata: r.origin, time: r.departureIso },
              arrival: { iata: r.destination, time: r.arrivalIso },
              duration: `${Math.floor(r.durationMinutes / 60)}h ${r.durationMinutes % 60}m`,
              stops: r.stops,
              price: r.price,
            }));

          const returnFlights = results
            .filter((r) => r.leg === 'return')
            .map((r) => ({
              id: r.id,
              airline: { name: r.airlineName, logo: '' },
              departure: { iata: r.origin, time: r.departureIso },
              arrival: { iata: r.destination, time: r.arrivalIso },
              duration: `${Math.floor(r.durationMinutes / 60)}h ${r.durationMinutes % 60}m`,
              stops: r.stops,
              price: r.price,
            }));

          set({
            flightsOutbound: outbound,
            flightsReturn: returnFlights,
            selectedOutbound: null,
            selectedReturn: null,
          });
        } catch (error) {
          if (error instanceof Error) console.error('Flight search failed', error.message);
          else console.error('Flight search failed', String(error));
        } finally {
          set({ isSearching: false });
        }
      },

      setPayment: (payment) => set({ payment }),

      resetStore: () => {
        // Do not reset pastBookings when clearing wizard
        set({
          currentStep: 1,
          step: 'search',
          selectedFlight: null,
          selectedOutbound: null,
          selectedReturn: null,
          passenger: null,
          passengers: [],
          selectedSeats: (() => {
            const arr = [] as string[] & { outbound?: string[] };
            arr.outbound = [];
            return arr;
          })(),
          seatPriceTotal: 0,
          searchParams: {
            from: '',
            to: '',
            departDate: '',
            returnDate: '',
            passengers: { adults: 1, children: 0 },
          },
          flightsOutbound: [],
          flightsReturn: [],
          isSearching: false,
          payment: null,
          paymentComplete: false,
          bookingReference: null,
          bookingConfirmed: false,
        });
      },

      resetBooking: () => {
        get().resetStore();
      },

      getBooking: (pnr, lastName) => {
        const bookings = get().pastBookings;
        return (
          bookings.find(
            (b) =>
              b.pnr.toUpperCase() === pnr.toUpperCase() &&
              b.lastName.toLowerCase() === lastName.toLowerCase()
          ) ?? null
        );
      },

      // Ticket Tracking Actions
      lookupTicket: async (pnr: string, lastName: string) => {
        await new Promise((r) => setTimeout(r, 800));
        if (pnr.toUpperCase() === 'VNTG6K' && lastName.toLowerCase() === 'laurence') {
          set({
            trackedTicket: {
              pnr: 'VNTG6K',
              lastName: 'Laurence',
              flightNumber: 'VW-402',
              origin: 'LOS',
              destination: 'DXB',
              departureTime: '2026-06-15T14:30:00Z',
              arrivalTime: '2026-06-15T22:30:00Z',
              status: 'ON_TIME',
              seat: '12A',
              passengerName: 'Laurence TechLead',
              passengerFirstName: 'Laurence',
              passengerLastName: 'TechLead',
              cabin: 'First Class',
              gate: 'A1',
              terminal: 'Terminal 3',
            },
            trackError: null,
          });
          return true;
        }
        set({ trackedTicket: null, trackError: 'No active reservation found matching those credentials.' });
        return false;
      },
      clearTrackedTicket: () => set({ trackedTicket: null, trackError: null }),
    }),
    {
      name: 'vantage-booking-store',
      storage: createJSONStorage(() => {
        try {
          if (typeof window !== 'undefined') {
            const maybeLocal = (window as unknown as { localStorage?: Storage }).localStorage;
            if (maybeLocal && typeof maybeLocal.setItem === 'function') return maybeLocal;
          }
        } catch {
          // ignore privacy mode local storage access failure
        }

        const store = new Map<string, string>();
        return {
          getItem: (key: string) => (store.has(key) ? (store.get(key) ?? null) : null),
          setItem: (key: string, value: string) => {
            store.set(key, value);
          },
          removeItem: (key: string) => {
            store.delete(key);
          },
        };
      }),
    }
  )
);

export default useBookingStore;
