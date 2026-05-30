// src/pages/NataliePage.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Plane } from 'lucide-react';
import './NataliePage.module.css';

// Hardcoded passenger data for Natalie (could be fetched from store/API).
const passenger = {
  fullName: 'Jennifer Natalie Newton',
  trackingId: 'AX7890ZKLMNPQRT',
  itinerary: {
    departure: { iata: 'JIB', time: '2026-06-01T08:30:00Z' },
    arrival: { iata: 'ORD', time: '2026-06-01T14:45:00Z' },
    flightNumber: 'EK201',
    airline: 'Emirates',
  },
  milesBalance: 12500,
  tier: 'Gold',
  passportNumber: 'N12345678',
  tsaPreCheck: 'Yes',
  dietaryPreference: 'Vegetarian (VGML)',
};

export const NataliePage: React.FC = () => {
  return (
    <motion.div
      className="natalie-page container mx-auto p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      {/* Background */}
      <div className="background" />

      {/* Card */}
      <div className="premium-glass rounded-3xl border border-white/10 p-8 shadow-xl relative z-10">
        <div className="flex items-center space-x-4 mb-6">
          <Lock className="w-8 h-8 text-vantage-accent" />
          <h2 className="text-3xl font-bold text-white">{passenger.fullName}'s Dashboard</h2>
        </div>
        <p className="text-sm text-vantage-muted mb-4">
          Tracking ID: <span className="font-mono text-vantage-accent">{passenger.trackingId}</span>
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Flight Info */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-white">Upcoming Flight</h3>
            <div className="flex items-center space-x-2 text-white">
              <Plane className="w-5 h-5" />
              <span>{passenger.itinerary.departure.iata} → {passenger.itinerary.arrival.iata}</span>
            </div>
            <p className="text-sm text-vantage-muted">{new Date(passenger.itinerary.departure.time).toLocaleString()} – {new Date(passenger.itinerary.arrival.time).toLocaleString()}</p>
            <p className="text-sm text-vantage-muted">Flight {passenger.itinerary.flightNumber} • {passenger.itinerary.airline}</p>
          </div>
          {/* Loyalty / Tier */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-white">Loyalty</h3>
            <p className="text-sm text-vantage-muted">Tier: <span className="font-bold text-vantage-accent">{passenger.tier}</span></p>
            <p className="text-sm text-vantage-muted">Miles Balance: <span className="font-mono text-vantage-accent">{passenger.milesBalance.toLocaleString()}</span></p>
          </div>
        </div>
        <div className="mt-6 grid md:grid-cols-3 gap-4 text-sm text-vantage-muted">
          <div>
            <strong className="block text-white">Passport</strong>
            {passenger.passportNumber}
          </div>
          <div>
            <strong className="block text-white">TSA Pre‑Check</strong>
            {passenger.tsaPreCheck}
          </div>
          <div>
            <strong className="block text-white">Dietary</strong>
            {passenger.dietaryPreference}
          </div>
        </div>
        <button className="mt-6 px-4 py-2 bg-vantage-accent text-vantage-dark rounded-lg hover:bg-vantage-accent/90 transition-colors">
          Manage Booking
        </button>
      </div>
    </motion.div>
  );
};

export default NataliePage;
