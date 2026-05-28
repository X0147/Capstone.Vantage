import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Ticket, Plane, Compass, ShieldCheck, Menu, X } from 'lucide-react';
import BrandLogo from './BrandLogo';

const NAV_LINKS = [
  { to: '/', label: 'Book Flights', icon: Search },
  { to: '/manage-booking', label: 'Manage', icon: Ticket },
  { to: '/trips', label: 'My Trips', icon: Plane },
  { to: '/track', label: 'Track Flight', icon: Compass },
];

export const EnterpriseNavigationBar: React.FC = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`w-full sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-vantage-midnight/90 backdrop-blur-2xl shadow-nav border-b border-white/5'
            : 'bg-transparent backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-lg h-24 flex items-center justify-between gap-lg">
          {/* Brand */}
          <Link
            to="/"
            className="shrink-0 hover:opacity-90 transition-opacity duration-300"
            aria-label="Capstone Vantage — Home"
          >
            <BrandLogo iconSize="w-40 h-auto" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-xs" aria-label="Main navigation">
            {NAV_LINKS.map(({ to, label, icon: Icon }) => {
              const isActive = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={`relative flex items-center gap-2xs px-sm py-2xs rounded-xl text-[11px] font-semibold tracking-widest uppercase transition-all duration-300 group ${
                    isActive
                      ? 'text-vantage-accent bg-vantage-accent/8'
                      : 'text-vantage-muted hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-3 h-3 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-vantage-accent' : ''}`} />
                  {label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-vantage-accent" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-sm">
            {/* Security badge */}
            <div className="hidden md:flex items-center gap-2xs px-xs py-2xs rounded-full bg-black/20 border border-white/5 text-[9px] font-mono tracking-widest text-vantage-muted">
              <ShieldCheck className="w-3 h-3 text-vantage-gold shrink-0" />
              <span>AES-256 Secured</span>
              <span className="h-1.5 w-1.5 rounded-full bg-vantage-emerald animate-pulse shrink-0" />
            </div>

            {/* Sign In CTA */}
            <Link
              to="/login"
              className="hidden sm:flex items-center gap-2xs px-md py-xs rounded-xl bg-gradient-to-r from-sky-400 to-blue-600 text-vantage-midnight font-bold text-[11px] tracking-widest uppercase transition-all duration-300 hover:shadow-glow-accent hover:scale-[1.02] active:scale-[0.98] shadow-md"
            >
              Sign In
            </Link>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-xs rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 pt-24 bg-vantage-midnight/95 backdrop-blur-2xl">
          <nav className="flex flex-col gap-xs p-lg">
            {NAV_LINKS.map(({ to, label, icon: Icon }) => {
              const isActive = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-sm px-md py-sm rounded-2xl text-sm font-semibold tracking-wider uppercase transition-all ${
                    isActive
                      ? 'text-vantage-accent bg-vantage-accent/10 border border-vantage-accent/20'
                      : 'text-vantage-text hover:bg-white/5 border border-white/5'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </Link>
              );
            })}
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="mt-sm flex items-center justify-center gap-2xs px-md py-sm rounded-2xl bg-gradient-to-r from-sky-400 to-blue-600 text-vantage-midnight font-bold text-sm tracking-wider uppercase"
            >
              Sign In to Vantage
            </Link>
          </nav>
        </div>
      )}
    </>
  );
};

export default EnterpriseNavigationBar;
