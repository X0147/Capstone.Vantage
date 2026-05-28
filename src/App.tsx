import { BrowserRouter as Router, Routes, Route, useLocation, useInRouterContext } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import { lazy, Suspense } from 'react';
import { ResultsSkeleton } from './features/search/ResultsSkeleton';
import EnterpriseNavigationBar from './components/EnterpriseNavigationBar';

// Code-split route-level bundles
const SearchPage = lazy(() => import('./pages/SearchPage'));
const ResultsPage = lazy(() => import('./pages/ResultsPage'));
const PassengerPage = lazy(() => import('./pages/PassengerPage'));
const SeatSelectionPage = lazy(() => import('./pages/SeatSelectionPage'));
const PaymentPage = lazy(() => import('./pages/PaymentPage'));
const ConfirmationPage = lazy(() => import('./pages/ConfirmationPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const FlightTrackerPage = lazy(() => import('./pages/FlightTrackerPage'));
const ManageBookingPage = lazy(() => import('./pages/ManageBookingPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));

export function App() {
  // If the app is served from a subpath (GitHub Pages project site), set the router basename
  const basename =
    typeof window !== 'undefined' && window.location.pathname.startsWith('/Capstone.Vantage')
      ? '/Capstone.Vantage'
      : '/';

  if (useInRouterContext()) {
    return <AppShell />;
  }

  return (
    <Router basename={basename}>
      <AppShell />
      <Toaster position="top-right" />
    </Router>
  );
}

function AppShell() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-dark text-white font-sans antialiased">
      <EnterpriseNavigationBar />

      <main className="flex-1 container mx-auto p-4">
        <Suspense fallback={<div className="p-6"><ResultsSkeleton /></div>}>
          <AnimatedRoutes />
        </Suspense>
      </main>
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<SearchPage />} />
        <Route path="/search-results" element={<ResultsPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/passenger-info" element={<PassengerPage />} />
        <Route path="/seat-selection" element={<SeatSelectionPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/tracker" element={<Suspense fallback={<ResultsSkeleton />}><FlightTrackerPage /></Suspense>} />
        <Route path="/manage-booking" element={<Suspense fallback={<ResultsSkeleton />}><ManageBookingPage /></Suspense>} />
        <Route path="/dashboard" element={<Suspense fallback={<ResultsSkeleton />}><DashboardPage /></Suspense>} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
