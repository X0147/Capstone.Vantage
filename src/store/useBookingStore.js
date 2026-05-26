import { create } from 'zustand';
import { flightService } from '../services/flightService';

export const useBookingStore = create((set, get) => ({
  // 1. Search Parameters
  searchParams: {
    from: '',
    to: '',
    departDate: '',
    returnDate: '',
    passengers: { adults: 1, children: 0 }
  },
  setSearchParams: (params) => set((state) => ({ 
    searchParams: { ...state.searchParams, ...params } 
  })),

  // 2. Flight Options & Selections
  flightsOutbound: [],
  flightsReturn: [],
  selectedOutbound: null,
  selectedReturn: null,
  isSearching: false,
  
  searchFlights: async () => {
    set({ isSearching: true });
    try {
      const { searchParams } = get();
      const results = await flightService.searchFlights(searchParams);
      set({ 
        flightsOutbound: results.outbound, 
        flightsReturn: results.return || [],
        selectedOutbound: null,
        selectedReturn: null
      });
    } catch (error) {
      console.error("Flight search failed", error);
    } finally {
      set({ isSearching: false });
    }
  },

  selectOutbound: (flight) => set({ selectedOutbound: flight }),
  selectReturn: (flight) => set({ selectedReturn: flight }),

  // 3. Booking Sequence Data
  passengers: [], // [{ firstName, lastName, email, phone }]
  setPassengers: (passengers) => set({ passengers }),

  selectedSeats: { outbound: [], return: [] },
  setSelectedSeats: (type, seats) => set((state) => ({
    selectedSeats: { ...state.selectedSeats, [type]: seats }
  })),

  payment: null,
  setPayment: (payment) => set({ payment }),

  // 4. Checkout Metadata
  bookingReference: null,
  bookingConfirmed: false,
  
  confirmBooking: async () => {
    // Simulate API checkout
    await new Promise(resolve => setTimeout(resolve, 1000));
    const ref = Math.random().toString(36).substring(2, 8).toUpperCase();
    set({ bookingConfirmed: true, bookingReference: ref });
  },

  resetStore: () => set({
    searchParams: { from: '', to: '', departDate: '', returnDate: '', passengers: { adults: 1, children: 0 } },
    flightsOutbound: [],
    flightsReturn: [],
    selectedOutbound: null,
    selectedReturn: null,
    passengers: [],
    selectedSeats: { outbound: [], return: [] },
    payment: null,
    bookingReference: null,
    bookingConfirmed: false
  })
}));
