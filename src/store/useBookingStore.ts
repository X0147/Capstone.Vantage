import { telemetry } from '../utils/telemetryLogger';
import { create } from 'zustand';
import { mockJourney } from '../data/flightMocks';

export type PaymentType = 'CREDIT' | 'WALLET' | 'CASH_AT_COUNTER';

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
  seat?: string;
  baggage?: string;
  gate?: string;
  boardingTime?: string;
  // New payment fields
  paymentMethod: PaymentType;
  paymentStatus: 'SETTLED' | 'PENDING_COLLECTION';
  currencyReceipt: string;
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
  // Initialize payment fields
  paymentMethod: 'CASH_AT_COUNTER',
  paymentStatus: 'SETTLED',
  currencyReceipt: 'USD 4,250.00',
};



// Keeping your complex booking ecosystem completely typed

export interface FlightSelection {
  // Define as needed; placeholder for future flight selection data
}

export interface PassengerData {
  // Define passenger related data structure; placeholder
}

export interface SearchParams {
  [key: string]: unknown;
}

export interface BookingState {
  // --- Original Framework Slices ---
  flightSelections: FlightSelection[];
  passengerData: PassengerData[];
  seatMaps: Record<string, unknown>;
  selectedSeats: string[];
  searchParams: SearchParams | null;
  paymentDetails: Record<string, unknown> | null;

  // --- Extended Structural Slices ---
  bookingDetails: BookingRecord | null;
  currentStep: number;
  pastBookings: BookingRecord[];
  error: string | null;
  isLoading: boolean;

  // --- Consolidated Core Actions ---
  setSearchParams: (params: SearchParams) => void;
  setSelectedSeats: (seats: string[]) => void;
  setPassengerData: (data: PassengerData[]) => void;
  setPaymentDetails: (details: Record<string, unknown>) => void;

  setBookingDetails: (details: BookingRecord | null) => void;

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

  clearStore: () => set({ ...initialStoreState, bookingDetails: null }),

  // Enhanced auto-login action
  executeAutoLogin: () => {
    telemetry.info('Auto-login sequence fired. Enforcing credential structural match.');
    set({
      bookingDetails: hydratedRecord,
      error: null,
      isLoading: false,
      currentStep: 3
    });
  },

  // Complete check-in action
  completeCheckIn: (seat: string, baggageCount: number) => {
    const currentDetails = get().bookingDetails;
    if (!currentDetails) return;
    const updatedDetails = {
      ...currentDetails,
      status: 'BOARDING PASS ISSUED',
      seat,
      baggage: `${baggageCount} Checked Bags`,
      gate: 'B14',
      boardingTime: '13:15'
    };
    telemetry.info('Passenger check-in sequence validated and tokenized.', { seat, baggageCount });
    set({
      bookingDetails: updatedDetails,
      pastBookings: get().pastBookings.map(b =>
        b.bookingReference === currentDetails.bookingReference ? updatedDetails : b
      )
    });
  }
}));

export default useBookingStore;

// Debug: output initial store state
if (process.env.NODE_ENV === 'development') {
  console.log('🚀 Initial booking store state:', useBookingStore.getState());
}
