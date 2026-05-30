import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useBookingStore } from './useBookingStore';
import * as trackService from '../services/trackService';

// Mock the trackService
vi.mock('../services/trackService', () => ({
  trackTicket: vi.fn(),
}));

describe('useBookingStore', () => {
  beforeEach(() => {
    // Reset state before each test
    useBookingStore.setState({
      trackedTicket: null,
      trackError: null,
    });
    vi.clearAllMocks();
  });

  it('lookupTicket should set trackedTicket on success', async () => {
    const mockTicket = {
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

    vi.mocked(trackService.trackTicket).mockResolvedValueOnce(mockTicket);

    const success = await useBookingStore.getState().lookupTicket('VNTG6K', 'Laurence', 'test@test.com');
    
    expect(success).toBe(true);
    expect(useBookingStore.getState().trackedTicket).toEqual(mockTicket);
    expect(useBookingStore.getState().trackError).toBeNull();
  });

  it('lookupTicket should set trackError on failure', async () => {
    vi.mocked(trackService.trackTicket).mockRejectedValueOnce(new Error('No active reservation found.'));

    const success = await useBookingStore.getState().lookupTicket('INVALID', 'Name', 'test@test.com');
    
    expect(success).toBe(false);
    expect(useBookingStore.getState().trackedTicket).toBeNull();
    expect(useBookingStore.getState().trackError).toBe('No active reservation found.');
  });

  it('clearTrackedTicket should reset state', () => {
    useBookingStore.setState({
      trackedTicket: { pnr: '123' } as any,
      trackError: 'Some error',
    });

    useBookingStore.getState().clearTrackedTicket();

    expect(useBookingStore.getState().trackedTicket).toBeNull();
    expect(useBookingStore.getState().trackError).toBeNull();
  });
});
