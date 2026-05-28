import React from 'react';
import { Plane } from 'lucide-react';

export default function TripsPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-xl px-sm py-md">
      <div className="space-y-4">
        <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2">
          <Plane className="h-8 w-8 text-vantage-accent" />
          Your Trips
        </h1>
        <p className="text-vantage-muted">
          View your upcoming and past itineraries here.
        </p>
        
        <div className="premium-glass rounded-3xl border border-white/5 p-md flex flex-col justify-center items-center h-64 text-center">
          <Plane className="h-12 w-12 text-vantage-muted mb-4 opacity-50" />
          <h2 className="text-xl font-bold text-white mb-2">No active trips found</h2>
          <p className="text-sm text-vantage-muted max-w-md">
            You don't have any upcoming flights in your locator ledger. Head back to the search matrix to book a new itinerary.
          </p>
        </div>
      </div>
    </div>
  );
}
