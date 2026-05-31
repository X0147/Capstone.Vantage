import React, { useEffect, useState } from 'react';
import { useBookingStore } from '@/store/useBookingStore';

/**
 * Demo component that looks up a booking by PNR and last name and displays the result.
 * Uses the store's `getBooking` selector.
 */
const BookingLookupDemo: React.FC = () => {
  const [booking, setBooking] = useState<null | any>(null);

  useEffect(() => {
    // Example values from the user request
    const result = useBookingStore
      .getState()
      .getBooking('OFDTIF69RBJJZIJ1OSMR', 'Newton');
    setBooking(result);
  }, []);

  if (!booking) {
    return <div data-testid="no-result">No booking found</div>;
  }

  return (
    <div data-testid="booking-result" style={{ padding: '1rem', background: '#111', color: '#fff', borderRadius: '8px' }}>
      <h3>Booking Lookup Result</h3>
      <pre>{JSON.stringify(booking, null, 2)}</pre>
    </div>
  );
};

export default BookingLookupDemo;
