// Centralized routing contract for the application

export const Routes = {
  HUB: '/',
  TRIPS: '/trips',
  BOARDING_PASS: '/boarding-pass',
} as const;

export type RouteKey = keyof typeof Routes;

// Export a frozen object to guarantee immutability at runtime
export const ROUTE_MAP = Object.freeze({
  HUB: Routes.HUB,
  TRIPS: Routes.TRIPS,
  BOARDING_PASS: Routes.BOARDING_PASS,
});
