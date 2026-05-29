import React from 'react';
import { useSearchParams } from 'react-router-dom';
import BookingDetails from '../components/BookingDetails';

/**
 * Page component for booking details route.
 * It simply forwards all required props (you may later fetch them from URL params).
 */
const BookingDetailsPage: React.FC = () => {
    const [searchParams] = useSearchParams();
  const sampleProps = {
    passengerName: searchParams.get('passengerName') ?? 'John Doe',
    bookingReference: searchParams.get('bookingReference') ?? 'ABC123',
    bookingStatus: searchParams.get('bookingStatus') ?? 'Confirmed',
    bookingDate: searchParams.get('bookingDate') ?? '2024-09-15',
    checkInStatus: searchParams.get('checkInStatus') ?? 'Checked‑in',
    email: searchParams.get('email') ?? 'john.doe@example.com',
    password: searchParams.get('password') ?? 'secret', // will be hashed inside the component
  };
  return <BookingDetails {...sampleProps} />;
};

export default BookingDetailsPage;
