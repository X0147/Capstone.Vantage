import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, Search, ShieldCheck, Ticket, User, Plane } from 'lucide-react';
import BrandLogo from './BrandLogo';

export const EnterpriseNavigationBar: React.FC = () => {
  const location = useLocation();

  return (
    <header className="w-full border-b border-white/5 bg-vantage-deep/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-lg h-20 flex items-center justify-between">
        {/* Brand Signifier */}
        <Link to="/" className="flex items-center hover:opacity-90 transition-opacity">
          <BrandLogo iconSize="w-32 h-auto" />
        </Link>

        {/* Global Action Anchors */}
        <nav className="hidden lg:flex items-center gap-md">
          <Link
            to="/"
            className={`text-[11px] font-semibold tracking-wider uppercase transition-colors flex items-center gap-3xs ${
              location.pathname === '/'
                ? 'text-vantage-accent drop-shadow-[0_0_8px_rgba(56,189,248,0.4)]'
                : 'text-vantage-muted hover:text-white'
            }`}
          >
            <Search className="w-3 h-3" /> Book Flights
          </Link>

          <Link
            to="/manage-booking"
            className={`text-[11px] font-semibold tracking-wider uppercase transition-colors flex items-center gap-3xs ${
              location.pathname === '/manage-booking'
                ? 'text-vantage-accent drop-shadow-[0_0_8px_rgba(56,189,248,0.4)]'
                : 'text-vantage-muted hover:text-white'
            }`}
          >
            <Ticket className="w-3 h-3" /> Manage Booking
          </Link>

          <Link
            to="/dashboard"
            className={`text-[11px] font-semibold tracking-wider uppercase transition-colors flex items-center gap-3xs ${
              location.pathname === '/dashboard'
                ? 'text-vantage-accent drop-shadow-[0_0_8px_rgba(56,189,248,0.4)]'
                : 'text-vantage-muted hover:text-white'
            }`}
          >
            <User className="w-3 h-3" /> Dashboard
          </Link>

          <Link
            to="/trips"
            className={`text-[11px] font-semibold tracking-wider uppercase transition-colors flex items-center gap-3xs ${
              location.pathname === '/trips'
                ? 'text-vantage-accent drop-shadow-[0_0_8px_rgba(56,189,248,0.4)]'
                : 'text-vantage-muted hover:text-white'
            }`}
          >
            <Plane className="w-3 h-3" /> Trips
          </Link>

          <Link
            to="/profile/edit"
            className={`text-[11px] font-semibold tracking-wider uppercase transition-colors flex items-center gap-3xs ${
              location.pathname === '/profile/edit'
                ? 'text-vantage-accent drop-shadow-[0_0_8px_rgba(56,189,248,0.4)]'
                : 'text-vantage-muted hover:text-white'
            }`}
          >
            <User className="w-3 h-3" /> Profile
          </Link>
        </nav>

        <div className="flex items-center gap-md">
          {/* Cryptographic Node Signifier */}
          <div className="hidden md:flex items-center gap-2xs px-xs py-2xs bg-black/20 border border-white/5 rounded-full text-[9px] font-mono tracking-widest text-vantage-muted shadow-inner">
            <ShieldCheck className="w-3 h-3 text-vantage-gold" /> Node: Primary-Secure
          </div>

          {/* Gateway Access Link */}
          <Link
            to="/login"
            className="text-[10px] font-bold tracking-widest uppercase bg-gradient-to-r from-sky-400 to-blue-600 rounded-xl px-md py-xs text-vantage-midnight hover:opacity-95 hover:shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-all duration-300 min-h-[36px] flex items-center shadow-md"
          >
            Gateway Access
          </Link>
        </div>
      </div>
    </header>
  );
};

export default EnterpriseNavigationBar;
