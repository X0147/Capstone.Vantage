# Deep Analysis: Reference Repositories

This document summarizes the analysis of the reference repositories (Tripma, TravelGrid, and Amadeus Django) to design our new Capstone Flight Booking System.

---

## 1. Repository Breakdown

### A. Tripma (Existing Root Template)
- **Role**: Serves as the UI style baseline.
- **Key UX Elements**:
  - Clean flight search inputs (origin, destination, dates, traveler counts).
  - Multi-page booking checkout sequence:
    1. Search & Results listing (`/`)
    2. Passenger Information (`/passenger-info`)
    3. Seat Selection (`/seat-selection`)
    4. Payment (`/payment`)
    5. Confirmation / E-ticket receipt (`/confirm`)
- **Key Architecture**: Uses standard CSS files and React-Router-DOM (v6).

### B. TravelGrid (MERN Application)
- **Role**: Inspiration for component structures, state reducers, and the interactive seat booking grid.
- **Key UX Elements**:
  - Card-based layouts with rich gradient styling and glassmorphism.
  - Interactive seat selector grid that updates selected seat arrays dynamically.
- **Key Architecture**: Tailwind CSS configuration, detailed grid alignment, state transitions.

### C. Amadeus Django (Python Backend API Integration)
- **Role**: Reference for flight data structures and calculation helper functions.
- **Key UI/API Logic**:
  - Standardized JSON responses for flight itineraries.
  - Calculates stop durations (`get_stoptime`) dynamically by subtracting individual segments from total travel duration.
  - Integrates carrier logo mapping via standardized CDN URLs: `https://s1.apideeplink.com/images/airlines/{CARRIER_CODE}.png`.

---

## 2. Key Synthesis Decisions

1. **State Store**: We will unify the multi-page checkout flow into a single Zustand store `useBookingStore.js` to replace scattered local state or standard Context providers.
2. **Unified Mock Services**: We will build `flightService.js` in JavaScript that replicates the Amadeus structure (outbound/return itineraries, stops, durations, prices) and TravelGrid's filterable fields.
3. **Tailwind Styling**: The new `capstone-app` will use Tailwind CSS with elegant typography and custom premium components, avoiding basic browser styling.
