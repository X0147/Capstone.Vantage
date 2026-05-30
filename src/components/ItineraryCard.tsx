import React from 'react';
import { Plane } from 'lucide-react';

interface ItineraryCardProps {
  passenger: {
    itinerary: {
      departure: { iata: string; time: string };
      arrival: { iata: string; time: string };
      flightNumber: string;
      airline: string;
    };
    tier: string;
    milesBalance: number;
    passportNumber: string;
    tsaPreCheck: string;
    dietaryPreference: string;
    trackingId: string;
  };
}

export const ItineraryCard: React.FC<ItineraryCardProps> = ({ passenger }) => {
  const { itinerary, tier, milesBalance, passportNumber, tsaPreCheck, dietaryPreference } = passenger;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Left Column */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Upcoming Flight</h3>
        <div className="flex items-center space-x-2 text-white">
          <Plane className="w-5 h-5" />
          <span>{itinerary.departure.iata} → {itinerary.arrival.iata}</span>
        </div>
        <p className="text-sm text-vantage-muted">
          {new Date(itinerary.departure.time).toLocaleString()} – {new Date(itinerary.arrival.time).toLocaleString()}
        </p>
        <p className="text-sm text-vantage-muted">Flight {itinerary.flightNumber} • {itinerary.airline}</p>
      </div>
      {/* Right Column */}
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-white">Loyalty</h3>
        <p className="text-sm text-vantage-muted">Tier: <span className="font-bold text-vantage-accent">{tier}</span></p>
        <p className="text-sm text-vantage-muted">Miles Balance: <span className="font-mono text-vantage-accent">{milesBalance.toLocaleString()}</span></p>
        <h3 className="text-xl font-semibold text-white mt-4">Details</h3>
        <p className="text-sm text-vantage-muted"><strong>Passport:</strong> {passportNumber}</p>
        <p className="text-sm text-vantage-muted"><strong>TSA Pre‑Check:</strong> {tsaPreCheck}</p>
        <p className="text-sm text-vantage-muted"><strong>Dietary:</strong> {dietaryPreference}</p>
      </div>
    </div>
  );
};
