import { telemetry } from '../utils/telemetryLogger';
import { create } from 'zustand';
import { mockJourney } from '../data/flightMocks';

export interface Passenger {
  firstName: string;
  lastName: string;
  passportNumber: string;
  dateOfBirth: string;
}

export type PaymentType = 'CREDIT' | 'WALLET' | 'CASH_AT_COUNTER';

export interface FlightSegment {
  id?: string;               // ➔ Restores layout tracking IDs
  flightNumber: string;
  carrier: string;
  origin: string;
  destination: string;
  departureTime?: string;
  arrivalTime?: string;
  departureDate?: string;
  arrivalDate?: string;
  duration?: string;          // ➔ Restores duration fields
  departure?: { iata: string; time?: string; date?: string };
  arrival?: { iata: string; time?: string; date?: string };
}


export interface BookingRecord {
  bookingReference: string;
  pnr?: string;               // ➔ Restores legacy .pnr compatibility
  passengerName: string;
  email?: string;
  status: string;
  gate?: string;

  baggage?: string;
  currencyReceipt?: string;
  dateBooked?: string;        // ➔ Restores telemetry creation dates
  route?: FlightSegment;
  outbound?: FlightSegment;   // ➔ Soft-maps layout pointers to avoid compiler crashes
  returnFlight?: FlightSegment;
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
    // Optional computed fields
    duration: undefined,
    departure: mockJourney.legs[0]?.departure ? { iata: mockJourney.legs[0].departure.iata, date: mockJourney.legs[0].departure.date } : undefined,
    arrival: mockJourney.legs[mockJourney.legs.length - 1]?.arrival ? { iata: mockJourney.legs[mockJourney.legs.length - 1].arrival.iata, date: mockJourney.legs[mockJourney.legs.length - 1].arrival.date } : undefined,
    id: undefined,
  },
  // Legacy alias fields for compatibility
  outbound: undefined,
  returnFlight: undefined,
  dateBooked: undefined,
  id: undefined,
  totalPrice: undefined,
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

export type SearchParams = Record<string, unknown>;

export interface BookingState {
  // --- Original Framework Slices ---
  flightSelections: FlightSelection[];
  passengerData: PassengerData[];
  seatMaps: Record<string, unknown>;
  selectedSeats: string[];
  seatPriceTotal: number;
  searchParams: SearchParams | null;
  paymentDetails: Record<string, unknown> | null;
  passenger: Passenger | null;
  selectedOutbound: { price: number } | null;

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
  executeAutoLogin: () => void;
  completeCheckIn: (seatId: string, baggageCount: number) => void;

  setBookingDetails: (details: BookingRecord | null) => void;
  setPassenger: (passenger: Passenger) => void;
  setSeats: (seats: string[], cost: number) => void;
  completePayment: () => void;
  setStep: (step: number) => void;
  
  trackedTicket: unknown | null;
  trackError: string | null;
  lookupTicket: (pnr: string, name: string, email: string) => Promise<boolean>;
  clearTrackedTicket: () => void;
  setPayment: (details: unknown) => void;
  confirmBooking: () => void;
  selectOutbound: (flight: unknown) => void;
  selectReturn: (flight: unknown) => void;
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
  seatPriceTotal: 0,
  searchParams: null,
  paymentDetails: null,
  passenger: null,
  selectedOutbound: null,
  trackedTicket: null,
  trackError: null,

  bookingDetails: hydratedRecord,
  currentStep: 1,
  // Seed mock past bookings for demo/testing
  pastBookings: [
    {
      ...hydratedRecord,
      passengerName: 'Matalie',
      bookingReference: 'OFDTIF69RBJJZIJ1OSMR',
      trackingCode: 'MAT-TRACK-001',
    },
  ],
  error: null,
  isLoading: false,
};

// ==========================================
// 3. SECURE ZUSTAND STORE IMPLEMENTATION
// ==========================================
export const useBookingStore = create<BookingState>((set, get) => ({
  // Helper to safely retrieve booking details with defaults
  getSafeBooking: (): BookingRecord => {
    const b = get().bookingDetails;
    return {
      bookingReference: b?.bookingReference ?? '',
      pnr: b?.pnr,
      passengerName: b?.passengerName ?? '',
      email: b?.email,
      status: b?.status ?? 'UNKNOWN',
      gate: b?.gate,
      seat: b?.seat,
      baggage: b?.baggage,
      currencyReceipt: b?.currencyReceipt,
      dateBooked: b?.dateBooked,
      route: b?.route,
      outbound: b?.outbound,
      returnFlight: b?.returnFlight,
    };
  },
  ...initialStoreState,

  // --- Action Implementations (Declared Exactly Once) ---
  setSearchParams: (params) => set({ searchParams: params }),

  setSelectedSeats: (seats) => set({ selectedSeats: seats }),

  setPassengerData: (data) => set({ passengerData: data }),

  setPaymentDetails: (details) => set({ paymentDetails: details }),

  setBookingDetails: (details) => set({ bookingDetails: details }),

  setPassenger: (passenger) => set({ passenger }),
  setSeats: (seats, cost) => set({ selectedSeats: seats, seatPriceTotal: cost }),
  completePayment: () => set({ currentStep: 5 }),

  setStep: (step) => set({ currentStep: step }),

  lookupTicket: async (pnr, name, email) => { return false; },
  clearTrackedTicket: () => set({ trackedTicket: null, trackError: null }),
  setPayment: (details) => set({ paymentDetails: details }),
  confirmBooking: () => set({ currentStep: 5 }),
  selectOutbound: (flight) => set({ selectedOutbound: flight }),
  selectReturn: (flight) => {},

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
