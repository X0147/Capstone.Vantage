import React from 'react';
import BookingDetails from '../components/BookingDetails';

/**
 * Page component for booking details route.
 * It simply forwards all required props (you may later fetch them from URL params).
 */
const BookingDetailsPage: React.FC = () => {
  // Placeholder props; replace with real data from router/query params as needed.
  const sampleProps = {
    passengerName: 'John Doe',
    bookingReference: 'ABC123',
    bookingStatus: 'Confirmed',
    bookingDate: '2024-09-15',
    checkInStatus: 'Checked‑in',
    email: 'john.doe@example.com',
    password: 'secret', // will be hashed inside the component
  };

  return <BookingDetails {...sampleProps} />;
};

export default BookingDetailsPage;
