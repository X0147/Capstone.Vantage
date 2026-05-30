import { create } from 'zustand';
import { mockJourney } from '../data/flightMocks';

export interface FlightSegment {
  origin: string;
  destination: string;
  departureDate: string;
  arrivalDate: string;
  carrier: string;
  flightNumber: string;
}

export interface BookingRecord {
  passengerName: string;
  email: string;
  trackingCode: string;
  bookingReference: string;
  status: string;
  route: FlightSegment;
}

// Hydrate a BookingRecord from mockJourney, mapping pnr -> bookingReference
const hydratedRecord: BookingRecord = {
  passengerName: mockJourney.passengerName,
  email: mockJourney.contactEmail,
  trackingCode: mockJourney.trackingCode,
  bookingReference: mockJourney.pnr,
  status: mockJourney.checkInStatus,
  route: {
    origin: mockJourney.legs[0]?.departure?.iata ?? 'JIB',
    destination: mockJourney.legs[mockJourney.legs.length - 1]?.arrival?.iata ?? 'ORD',
    departureDate: mockJourney.legs[0]?.departure?.date ?? '01-06-26',
    arrivalDate: mockJourney.legs[mockJourney.legs.length - 1]?.arrival?.date ?? '02-06-26',
    carrier: mockJourney.legs[0]?.carrier ?? 'Turkish Airlines',
    flightNumber: mockJourney.legs.map(l => l.flightNumber).join(' / '),
  },
};



// Keeping your complex booking ecosystem completely typed
export interface BookingState {
  // --- Original Framework Slices ---
  flightSelections: any[];
  passengerData: any[];
  seatMaps: Record<string, any>;
  selectedSeats: string[];
  searchParams: Record<string, any> | null;
  paymentDetails: Record<string, any> | null;

  // --- Extended Structural Slices ---
  bookingDetails: BookingRecord | null;
  currentStep: number;
  pastBookings: BookingRecord[];
  error: string | null;
  isLoading: boolean;

  // --- Consolidated Core Actions ---
  setSearchParams: (params: Record<string, any>) => void;
  setSelectedSeats: (seats: string[]) => void;
  setPassengerData: (data: any[]) => void;
  setPaymentDetails: (details: Record<string, any>) => void;

  setBookingDetails: (details: BookingRecord | null) => void;
  setStep: (step: number) => void;
  getBooking: (pnr: string, lastName: string) => BookingRecord | null;
  clearStore: () => void;
}

// ==========================================
// 2. UNIFIED INITIAL STATE BALANCES
// ==========================================
const initialStoreState = {
  flightSelections: [],
  passengerData: [],
  seatMaps: {},
  selectedSeats: [],
  searchParams: null,
  paymentDetails: null,

  bookingDetails: hydratedRecord,
  currentStep: 1,
  pastBookings: [],
  error: null,
  isLoading: false,
};

// ==========================================
// 3. SECURE ZUSTAND STORE IMPLEMENTATION
// ==========================================
export const useBookingStore = create<BookingState>((set, get) => ({
  ...initialStoreState,

  // --- Action Implementations (Declared Exactly Once) ---
  setSearchParams: (params) => set({ searchParams: params }),

  setSelectedSeats: (seats) => set({ selectedSeats: seats }),

  setPassengerData: (data) => set({ passengerData: data }),

  setPaymentDetails: (details) => set({ paymentDetails: details }),

  setBookingDetails: (details) => set({ bookingDetails: details }),

  setStep: (step) => set({ currentStep: step }),

  getBooking: (pnr: string, lastName: string): BookingRecord | null => {
    const cleanPNR = pnr.trim().toUpperCase();
    const cleanName = lastName.trim().toUpperCase();

    const found = get().pastBookings?.find((b: BookingRecord) => {
      return (
        b.bookingReference.toUpperCase() === cleanPNR &&
        b.passengerName.toUpperCase().includes(cleanName)
      );
    });

    return found ?? null;
  },

  clearStore: () => set({ ...initialStoreState }),
}));

export default useBookingStore;

// Debug: output initial store state
if (process.env.NODE_ENV === 'development') {
  console.log('🚀 Initial booking store state:', useBookingStore.getState());
}
