import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Fingerprint, RefreshCw, CheckCircle } from 'lucide-react';
import BrandLogo from '../components/BrandLogo';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [biometricStatus, setBiometricStatus] = useState<'idle' | 'scanning' | 'success'>('idle');

  const handleAuthentication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);
    // Simulate high-performance token security validation delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    
    navigate('/');
  };

  const handleBiometricAuth = async () => {
    if (biometricStatus !== 'idle') return;
    
    setBiometricStatus('scanning');
    // Simulate hardware key verification
    await new Promise((resolve) => setTimeout(resolve, 1800));
    setBiometricStatus('success');
    
    await new Promise((resolve) => setTimeout(resolve, 800));
    navigate('/');
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center px-sm py-lg relative overflow-hidden -mt-20">
      {/* Full screen video background */}
      <video
        src={`${import.meta.env.BASE_URL || '/'}videos/flight-demo-payment.mp4`}
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] z-0" />
      
      {/* Dynamic ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-vantage-accent/10 rounded-full blur-3xl pointer-events-none z-0" />
      
      <div className="w-full max-w-md premium-glass rounded-[2rem] p-md border border-white/10 shadow-2xl space-y-md relative z-10 backdrop-blur-xl bg-black/40">
        
        {/* Branding Signifier */}
        <div className="flex flex-col items-center space-y-xs text-center border-b border-white/10 pb-sm">
          <BrandLogo iconSize="w-48 h-auto" />
          <p className="text-[10px] uppercase font-mono tracking-widest text-vantage-accent mt-2">
            Gateway Access Control
          </p>
        </div>

        {/* Informational Header */}
        <div className="space-y-3xs text-center">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Secure Credentials Validation
          </h3>
          <p className="text-xs text-vantage-muted">
            Authenticate secure identity parameters to unlock your passenger vector matrix.
          </p>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleAuthentication} className="space-y-sm">
          {/* Email Input Field */}
          <div className="space-y-2xs">
            <label htmlFor="corporate-email" className="block text-[9px] uppercase tracking-widest text-vantage-muted font-bold">
              Corporate Email Address
            </label>
            <div className="relative group">
              <input
                id="corporate-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="laurence@vantage.aero"
                className="w-full bg-black/50 border border-white/20 rounded-xl pl-10 pr-xs py-xs text-xs text-white focus:outline-none focus:border-vantage-accent focus:bg-black/70 transition-all placeholder:text-white/30"
              />
              <Mail className="w-4 h-4 text-vantage-muted absolute left-xs top-1/2 -translate-y-1/2 group-focus-within:text-vantage-accent transition-colors" />
            </div>
          </div>

          {/* Password Input Field */}
          <div className="space-y-2xs">
            <div className="flex justify-between items-center">
              <label htmlFor="security-passcode" className="block text-[9px] uppercase tracking-widest text-vantage-muted font-bold">
                Security Passcode
              </label>
              <a href="#/forgot" className="text-[9px] text-vantage-accent hover:underline font-mono uppercase tracking-wider font-semibold">
                Reset Key?
              </a>
            </div>
            <div className="relative group">
              <input
                id="security-passcode"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-black/50 border border-white/20 rounded-xl pl-10 pr-xs py-xs text-xs text-white focus:outline-none focus:border-vantage-accent focus:bg-black/70 transition-all placeholder:text-white/30"
              />
              <Lock className="w-4 h-4 text-vantage-muted absolute left-xs top-1/2 -translate-y-1/2 group-focus-within:text-vantage-accent transition-colors" />
            </div>
          </div>

          {/* Action Trigger Button */}
          <button
            type="submit"
            disabled={isLoading || biometricStatus !== 'idle'}
            className="w-full py-sm mt-xs rounded-xl bg-gradient-to-r from-sky-400 to-blue-600 text-vantage-dark font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2xs transition-all active:scale-[0.98] disabled:opacity-50 hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] cursor-pointer"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> Validate Authorization Token
              </>
            ) : (
              'Initialize Gateway Handshake'
            )}
          </button>
        </form>

        {/* Biometrics Integration Layout */}
        <div className="border-t border-white/10 pt-sm flex flex-col items-center gap-xs text-center">
          <div className="relative">
            {/* Pulsing indicator when scanning */}
            {biometricStatus === 'scanning' && (
              <span className="absolute -inset-2 rounded-full border border-vantage-accent/40 animate-ping pointer-events-none" />
            )}
            
            <button 
              type="button"
              onClick={handleBiometricAuth}
              disabled={isLoading || biometricStatus === 'success'}
              className={`p-sm rounded-full border transition-all active:scale-90 group cursor-pointer ${
                biometricStatus === 'scanning'
                  ? 'bg-vantage-accent/20 border-vantage-accent text-vantage-accent animate-pulse'
                  : biometricStatus === 'success'
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                    : 'bg-white/5 border-white/20 hover:bg-white/10 hover:border-vantage-accent/60 text-vantage-muted hover:text-white shadow-lg'
              }`}
              title="Authenticate via Biometrics"
            >
              {biometricStatus === 'success' ? (
                <CheckCircle className="w-7 h-7" />
              ) : biometricStatus === 'scanning' ? (
                <RefreshCw className="w-7 h-7 animate-spin" />
              ) : (
                <Fingerprint className="w-7 h-7 group-hover:scale-105 transition-transform" />
              )}
            </button>
          </div>
          
          <span className="text-[10px] text-vantage-muted font-mono uppercase tracking-wider">
            {biometricStatus === 'scanning'
              ? 'Reading hardware security enclave...'
              : biometricStatus === 'success'
                ? 'Handshake Approved. Access Granted.'
                : 'Initialize Hardware Biometric Verification'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
