import React from 'react';
import { useBookingStore } from '../store/useBookingStore';
import { useNavigate } from 'react-router-dom';

export default function ConfirmationPage() {
  const navigate = useNavigate();
  const { bookingReference, selectedOutbound, passengers, selectedSeats, resetStore } =
    useBookingStore();

  const handleDone = () => {
    resetStore();
    navigate('/');
  };

  const handlePrint = () => {
    window.print();
  };

  if (!bookingReference) {
    return (
      <div className="text-center mt-20">
        No booking found.{' '}
        <button onClick={handleDone} className="text-brand-accent underline">
          Return Home
        </button>
      </div>
    );
  }

  const pass = passengers[0] || { firstName: '', lastName: '' };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="bg-white text-brand-dark p-8 rounded-2xl shadow-xl print:shadow-none print:p-0">
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h2 className="text-3xl font-bold text-brand-accent">Boarding Pass</h2>
          <div className="text-right">
            <div className="text-sm text-gray-500">Booking Reference</div>
            <div className="text-2xl font-mono font-bold tracking-widest">{bookingReference}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <div className="text-sm text-gray-500">Passenger</div>
            <div className="font-bold text-lg">
              {pass.firstName} {pass.lastName}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Flight</div>
            <div className="font-bold text-lg">
              {selectedOutbound?.airline?.name} ({selectedOutbound?.id.split('-')[3]})
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center bg-gray-100 p-6 rounded-xl mb-8">
          <div className="text-center">
            <div className="text-3xl font-bold">{selectedOutbound?.departure?.iata}</div>
            <div className="text-sm text-gray-500">
              {selectedOutbound?.departure?.time?.split('T')[1]?.substring(0, 5)}
            </div>
          </div>
          <div className="flex-1 px-8 text-center text-gray-400">
            <div className="border-t-2 border-dashed border-gray-300 relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-100 px-2 text-xs">
                {selectedOutbound?.duration}
              </span>
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">{selectedOutbound?.arrival?.iata}</div>
            <div className="text-sm text-gray-500">
              {selectedOutbound?.arrival?.time?.split('T')[1]?.substring(0, 5)}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-end border-t pt-6 mt-6">
          <div>
            <div className="text-sm text-gray-500">Seat</div>
            <div className="text-2xl font-bold text-brand-emerald">
              {selectedSeats?.outbound?.[0] || 'Unassigned'}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex gap-4 justify-center no-print">
        <button
          onClick={handlePrint}
          className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg"
        >
          Print Receipt
        </button>
        <button
          onClick={handleDone}
          className="bg-brand-accent hover:bg-brand-accent/80 text-white font-bold py-3 px-8 rounded-lg"
        >
          Done
        </button>
      </div>
    </div>
  );
}
