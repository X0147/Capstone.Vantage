import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Fingerprint, RefreshCw, CheckCircle, ArrowRight } from 'lucide-react';
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
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    navigate('/');
  };

  const handleBiometricAuth = async () => {
    if (biometricStatus !== 'idle') return;
    setBiometricStatus('scanning');
    await new Promise((resolve) => setTimeout(resolve, 1800));
    setBiometricStatus('success');
    await new Promise((resolve) => setTimeout(resolve, 800));
    navigate('/');
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center px-sm py-lg relative overflow-hidden -mt-24 pt-24">
      {/* Full-screen image background */}
      <img
        src={`${import.meta.env.BASE_URL || '/'}images/20_sunset_flight.jpg`}
        alt="Sunset Flight"
        className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-vantage-midnight/70 via-vantage-midnight/80 to-vantage-midnight/95" />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-vantage-accent/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Login card */}
      <div className="relative z-10 w-full max-w-[512px] premium-glass-strong rounded-4xl p-xl border border-white/8 shadow-[0_32px_80px_rgba(0,0,0,0.6)] space-y-lg">

        {/* Brand */}
        <div className="flex flex-col items-center text-center space-y-sm pb-lg border-b border-white/8">
          <BrandLogo iconSize="w-48 h-auto" />
          <div className="space-y-2xs">
            <p className="text-[9px] uppercase font-mono tracking-widest text-vantage-accent">
              Secure Gateway Access
            </p>
            <h1 className="font-display text-2xl font-bold text-white italic">
              Welcome Back
            </h1>
            <p className="text-xs text-vantage-muted max-w-[320px]">
              Authenticate to access your passenger vector matrix and booking history.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleAuthentication} className="space-y-md">
          <div className="space-y-2xs">
            <label htmlFor="login-email" className="block text-[9px] uppercase tracking-widest text-vantage-muted font-bold">
              Email Address
            </label>
            <div className="relative group">
              <Mail className="w-4 h-4 text-vantage-muted absolute left-md top-1/2 -translate-y-1/2 group-focus-within:text-vantage-accent transition-colors duration-200" />
              <input
                id="login-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@vantage.aero"
                className="w-full bg-black/40 border border-white/10 rounded-2xl pl-11 pr-md py-sm text-sm text-white focus:outline-none focus:border-vantage-accent/60 focus:bg-black/60 transition-all placeholder:text-vantage-muted/50"
              />
            </div>
          </div>

          <div className="space-y-2xs">
            <div className="flex justify-between items-center">
              <label htmlFor="login-password" className="block text-[9px] uppercase tracking-widest text-vantage-muted font-bold">
                Password
              </label>
              <a href="#/forgot" className="text-[9px] text-vantage-accent hover:text-vantage-accent-dark font-mono uppercase tracking-wider transition-colors">
                Reset Key
              </a>
            </div>
            <div className="relative group">
              <Lock className="w-4 h-4 text-vantage-muted absolute left-md top-1/2 -translate-y-1/2 group-focus-within:text-vantage-accent transition-colors duration-200" />
              <input
                id="login-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-black/40 border border-white/10 rounded-2xl pl-11 pr-md py-sm text-sm text-white focus:outline-none focus:border-vantage-accent/60 focus:bg-black/60 transition-all placeholder:text-vantage-muted/50"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || biometricStatus !== 'idle'}
            className="w-full group flex items-center justify-center gap-sm py-sm rounded-2xl bg-gradient-to-r from-sky-400 to-blue-600 text-vantage-midnight font-bold text-sm uppercase tracking-widest transition-all duration-300 hover:shadow-glow-accent hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Validating...
              </>
            ) : (
              <>
                Access Vantage
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>

        {/* Biometrics */}
        <div className="flex flex-col items-center gap-md text-center border-t border-white/8 pt-lg">
          <p className="text-[10px] uppercase tracking-widest text-vantage-muted font-mono">
            Or use biometric verification
          </p>
          <div className="relative">
            {biometricStatus === 'scanning' && (
              <span className="absolute -inset-3 rounded-full border border-vantage-accent/40 animate-ping pointer-events-none" />
            )}
            <button
              type="button"
              onClick={handleBiometricAuth}
              disabled={isLoading || biometricStatus === 'success'}
              className={`p-lg rounded-full border-2 transition-all duration-300 active:scale-90 group ${
                biometricStatus === 'scanning'
                  ? 'bg-vantage-accent/20 border-vantage-accent text-vantage-accent animate-glow-pulse'
                  : biometricStatus === 'success'
                    ? 'bg-vantage-emerald/20 border-vantage-emerald text-vantage-emerald'
                    : 'bg-white/5 border-white/15 hover:bg-white/10 hover:border-vantage-accent/50 text-vantage-muted hover:text-vantage-accent'
              }`}
              title="Authenticate via biometrics"
            >
              {biometricStatus === 'success' ? (
                <CheckCircle className="w-8 h-8" />
              ) : biometricStatus === 'scanning' ? (
                <RefreshCw className="w-8 h-8 animate-spin" />
              ) : (
                <Fingerprint className="w-8 h-8 group-hover:scale-110 transition-transform" />
              )}
            </button>
          </div>
          <span className="text-[10px] text-vantage-muted font-mono">
            {biometricStatus === 'scanning'
              ? 'Reading hardware security enclave...'
              : biometricStatus === 'success'
                ? '✓ Handshake approved. Access granted.'
                : 'Touch to verify biometric identity'}
          </span>
        </div>

        {/* Register link */}
        <div className="text-center pt-xs border-t border-white/5">
          <p className="text-xs text-vantage-muted">
            New to Vantage?{' '}
            <button
              onClick={() => navigate('/')}
              className="text-vantage-accent hover:text-vantage-accent-dark font-semibold transition-colors"
            >
              Create an account →
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
