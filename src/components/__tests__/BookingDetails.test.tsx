import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import BookingDetails from '../../components/BookingDetails';

const sampleProps = {
  passengerName: 'Alice',
  bookingReference: 'XYZ789',
  bookingStatus: 'Confirmed',
  bookingDate: '2024-10-01',
  checkInStatus: 'Checked‑in',
  email: 'alice@example.com',
  password: 'secret123',
};

test('renders booking details and shows hashed password', async () => {
  render(<BookingDetails {...sampleProps} />);

  // Verify static fields are rendered
  expect(screen.getByText(sampleProps.passengerName)).toBeInTheDocument();
  expect(screen.getByText(sampleProps.bookingReference)).toBeInTheDocument();
  expect(screen.getByText(sampleProps.bookingStatus)).toBeInTheDocument();
  expect(screen.getByText(sampleProps.bookingDate)).toBeInTheDocument();
  expect(screen.getByText(sampleProps.checkInStatus)).toBeInTheDocument();
  expect(screen.getByText(sampleProps.email)).toBeInTheDocument();

  // Wait for the hashed password (sha256) to appear
  await waitFor(() => {
    const hashed = screen.getByText(/^[a-f0-9]{64}$/i);
    expect(hashed).toBeInTheDocument();
  });
});
