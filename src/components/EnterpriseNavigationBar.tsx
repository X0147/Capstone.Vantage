import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, Search, ShieldCheck, Ticket, User, Plane } from 'lucide-react';
import BrandLogo from './BrandLogo';

export const EnterpriseNavigationBar: React.FC = () => {
  const location = useLocation();

  return (
    <header className="w-full border-b border-white/5 bg-vantage-dark/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-sm h-14 flex items-center justify-between">
        {/* Brand Signifier */}
        <Link to="/" className="flex items-center gap-xs">
          <BrandLogo showText={true} iconSize="w-6 h-6" textSize="text-xs" />
        </Link>

        {/* Global Action Anchors */}
        <nav className="flex items-center gap-sm">
          <Link
            to="/"
            className={`text-xs font-medium tracking-wide transition-colors flex items-center gap-3xs ${
              location.pathname === '/'
                ? 'text-vantage-accent'
                : 'text-vantage-muted hover:text-white'
            }`}
          >
            <Search className="w-3 h-3" /> Book Flights
          </Link>

          <Link
            to="/manage-booking"
            className={`text-xs font-medium tracking-wide transition-colors flex items-center gap-3xs ${
              location.pathname === '/manage-booking'
                ? 'text-vantage-accent'
                : 'text-vantage-muted hover:text-white'
            }`}
          >
            <Ticket className="w-3 h-3" /> Manage Booking
          </Link>

          <Link
            to="/dashboard"
            className={`text-xs font-medium tracking-wide transition-colors flex items-center gap-3xs ${
              location.pathname === '/dashboard'
                ? 'text-vantage-accent'
                : 'text-vantage-muted hover:text-white'
            }`}
          >
            <User className="w-3 h-3" /> Dashboard
          </Link>

          <Link
            to="/trips"
            className={`text-xs font-medium tracking-wide transition-colors flex items-center gap-3xs ${
              location.pathname === '/trips'
                ? 'text-vantage-accent'
                : 'text-vantage-muted hover:text-white'
            }`}
          >
            <Plane className="w-3 h-3" /> Trips
          </Link>

          <Link
            to="/profile/edit"
            className={`text-xs font-medium tracking-wide transition-colors flex items-center gap-3xs ${
              location.pathname === '/profile/edit'
                ? 'text-vantage-accent'
                : 'text-vantage-muted hover:text-white'
            }`}
          >
            <User className="w-3 h-3" /> Edit Profile
          </Link>

          <Link
            to="/tickets"
            className={`text-xs font-medium tracking-wide transition-colors flex items-center gap-3xs ${
              location.pathname === '/tickets'
                ? 'text-vantage-accent'
                : 'text-vantage-muted hover:text-white'
            }`}
          >
            <Ticket className="w-3 h-3" /> Tickets
          </Link>

          <Link
            to="/track"
            className={`text-xs font-medium tracking-wide transition-colors flex items-center gap-3xs ${
              location.pathname === '/track'
                ? 'text-vantage-accent'
                : 'text-vantage-muted hover:text-white'
            }`}
          >
            <Compass className="w-3 h-3 animate-spin-slow" /> Track Ticket
          </Link>
        </nav>

        <div className="flex items-center gap-sm">
          {/* Cryptographic Node Signifier */}
          <div className="hidden md:flex items-center gap-3xs px-2xs py-3xs bg-white/5 border border-white/5 rounded-full text-[10px] font-mono text-vantage-muted">
            <ShieldCheck className="w-3 h-3 text-vantage-accent" /> Node: Primary-Secure
          </div>

          {/* Gateway Access Link */}
          <Link
            to="/login"
            className="text-[10px] font-bold tracking-wider uppercase bg-white/5 border border-white/10 rounded-xl px-xs py-2xs text-vantage-accent hover:bg-vantage-accent hover:text-vantage-dark transition-all duration-300 min-h-[32px] flex items-center"
          >
            Gateway Access
          </Link>
        </div>
      </div>
    </header>
  );
};

export default EnterpriseNavigationBar;
