import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BookingLookupTest } from '../../components/BookingLookupTest';
import type { BookingRecord } from '../../store/useBookingStore';

import { vi } from 'vitest';
vi.mock('../../store/useBookingStore', () => ({
  __esModule: true,
  default: {
    getState: () => ({
      getBooking: (pnr: string, lastName: string): BookingRecord | null => {
        if (pnr === 'OFDTIF69RBJJZIJ1OSMR' && lastName.toUpperCase() === 'NEWTON') {
          return {
            bookingReference: 'OFDTIF69RBJJZIJ1OSMR',
            passengerName: 'John Newton',
            email: 'newtonjenny07@gmail.com',
            trackingCode: 'MAT-TRACK-001',
            status: 'CHECKED IN',
          };
        }
        return null;
      },
    }),
  },
}));

test('BookingLookupTest displays booking data', async () => {
  render(<BookingLookupTest />);

  // The component sets state synchronously, but we wait for UI update
  await waitFor(() => {
    expect(screen.getByText(/Booking Lookup Test/i)).toBeInTheDocument();
  });

  const output = screen.getByRole('region');
  expect(output).toHaveTextContent('OFDTIF69RBJJZIJ1OSMR');
  expect(output).toHaveTextContent('John Newton');
});
