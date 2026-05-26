# Capstone Flight Booking System

A premium, modern flight booking web application built from scratch, synthesizing learnings from Tripma, TravelGrid, and Amadeus Django repositories.

## Features

- **Modern Architecture**: Vite + React 18, utilizing functional components and hooks.
- **Global State**: Managed via Zustand (`useBookingStore.js`), replacing scattered local state and Context API overhead.
- **Mock API**: Deterministic flight search logic simulating the Amadeus API (`flightService.js`).
- **Premium Styling**: Tailwind CSS with a custom dark theme, glassmorphism UI elements, and highly responsive layouts.
- **Checkout Flow**: 
  1. Search & Results
  2. Passenger Information
  3. Interactive Seat Selection
  4. Payment
  5. E-Ticket Confirmation / Boarding Pass

## Development

```bash
cd capstone-app

# Install dependencies
npm install

# Start the dev server
npm run dev

# Run unit tests
npm test
```

## Structure

- `/docs`: Architecture, Analysis, and Implementation plan documents.
- `/capstone-app`: Main application root.
  - `src/pages`: Individual step pages for the booking flow.
  - `src/store`: Zustand state management.
  - `src/services`: Flight search logic.
