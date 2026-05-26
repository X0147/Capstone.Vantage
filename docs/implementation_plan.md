# Implementation Plan: Capstone Flight Booking System

**Goal**: Build a premium, modern flight booking web application from scratch, synthesizing learnings from Tripma, TravelGrid, and Amadeus Django repositories. The project will be created under `/Users/laurence/Project X (🦍)/flight/capstone-app`.

## User Review Required
> [!IMPORTANT]
> - **Workspace Cleanup**: Confirm that we may delete the pulled Tripma files and temporary repo directories after the new app is verified.
> - **State Management Choice**: We will use **Zustand** for global state. Agree?
> - **UI Component Library**: We will use `@headlessui/react` for accessible dropdowns. Confirm.

## Open Questions
> [!CAUTION]
> - Do you want to include unit testing with Vitest for all components or only core services?
> - Should we integrate any third‑party API (e.g., real flight data) now, or keep mock data?

## Proposed Changes
### Project Bootstrap
- **[NEW]** `capstone-app/` – Vite + React project scaffold.
- **[MODIFY]** `capstone-app/package.json` – Add dependencies: `react`, `react-dom`, `vite`, `zustand`, `react-router-dom`, `react-icons`, `react-hot-toast`, `@headlessui/react`, `tailwindcss`, `postcss`, `autoprefixer`.
- **[NEW]** `capstone-app/tailwind.config.cjs` – Tailwind configuration.
- **[NEW]** `capstone-app/postcss.config.cjs` – PostCSS config.
- **[NEW]** `capstone-app/src/` – Source directory with subfolders `components/`, `pages/`, `store/`, `services/`, `assets/`.

### Core Implementation
- **[NEW]** `src/store/useBookingStore.js` – Zustand store handling search criteria, flight results, passenger info, seat selection, and checkout flow.
- **[NEW]** `src/services/flightService.js` – Mock API returning deterministic flight data.
- **[NEW]** Reusable UI components: `AirportInput.jsx`, `DatePicker.jsx`, `PassengerCounter.jsx`, `FlightCard.jsx`, `FilterSidebar.jsx`, `SeatMap.jsx`, `PassengerForm.jsx`, `PaymentForm.jsx`, `ConfirmationScreen.jsx`.
- **[NEW]** Page routing via `react-router-dom` covering: Home, Results, Passenger Info, Seat Selection, Payment, Confirmation.

### Styling & Branding
- **[MODIFY]** `src/index.css` – Import Tailwind, set base theme (dark mode, vibrant palette).
- **[NEW]** `src/assets/logo.svg` – Custom logo.
- **[NEW]** Update HTML `<title>` and meta tags.

### Quality & Cleanup
- **[NEW]** `vitest.config.ts` – Vitest configuration.
- **[NEW]** Tests for `flightService` and `useBookingStore`.
- **[DELETE]** All boilerplate files from the original Tripma scaffold (e.g., `src/`, `public/`, `package.json` in root).
- **[DELETE]** `temp_repos/TravelGrid`, `temp_repos/amadeus-flight-booking-django` directories.

## Verification Plan
### Automated Tests
- Run `npm run test` (Vitest) inside `capstone-app` to ensure store and service logic works.
- Run `npm run lint` and `npm run build` to verify compilation.

### Manual Verification
- Perform end‑to‑end flow: search for flights → select flight → enter passenger details → choose seat → complete payment → view confirmation and print receipt.
- Test responsiveness on mobile and desktop breakpoints.
- Verify print layout hides navigation and shows receipt only.

---

*This plan is ready for execution pending your approval and answers to the open questions above.*
