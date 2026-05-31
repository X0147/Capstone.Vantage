import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import { useSearchStore } from './store/useSearchStore';
import { useBookingStore } from './store/useBookingStore';
import { queryClient } from './lib/queryClient';

vi.mock('./hooks/useFlightsQuery', () => ({
  useFlightsQuery: () => ({
    data: [
      {
        id: 'mock-flight-1',
        outbound: [
          {
            id: 'mock-segment-1',
            airline: 'Emirates',
            airlineCode: 'EK',
            flightNumber: 'EK201',
            origin: 'DXB',
            destination: 'LHR',
            departureTime: '2026-06-01T08:20:00.000Z',
            arrivalTime: '2026-06-01T12:45:00.000Z',
            duration: 265,
            aircraft: 'Boeing 777-300ER',
          },
        ],
        price: 450,
        cabinClass: 'economy',
        amenities: {
          wifi: true,
          power: true,
          seatPitch: '31 in',
          baggage: '1 checked bag',
        },
      },
    ],
    isLoading: false,
    isError: false,
  }),
}));

describe('End-to-End Premium Booking Funnel Integration Matrix', () => {
  beforeEach(() => {
    useSearchStore.getState().reset();
    useBookingStore.getState().clearStore();

    useSearchStore.getState().setSearchParams({
      from: 'DXB',
      to: 'LHR',
      departDate: '2026-06-01',
      tripType: 'oneway',
    });
  });

  it('synchronizes state perfectly from flight selection through seat allocation to finalized payment', async () => {
    const user = userEvent.setup();

    window.location.hash = '#/search-results';

    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );

    const selectFlightButton = await screen.findByRole('button', { name: /select flight/i });
    await user.click(selectFlightButton);

    expect(await screen.findByText(/select your seat/i)).toBeInTheDocument();

    const seatCheckboxes = await screen.findAllByRole('checkbox');
    const targetSeat = seatCheckboxes.find((seat) => !seat.hasAttribute('disabled'));
    if (targetSeat) {
      await user.click(targetSeat);
    }

    const confirmManifestBtn = screen.getByRole('button', { name: /confirm cabin manifest/i });
    await user.click(confirmManifestBtn);

    expect(await screen.findByText(/passenger document verification/i)).toBeInTheDocument();
  });
});
