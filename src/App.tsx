import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import { lazy, Suspense } from 'react';
import React from 'react';
import './skipLink.css';
import EnterpriseNavigationBar from './components/EnterpriseNavigationBar';
import ResultsSkeleton from './features/search/ResultsSkeleton';
import Breadcrumbs from './components/Breadcrumbs';

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
const TripsPage = lazy(() => import('./pages/TripsPage'));
const ProfileEditPage = lazy(() => import('./pages/ProfileEditPage'));
const TicketTrackingPage = lazy(() => import('./pages/TicketTrackingPage'));
const TrackTicketPage = lazy(() => import('./pages/TrackTicketPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const TeamPage = lazy(() => import('./pages/TeamPage'));
const FleetPage = lazy(() => import('./pages/FleetPage'));
const LoyaltyPage = lazy(() => import('./pages/LoyaltyPage'));
const DestinationsPage = lazy(() => import('./pages/DestinationsPage'));
const VipRegistrationPage = lazy(() => import('./pages/VipRegistrationPage'));


function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <AppShell />
        <Toaster position="top-right" />
      </Router>
    </I18nextProvider>
  );
}

function AppShell() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-dark text-white font-sans antialiased relative">
      {/* Skip-to-content link for keyboard / screen-reader users */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      {/* Global Cinematic Background */}
      <div 
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-20 pointer-events-none z-0 mix-blend-screen"
        style={{ backgroundImage: `url(${import.meta.env.BASE_URL || '/'}images/18_earth.jpg)` }}
      />
      <div className="fixed inset-0 bg-gradient-to-b from-brand-dark/40 via-transparent to-brand-dark/80 pointer-events-none z-0" />

      <div className="relative z-10 flex flex-col min-h-screen">
        <EnterpriseNavigationBar />
        <Breadcrumbs />

        <main id="main-content" tabIndex={-1} className="flex-1 container mx-auto p-4">
          <Suspense
            fallback={
              <div className="p-6">
                <ResultsSkeleton />
              </div>
            }
          >
            <AnimatedRoutes />
          </Suspense>
        </main>
      </div>
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<SearchPage />} />
        <Route path="/team" element={
          <Suspense fallback={<ResultsSkeleton />}>
            <TeamPage />
          </Suspense>
        } />
        <Route path="/fleet" element={
          <Suspense fallback={<ResultsSkeleton />}>
            <FleetPage />
          </Suspense>
        } />
        <Route path="/loyalty" element={
          <Suspense fallback={<ResultsSkeleton />}>
            <LoyaltyPage />
          </Suspense>
        } />
        <Route path="/destinations" element={
          <Suspense fallback={<ResultsSkeleton />}>
            <DestinationsPage />
          </Suspense>
        } />
        <Route path="/vip-register" element={
          <Suspense fallback={<ResultsSkeleton />}>
            <VipRegistrationPage />
          </Suspense>
        } />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/search-results" element={<ResultsPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/passenger-info" element={<PassengerPage />} />
        <Route path="/seat-selection" element={<SeatSelectionPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route
          path="/tracker"
          element={
            <Suspense fallback={<ResultsSkeleton />}>
              <FlightTrackerPage />
            </Suspense>
          }
        />
        <Route
          path="/manage-booking"
          element={
            <Suspense fallback={<ResultsSkeleton />}>
              <ManageBookingPage />
            </Suspense>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Suspense fallback={<ResultsSkeleton />}>
              <DashboardPage />
            </Suspense>
          }
        />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route
          path="/trips"
          element={
            <Suspense fallback={<ResultsSkeleton />}>
              <TripsPage />
            </Suspense>
          }
        />
        <Route
          path="/profile/edit"
          element={
            <Suspense fallback={<ResultsSkeleton />}>
              <ProfileEditPage />
            </Suspense>
          }
        />
        <Route
          path="/tickets"
          element={
            <Suspense fallback={<ResultsSkeleton />}>
              <TicketTrackingPage />
            </Suspense>
          }
        />
        <Route
          path="/track"
          element={
            <Suspense fallback={<ResultsSkeleton />}>
              <TrackTicketPage />
            </Suspense>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
