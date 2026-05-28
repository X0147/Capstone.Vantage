import { create } from 'zustand';

export interface PassengerDetails {
  firstName: string;
  lastName: string;
  passportNumber: string;
  dateOfBirth: string;
}

export interface BookingState {
  currentStep: number;
  passenger: PassengerDetails | null;
  selectedSeats: string[];
  seatPriceTotal: number;
  paymentComplete: boolean;
  setStep: (step: number) => void;
  setPassenger: (details: PassengerDetails) => void;
  setSeats: (seatIds: string[], price: number) => void;
  completePayment: () => void;
  resetBooking: () => void;
}

export const useBookingWizardStore = create<BookingState>((set) => ({
  currentStep: 1, // 1: Passenger Info, 2: Seat Selection, 3: Payment, 4: Confirmation
  passenger: null,
  selectedSeats: [],
  seatPriceTotal: 0,
  paymentComplete: false,
  setStep: (step) => set({ currentStep: step }),
  setPassenger: (passenger) => set({ passenger, currentStep: 2 }),
  setSeats: (selectedSeats, seatPriceTotal) => set({ selectedSeats, seatPriceTotal, currentStep: 3 }),
  completePayment: () => set({ paymentComplete: true, currentStep: 4 }),
  resetBooking: () => set({ currentStep: 1, passenger: null, selectedSeats: [], seatPriceTotal: 0, paymentComplete: false }),
}));

export default useBookingWizardStore;
