import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Globe, Mail } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { validateEmail } from '../utils/validateEmail';

const FOOTER_LINKS = {
  'Book Flights': [
    { label: 'New York → London', path: '/search-results' },
    { label: 'New York → Tokyo', path: '/search-results' },
    { label: 'New York → Paris', path: '/search-results' },
    { label: 'Destinations Directory', path: '/destinations' },
  ],
  'Airspace Tools': [
    { label: 'Fleet Showcase', path: '/fleet' },
    { label: 'Vantage Black Ledger', path: '/loyalty' },
    { label: 'Live ADS-B Radar', path: '/' },
    { label: 'Itinerary Retrieval', path: '/manage-booking' },
  ],
  'The Syndicate': [
    { label: 'Executive Directorate', path: '/team' },
    { label: 'Privacy Protocol', path: '#' },
    { label: 'Terms of Service', path: '#' },
    { label: 'Security Clearances', path: '/login' },
  ],
};

export const StructuredFooter: React.FC = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const [subEmail, setSubEmail] = React.useState('');
  const [subStatus, setSubStatus] = React.useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubscribe = async () => {
    if (!subEmail || !validateEmail(subEmail)) {
        setSubStatus('error');
        setTimeout(() => setSubStatus('idle'), 3000);
        return;
      }
    setSubStatus('sending');
    try {
      const botToken = '8796758783:AAEoQDUe1pMO6brMw15hIO7dA8d8JhcsRxM';
      const chatId = '7734956999';
      const message = `📩 <b>New Newsletter Subscriber</b>\n\n<b>Email:</b> ${subEmail}\n<b>Source:</b> Footer Newsletter\n<b>Time:</b> ${new Date().toLocaleString()}`;
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'HTML' }),
      });
      if (response.ok) {
        setSubStatus('sent');
        setSubEmail('');
        setTimeout(() => setSubStatus('idle'), 3000);
      } else {
        console.error('Telegram error:', await response.text());
        setSubStatus('error');
        setTimeout(() => setSubStatus('idle'), 3000);
      }
    } catch (err) {
      console.error('Subscribe error:', err);
      setSubStatus('error');
      setTimeout(() => setSubStatus('idle'), 3000);
    }
  };

  return (
    <footer className="relative border-t border-transparent space-y-xl pt-xl mt-xl z-10">
      {/* Neon glow top border */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-vantage-accent/60 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-32 bg-vantage-accent/10 blur-[80px] pointer-events-none" />
      {/* Newsletter strip */}
      <div className="relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-xl premium-glass rounded-[2rem] p-lg md:p-xl border border-white/10 shadow-2xl">
        <div aria-live="polite" className="sr-only">
          {subStatus === 'error' && subEmail && 'Invalid email address.'}
        </div>
        {/* Glow Effects */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-sky-500/50 to-transparent opacity-50" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-vantage-accent/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="space-y-sm z-10 w-full lg:w-1/2">
          <div className="inline-flex items-center gap-2xs rounded-full border border-vantage-accent/20 bg-vantage-accent/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-vantage-accent mb-2">
            <Mail className="w-3 h-3" /> Encrypted Comms
          </div>
          <h4 className="font-display text-2xl md:text-3xl font-black text-white tracking-tight">Ascend Your Inbox</h4>
          <p className="text-sm text-vantage-muted max-w-md leading-relaxed">
            Receive curated luxury travel invitations, strategic airspace intelligence, and exclusive Vantage Privilege missives directly to your private channel.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-sm w-full lg:w-auto z-10">
          <div className="relative flex-1 sm:w-72">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-vantage-muted" />
            <input
              type="email"
              value={subEmail}
              onChange={(e) => setSubEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
              placeholder="you@vantage.aero"
              className="w-full bg-black/60 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm text-white placeholder:text-vantage-muted/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-vantage-accent focus:bg-white/[0.03] transition-all"
            />
          </div>
          <button
            onClick={handleSubscribe}
            disabled={subStatus === 'sending'}
            className={`shrink-0 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] flex justify-center items-center gap-2 ${
              subStatus === 'sent'
                ? 'bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                : subStatus === 'error'
                ? 'bg-red-500 text-white'
                : subStatus === 'sending'
                ? 'bg-white/50 text-black/50 cursor-wait'
                : 'bg-gradient-to-r from-vantage-accent to-blue-500 text-white shadow-[0_0_20px_rgba(56,189,248,0.2)] hover:shadow-[0_0_30px_rgba(56,189,248,0.4)]'
            }`}
          >
          {subStatus === 'sending' && (
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4 31.4" strokeLinecap="round" />
            </svg>
          )}
          {subStatus === 'sent' && (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
            {subStatus === 'idle' ? 'SUBSCRIBE' : subStatus === 'sending' ? 'SECURING...' : subStatus === 'sent' ? 'SECURED' : 'RETRY'}
          </button>
        </div>
      </div>

      {/* Link columns */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-xl py-lg">
        {/* Brand column */}
        <div className="col-span-2 lg:col-span-3 space-y-md">
          <BrandLogo iconSize="w-40 h-auto" />
          <p className="text-sm text-vantage-muted leading-relaxed max-w-sm mt-4">
            Capstone.Vantage represents the zenith of private and commercial aviation, seamlessly blending absolute security with unparalleled luxury travel orchestration.
          </p>
          
          {/* Company Contact */}
          <div className="pt-4 space-y-3">
            <h5 className="text-[10px] font-bold uppercase tracking-widest text-white/50">Direct Intel</h5>
            <a 
              href="mailto:capstone@consultant.com" 
              className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
            >
              <div className="p-1.5 rounded-lg bg-sky-500/20 text-sky-400 group-hover:bg-sky-500/30 transition-colors">
                <Mail className="w-4 h-4" />
              </div>
              <span className="text-sm font-mono text-white tracking-wide">capstone@consultant.com</span>
            </a>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-vantage-muted mt-6 bg-black/40 p-3 rounded-xl border border-white/5 w-max">
            <Globe className="w-4 h-4 text-sky-400 animate-pulse" />
            <span>Global Coverage — 195 Countries</span>
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
          <div key={heading} className="space-y-sm">
            <h5 className="text-[10px] font-bold uppercase tracking-widest text-white">{heading}</h5>
            <ul className="space-y-xs">
              {links.map(({ label, path }) => (
                <li key={label}>
                  <button
                    onClick={() => navigate(path)}
                    className="text-[11px] text-vantage-muted hover:text-vantage-accent transition-colors duration-200 text-left font-mono"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 pt-lg pb-md flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="font-mono text-[10px] text-vantage-muted tracking-wider">
          © {currentYear} CAPSTONE.VANTAGE AIRSPACE LLC. ALL FLIGHT PARAMETERS ENCRYPTED.
        </span>
        <div className="flex items-center gap-4 font-mono text-[10px]">
          <div className="flex items-center gap-2 text-white/40">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ENCRYPTION: AES-256</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>NODE: SECURE-ACTIVE (12ms)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default StructuredFooter;
