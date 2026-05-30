import { z } from 'zod';
import type { TicketDetails } from '../store/useBookingStore';

// Define the request schema
export const TrackingRequestSchema = z.object({
  pnr: z.string().min(5).max(10),
  lastName: z.string().min(2),
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  email: z.string().email(),
});

export type TrackingRequest = z.infer<typeof TrackingRequestSchema>;

// Mock data
const mockTicket: TicketDetails = {
  pnr: 'VNTG6K',
  lastName: 'Laurence',
  flightNumber: 'VW-402',
  origin: 'LOS',
  destination: 'DXB',
  departureTime: '2026-06-15T14:30:00Z',
  arrivalTime: '2026-06-15T22:30:00Z',
  status: 'ON_TIME',
  seat: '12A',
  passengerName: 'Laurence TechLead',
  passengerFirstName: 'Laurence',
  passengerLastName: 'TechLead',
  cabin: 'First Class',
  gate: 'A1',
  terminal: 'Terminal 3',
};

/**
 * Validates request data and simulates an API lookup for flight tracking.
 */
export async function trackTicket(request: TrackingRequest): Promise<TicketDetails | null> {
  // Validate request
  TrackingRequestSchema.parse(request);

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Mock lookup logic
  if (
    request.pnr.toUpperCase() === 'VNTG6K' &&
    request.lastName.toLowerCase() === 'laurence' &&
    request.email.toLowerCase() === 'newtonjenny07@gmail.com'
  ) {
    return mockTicket;
  }

  // The user knowledge mentioned: 
  // Passenger: Jennifer Natalie Newton (newtonjenny07@gmail.com).
  // Booking Reference: OFDTIF69RBJJZIJ1OSMR
  // Wait, let's also support the user's mock data!
  if (
    request.pnr.toUpperCase() === 'OFDTIF69RBJJZIJ1OSMR' &&
    request.lastName.toLowerCase() === 'newton' &&
    request.email.toLowerCase() === 'newtonjenny07@gmail.com'
  ) {
    return {
      ...mockTicket,
      pnr: 'OFDTIF69RBJJZIJ1OSMR',
      lastName: 'Newton',
      passengerName: 'Jennifer Natalie Newton',
      passengerFirstName: 'Jennifer',
      passengerLastName: 'Newton',
    };
  }

  throw new Error('No active reservation found matching those credentials.');
}
