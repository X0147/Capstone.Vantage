import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Settings, Plane, Grid } from 'lucide-react';

const navLinks = [
  { to: '/track', label: 'Track', icon: MapPin },
  { to: '/manage-booking', label: 'Manage Booking', icon: Settings },
  { to: '/trips', label: 'Trips', icon: Plane },
  { to: '/tripsm', label: 'TripsM', icon: Grid },
];

const NavBar: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="relative z-30 w-full bg-black/30 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Title */}
          <div className="flex-shrink-0 text-white font-bold text-lg">
            Vantage
          </div>
          {/* Desktop Links */}
          <div className="hidden md:flex md:space-x-6">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center gap-1 text-sm text-vantage-muted hover:text-white transition-colors"
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
          </div>
          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="text-vantage-muted hover:text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-black/30 backdrop-blur-xl border-t border-white/10"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className="block px-3 py-2 rounded-md text-base text-vantage-muted hover:text-white hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  {label}
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default NavBar;
