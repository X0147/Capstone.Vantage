import React from 'react';
import { ClipboardCopy, CheckCircle2 } from 'lucide-react';

interface TravelInfoProps {
  passengerName: string;
  email: string;
  bookingReference: string;
  status: string;
  bookingStatus: string;
  departure: string; // e.g., 'JIB'
  arrival: string; // e.g., 'ORD'
  departureDate: string; // ISO date string
  arrivalDate: string; // ISO date string
  trackingCode: string;
}

/**
 * Enterprise‑grade card displaying a travel itinerary.
 * Uses the project's premium‑glass design system for a glassmorphism look.
 */
export const TravelInfoCard: React.FC<TravelInfoCardProps> = ({
  passengerName,
  email,
  bookingReference,
  bookingStatus,
  departure,
  arrival,
  departureDate,
  arrivalDate,
}) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(bookingReference);
      // optional UI feedback could be added later
    } catch (e) {
      console.error('Copy failed', e);
    }
  };

  return (
    <div className="premium-glass rounded-2xl border border-white/5 p-lg space-y-sm">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-white">Travel Itinerary</h2>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs text-vantage-accent hover:underline"
        >
          <ClipboardCopy className="w-3 h-3" /> Copy Ref
        </button>
      </div>
      <p className="text-sm text-vantage-muted">{passengerName} &lt;{email}&gt;</p>
      <div className="grid grid-cols-2 gap-xs text-xs text-white">
        <div>
          <span className="font-mono text-vantage-accent">{bookingReference}</span>
        </div>
        <div className="text-right">
          <span className="uppercase">{status}</span>
        </div>
        <div>
          <strong>{departure}</strong> → <strong>{arrival}</strong>
        </div>
        <div className="text-right">
          {departureDate} – {arrivalDate}
        </div>
      </div>
      <p className="text-xs text-vantage-muted mt-2">
        You can print your ticket at the airport kiosk or via the "Print" button in the email you receive.
        To reschedule, simply reply to the booking confirmation email.
      </p>
      <div className="flex justify-end">
        <button className="flex items-center gap-1 text-xs text-vantage-accent hover:underline">
          <CheckCircle2 className="w-3 h-3" /> Print Ticket
        </button>
      </div>
    </div>
  );
};
