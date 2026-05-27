import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

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
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
}

export interface BookingState {
  step: 'search' | 'selection' | 'passengers' | 'seats' | 'checkout' | 'confirmation';
  selectedFlight: Flight | null;
  passengers: Passenger[];
  selectedSeats: Record<string, string>; // Maps Passenger index to Seat ID (e.g. { "0": "12A" })
  setStep: (step: BookingState['step']) => void;
  setSelectedFlight: (flight: Flight | null) => void;
  setPassengers: (passengers: Passenger[]) => void;
  setSelectedSeats: (selectedSeats: Record<string, string>) => void;
  resetBooking: () => void;
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      step: 'search',
      selectedFlight: null,
      passengers: [],
      selectedSeats: {},
      setStep: (step) => set({ step }),
      setSelectedFlight: (selectedFlight) => set({ selectedFlight }),
      setPassengers: (passengers) => set({ passengers }),
      setSelectedSeats: (selectedSeats) => set({ selectedSeats }),
      resetBooking: () =>
        set({
          step: 'search',
          selectedFlight: null,
          passengers: [],
          selectedSeats: {},
        }),
    }),
    {
      name: 'vantage-booking-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
