import React, { useState } from 'react';
import { sha256 } from 'js-sha256';

interface BookingDetailsProps {
  passengerName: string;
  bookingReference: string;
  bookingStatus: string;
  bookingDate: string;
  checkInStatus: string;
  email: string;
  password: string; // plain password provided by user (will be hashed before any storage)
}

/**
 * Displays a summary of a flight booking and provides a simple password hashing utility.
 * The hashed password can be sent to a backend API; it is never stored in plain text.
 */
const BookingDetails: React.FC<BookingDetailsProps> = ({
  passengerName,
  bookingReference,
  bookingStatus,
  bookingDate,
  checkInStatus,
  email,
  password,
}) => {
  const [hashedPassword, setHashedPassword] = useState<string>('');

  // Hash the password on component mount (or when password changes)
  React.useEffect(() => {
    const hash = sha256(password);
    setHashedPassword(hash);
  }, [password]);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Booking Details</h2>
      <dl className="grid grid-cols-2 gap-4">
        <div>
          <dt className="text-sm text-gray-400">Passenger</dt>
          <dd className="text-lg">{passengerName}</dd>
        </div>
        <div>
          <dt className="text-sm text-gray-400">Reference</dt>
          <dd className="text-lg">{bookingReference}</dd>
        </div>
        <div>
          <dt className="text-sm text-gray-400">Status</dt>
          <dd className="text-lg">{bookingStatus}</dd>
        </div>
        <div>
          <dt className="text-sm text-gray-400">Booking Date</dt>
          <dd className="text-lg">{bookingDate}</dd>
        </div>
        <div>
          <dt className="text-sm text-gray-400">Check‑in</dt>
          <dd className="text-lg">{checkInStatus}</dd>
        </div>
        <div>
          <dt className="text-sm text-gray-400">Email</dt>
          <dd className="text-lg"><a href={`mailto:${email}`} className="underline hover:text-indigo-300">{email}</a></dd>
        </div>
        <div className="col-span-2">
          <dt className="text-sm text-gray-400">Password (hashed)</dt>
          <dd className="text-sm break-all mt-1 bg-gray-800 p-2 rounded">{hashedPassword || 'Hashing…'}</dd>
        </div>
      </dl>
    </div>
  );
};

export default BookingDetails;
