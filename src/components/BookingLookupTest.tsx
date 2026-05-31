import React, { useEffect, useState } from 'react';
import useBookingStore from '../store/useBookingStore';

export const BookingLookupTest: React.FC = () => {
  const [result, setResult] = useState<unknown>(null);
  useEffect(() => {
    const booking = useBookingStore.getState().getBooking('OFDTIF69RBJJZIJ1OSMR', 'Newton');
    setResult(booking);
  }, []);

  return (
    <div role="region" style={{ padding: '1rem', background: '#111', color: '#0f0', fontFamily: 'monospace' }}>
      <h3>Booking Lookup Test</h3>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
};
