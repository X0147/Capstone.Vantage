import { describe, it, expect } from 'vitest';
import { flightService } from './flightService';

describe('flightService', () => {
  it('should return mock outbound flights based on params', async () => {
    const params = { from: 'SFO', to: 'JFK', departDate: '2026-06-01' };
    const results = await flightService.searchFlights(params);

    expect(results.outbound).toBeDefined();
    expect(results.outbound.length).toBeGreaterThan(0);
    expect(results.outbound[0].departure.iata).toBe('SFO');
    expect(results.outbound[0].arrival.iata).toBe('JFK');
    expect(results.return).toBeNull();
  });

  it('should return return flights if returnDate is provided', async () => {
    const params = { from: 'SFO', to: 'JFK', departDate: '2026-06-01', returnDate: '2026-06-15' };
    const results = await flightService.searchFlights(params);

    expect(results.return).toBeDefined();
    expect(results.return.length).toBeGreaterThan(0);
    expect(results.return[0].departure.iata).toBe('JFK'); // Return is reversed
  });
});
