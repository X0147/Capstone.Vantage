import { describe, it, expect, beforeEach } from 'vitest';
import { useBookingStore } from './useBookingStore';

describe('useBookingStore', () => {
  beforeEach(() => {
    useBookingStore.getState().resetStore();
  });

  it('should initialize with default searchParams', () => {
    const state = useBookingStore.getState();
    expect(state.searchParams.adults).toBeUndefined(); // It's in passengers: { adults: 1 }
    expect(state.searchParams.passengers.adults).toBe(1);
  });

  it('should set search params', () => {
    useBookingStore.getState().setSearchParams({ from: 'JFK', to: 'LHR' });
    const state = useBookingStore.getState();
    expect(state.searchParams.from).toBe('JFK');
    expect(state.searchParams.to).toBe('LHR');
  });

  it('should select outbound flight', () => {
    const flight = { id: 'test-1' };
    useBookingStore.getState().selectOutbound(flight);
    const state = useBookingStore.getState();
    expect(state.selectedOutbound).toEqual(flight);
  });
});
