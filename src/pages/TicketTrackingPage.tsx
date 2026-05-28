import React from 'react';
import { Ticket } from 'lucide-react';

export default function TicketTrackingPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-xl px-sm py-md">
      <div className="space-y-4">
        <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2">
          <Ticket className="h-8 w-8 text-vantage-accent" />
          Smart Tickets
        </h1>
        <p className="text-vantage-muted">
          Access your cryptographic ticket ledger and boarding passes.
        </p>

        <div className="premium-glass rounded-3xl border border-white/5 p-md flex flex-col justify-center items-center h-64 text-center">
          <Ticket className="h-12 w-12 text-vantage-muted mb-4 opacity-50" />
          <h2 className="text-xl font-bold text-white mb-2">Ledger Empty</h2>
          <p className="text-sm text-vantage-muted max-w-md">
            No smart tickets have been issued to your current identifier. Retrieve a booking using
            your PNR to generate a boarding pass.
          </p>
        </div>
      </div>
    </div>
  );
}
