import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Ticket, Plane, Compass, Menu, X, LogIn, Users, Globe, Crown } from 'lucide-react';
import BrandLogo from './BrandLogo';
import ThemeToggle from './ThemeToggle';
const NAV_LINKS = [
  { to: '/', label: 'Book Flights', icon: Search },
  { to: '/manage-booking', label: 'Manage', icon: Ticket },
  { to: '/trips', label: 'My Trips', icon: Plane },
  { to: '/track', label: 'Track Flight', icon: Compass },
  { to: '/fleet', label: 'Fleet', icon: Plane },
  { to: '/destinations', label: 'Destinations', icon: Globe },
  { to: '/loyalty', label: 'Syndicate', icon: Crown },
  { to: '/team', label: 'Team', icon: Users },
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
            ? 'bg-black/80 backdrop-blur-2xl shadow-nav border-b border-white/8'
            : 'bg-black/30 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-lg h-20 flex items-center justify-between gap-lg">
          {/* Brand */}
          <Link
            to="/"
            className="shrink-0 hover:opacity-90 transition-opacity duration-300"
            aria-label="Capstone Vantage — Home"
          >
            <BrandLogo iconSize="w-36 h-auto" />
          </Link>

          {/* Desktop Nav — pill-style buttons */}
          <nav className="hidden lg:flex items-center gap-xs shrink-0" aria-label="Main navigation">
            {NAV_LINKS.map(({ to, label, icon: Icon }) => {
              const isActive = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={`relative flex items-center gap-xs px-sm py-xs rounded-full text-[11px] font-bold tracking-widest uppercase whitespace-nowrap shrink-0 transition-all duration-300 group ${
                    isActive
                      ? 'text-white bg-gradient-to-r from-sky-500/80 to-blue-600/80 shadow-[0_0_20px_rgba(56,189,248,0.35)] border border-sky-400/30'
                      : 'text-white/60 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-white' : 'text-sky-400/70 group-hover:text-sky-300'}`} />
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-sm">
  <ThemeToggle />
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
        <div className="lg:hidden fixed inset-0 z-40 pt-20 bg-black/95 backdrop-blur-2xl">
          <nav className="flex flex-col gap-xs p-lg">
            {NAV_LINKS.map(({ to, label, icon: Icon }) => {
              const isActive = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-sm px-md py-sm rounded-2xl text-sm font-bold tracking-wider uppercase transition-all ${
                    isActive
                      ? 'text-white bg-gradient-to-r from-sky-500/30 to-blue-600/30 border border-sky-400/30 shadow-[0_0_20px_rgba(56,189,248,0.2)]'
                      : 'text-white/60 hover:text-white hover:bg-white/5 border border-white/8'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-sky-400' : 'text-white/40'}`} />
                  {label}
                </Link>
              );
            })}
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="mt-sm flex items-center justify-center gap-xs px-md py-sm rounded-2xl bg-gradient-to-r from-sky-400 via-blue-500 to-blue-700 text-white font-black text-sm tracking-wider uppercase shadow-[0_0_20px_rgba(56,189,248,0.4)]"
            >
              <LogIn className="w-4 h-4" />
              Sign In to Vantage
            </Link>
          </nav>
        </div>
      )}
    </>
  );
};

export default EnterpriseNavigationBar;
