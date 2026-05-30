// src/components/TravelTimeline.tsx
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Clock, MapPin, Calendar, Plane } from 'lucide-react';

interface TimelineEvent {
  label: string;
  icon: React.ReactNode;
  time: string;
  description: string;
}

export const TravelTimeline: React.FC = () => {
  const events: TimelineEvent[] = [
    {
      label: 'Departure',
      icon: <Plane className="w-5 h-5 text-vantage-gold" />, // gold plane icon
      time: '13:00',
      description: 'Takeoff from JFK Airport',
    },
    {
      label: 'Boarding',
      icon: <Clock className="w-5 h-5 text-vantage-gold" />, // gold clock
      time: '12:45',
      description: 'Gate 22, Boarding Begins',
    },
    {
      label: 'Arrival',
      icon: <MapPin className="w-5 h-5 text-vantage-gold" />, // gold pin
      time: '15:30',
      description: 'Landing at LHR Airport',
    },
    {
      label: 'Date',
      icon: <Calendar className="w-5 h-5 text-vantage-gold" />, // gold calendar
      time: '15 Jun 2026',
      description: 'Scheduled Flight Date',
    },
  ];



  const container: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300 } }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="bg-black/30 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
    >
      <h3 className="text-white text-lg font-semibold mb-4">Travel Timeline</h3>
      <div className="space-y-4">
        {events.map((ev, idx) => (
          <motion.div key={idx} variants={item} className="flex items-center gap-3">
            <div className="flex-shrink-0">{ev.icon}</div>
            <div className="flex-1">
              <p className="text-sm text-vantage-muted uppercase tracking-wider">{ev.label}</p>
              <p className="text-white font-medium">{ev.time} – {ev.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TravelTimeline;
