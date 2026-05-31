import React, { ReactNode, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { telemetry } from '../utils/telemetryLogger';
import { useBookingStore } from '../store/useBookingStore';
import { ROUTE_MAP } from '../config/routes';

interface RouteGuardProps {
  children: ReactNode;
}

/**
 * Guard component that ensures a user cannot navigate to data‑dependent routes
 * (Trips, Boarding Pass) when the global booking profile (`bookingDetails`) is not
 * hydrated. If the guard blocks navigation it logs a warning and redirects the
 * user back to the hub (login / landing) route.
 */
const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const location = useLocation();
  const bookingDetails = useBookingStore(state => state.bookingDetails);

  // Define the set of paths that require a hydrated booking profile.
  const protectedPaths = [ROUTE_MAP.TRIPS, ROUTE_MAP.BOARDING_PASS];

  const isProtected = protectedPaths.includes(location.pathname);
  const shouldRedirect = isProtected && !bookingDetails;

  // Trigger telemetry warning exactly once when a redirection occurs.
  useEffect(() => {
    if (shouldRedirect) {
      telemetry.warn(
        'Route Guard interception due to unhydrated booking profile payload.',
        { attemptedPath: location.pathname }
      );
    }
  }, [shouldRedirect, location.pathname]);

  if (shouldRedirect) {
    // Redirect to the hub (root) path.
    return <Navigate to={ROUTE_MAP.HUB} replace />;
  }

  // If no guard needed, simply render the nested routes.
  return <>{children}</>;
};

export default RouteGuard;
