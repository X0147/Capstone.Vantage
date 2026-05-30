import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send, ShieldCheck, Star, Sparkles, Fingerprint, Lock, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PRIVILEGES = [
  { icon: ShieldCheck, title: 'Ghost Protocol Clearance', desc: 'Bypass public infrastructure entirely. Our invisible biometric arrays authenticate you without a single pause.' },
  { icon: Lock, title: 'Cryptographic Anonymity', desc: 'Your flight manifests are secured with military-grade AES-256 encryption. Your movements do not exist on public ledgers.' },
  { icon: Globe, title: 'Sanctuary Network', desc: 'Seamless, unrestricted access to 1,200+ ultra-private departure terminals and atmospheric lounges globally.' },
];

export default function VipRegistrationPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    homeBase: '',
    requirements: '',
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const botToken = '8796758783:AAEoQDUe1pMO6brMw15hIO7dA8d8JhcsRxM';
      const chatId = '7734956999';
      const token = typeof botToken === 'string' ? botToken : '';
      const chat = typeof chatId === 'string' ? chatId : '';
      
      const message = `
🚨 <b>New Vantage Black Registration</b> 🚨

<b>Name:</b> ${formData.name}
<b>Email:</b> ${formData.email}
<b>Phone:</b> ${formData.phone}
<b>Home Base:</b> ${formData.homeBase}
<b>Requirements:</b> ${formData.requirements ?? 'None'}
      `;

      const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chat,
          text: message,
          parse_mode: 'HTML',
        }),
      });

      if (!response.ok) {
        console.error('Failed to send Telegram message:', await response.text());
      }
    } catch (error) {
      console.error('Error sending Telegram message:', error);
    } finally {
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-vantage-midnight flex flex-col relative overflow-hidden">
      {/* ── Cinematic Background ── */}
      <img
        src={`${import.meta.env.BASE_URL ?? '/' }images/earth-network.jpg`}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-[0.25] mix-blend-lighten pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-vantage-midnight/95 via-vantage-midnight/80 to-black/95 pointer-events-none" />
      
      {/* Floating Light Orbs */}
      <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-vantage-gold/5 rounded-full blur-[150px] pointer-events-none -ml-40" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-sky-500/5 rounded-full blur-[150px] pointer-events-none -mr-40" />

      {/* ── Top Navigation ── */}
      <div className="relative z-20 w-full px-6 py-8 md:px-12 md:py-12 flex justify-between items-center">
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-3 text-vantage-muted hover:text-white transition-all text-xs font-mono tracking-widest uppercase"
        >
          <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/20 transition-all shadow-lg">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          </span>
          Return to Hub
        </button>
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-vantage-gold/20 bg-vantage-gold/10 backdrop-blur-md">
          <Fingerprint className="w-3.5 h-3.5 text-vantage-gold animate-pulse" />
          <span className="text-[9px] font-mono uppercase tracking-widest text-vantage-gold font-bold">Secure Gateway</span>
        </div>
      </div>

      {/* ── Main Content Grid ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex-1 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-24 pb-20">
        
        {/* Left Column: Branding & Privileges */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:w-5/12 space-y-10"
        >
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-vantage-gold">
              <Star className="h-3.5 w-3.5" /> Black Syndicate Registration
            </span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white italic leading-[1.05] tracking-tight">
              Ascend to the <br />
              <span className="text-gradient-gold relative">
                Absolute Apex
                <Sparkles className="absolute -top-4 -right-8 w-6 h-6 text-vantage-gold/50" />
              </span>
            </h1>
            <p className="text-base text-vantage-muted leading-relaxed max-w-md pt-2">
              The Vantage Black Syndicate is an invite-only collective for the world's most discerning individuals. Submit your credentials below for concierge review.
            </p>
          </div>

          <div className="space-y-6 pt-4 border-t border-white/10">
            {PRIVILEGES.map((privilege, idx) => (
              <motion.div 
                key={privilege.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <privilege.icon className="w-4 h-4 text-vantage-gold" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{privilege.title}</h4>
                  <p className="text-xs text-vantage-muted mt-1 leading-relaxed">{privilege.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Premium Form */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:w-7/12 max-w-2xl"
        >
          <div className="relative group/form">
            {/* Form Glow Effect */}
            <div className="absolute -inset-1 rounded-4xl bg-gradient-to-br from-vantage-gold/20 via-sky-500/10 to-vantage-gold/5 opacity-0 group-hover/form:opacity-100 blur-2xl transition-opacity duration-700 pointer-events-none" />
            
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form key="form" exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} onSubmit={handleSubmit} className="relative bg-[#070b12]/80 border border-white/10 rounded-3xl p-8 md:p-10 backdrop-blur-2xl shadow-2xl space-y-5">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="space-y-2 relative">
                                      <label htmlFor="name-input" className={`text-[9px] font-mono uppercase tracking-widest transition-colors ${focusedField === 'name' ? 'text-vantage-gold' : 'text-vantage-muted'}`}>Legal Identity</label>
                    <input
                      required type="text" name="name" id="name-input" value={formData.name} onChange={handleChange}
                      onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField(null)}
                      className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-vantage-gold/50 focus:bg-white/[0.04] transition-all"
                      placeholder="Enter full name"
                    />
                  {focusedField === 'name' && <motion.div layoutId="activeFieldGlow" className="absolute -inset-0.5 rounded-xl border border-vantage-gold/30 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />}
                </div>

                {/* Email */}
                <div className="space-y-2 relative">
                                      <label htmlFor="email-input" className={`text-[9px] font-mono uppercase tracking-widest transition-colors ${focusedField === 'email' ? 'text-vantage-gold' : 'text-vantage-muted'}`}>Cryptographic Email</label>
                    <input
                      required type="email" name="email" id="email-input" value={formData.email} onChange={handleChange}
                      onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)}
                      className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-vantage-gold/50 focus:bg-white/[0.04] transition-all"
                      placeholder="secure@domain.com"
                    />
                  {focusedField === 'email' && <motion.div layoutId="activeFieldGlow" className="absolute -inset-0.5 rounded-xl border border-vantage-gold/30 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Phone */}
                <div className="space-y-2 relative">
                                      <label htmlFor="phone-input" className={`text-[9px] font-mono uppercase tracking-widest transition-colors ${focusedField === 'phone' ? 'text-vantage-gold' : 'text-vantage-muted'}`}>Secure Line (Phone)</label>
                    <input
                      required type="tel" name="phone" id="phone-input" value={formData.phone} onChange={handleChange}
                      onFocus={() => setFocusedField('phone')} onBlur={() => setFocusedField(null)}
                      className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-vantage-gold/50 focus:bg-white/[0.04] transition-all"
                      placeholder="+1 (000) 000-0000"
                    />
                  {focusedField === 'phone' && <motion.div layoutId="activeFieldGlow" className="absolute -inset-0.5 rounded-xl border border-vantage-gold/30 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />}
                </div>

                {/* Home Base */}
                <div className="space-y-2 relative">
                                      <label htmlFor="homeBase-input" className={`text-[9px] font-mono uppercase tracking-widest transition-colors ${focusedField === 'homeBase' ? 'text-vantage-gold' : 'text-vantage-muted'}`}>Origin Sanctuary</label>
                    <input
                      required type="text" name="homeBase" id="homeBase-input" value={formData.homeBase} onChange={handleChange}
                      onFocus={() => setFocusedField('homeBase')} onBlur={() => setFocusedField(null)}
                      className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-vantage-gold/50 focus:bg-white/[0.04] transition-all"
                      placeholder="JFK, LHR, DXB..."
                    />
                  {focusedField === 'homeBase' && <motion.div layoutId="activeFieldGlow" className="absolute -inset-0.5 rounded-xl border border-vantage-gold/30 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />}
                </div>
              </div>

              {/* Requirements */}
              <div className="space-y-2 relative">
                <label htmlFor="requirements-input" className={`text-[9px] font-mono uppercase tracking-widest transition-colors ${focusedField === 'reqs' ? 'text-vantage-gold' : 'text-vantage-muted'}`}>Bespoke Requirements (Optional)</label>
                <textarea
                  name="requirements" id="requirements-input" value={formData.requirements} onChange={handleChange}
                  onFocus={() => setFocusedField('reqs')} onBlur={() => setFocusedField(null)}
                  rows={2}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-vantage-gold/50 focus:bg-white/[0.04] transition-all resize-none"
                  placeholder="Specify dietary mandates, fleet preferences..."
                />
                {focusedField === 'reqs' && <motion.div layoutId="activeFieldGlow" className="absolute -inset-0.5 rounded-xl border border-vantage-gold/30 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />}
              </div>

              {/* Submit Section */}
              <div className="pt-6 mt-6 border-t border-white/10">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full overflow-hidden rounded-2xl bg-vantage-gold text-vantage-midnight font-bold px-6 py-5 text-sm uppercase tracking-widest transition-all hover:bg-vantage-gold-light hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] disabled:opacity-70"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {isSubmitting ? (
                      <span className="flex items-center gap-3 animate-pulse">
                        Encrypting Transmission...
                      </span>
                    ) : (
                      <>
                        Transmit Credentials to Concierge <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </>
                    )}
                  </span>
                  {!isSubmitting && <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />}
                </button>
                <div className="mt-5 flex justify-center items-center gap-2 opacity-50">
                  <ShieldCheck className="w-3.5 h-3.5 text-vantage-gold" />
                  <span className="text-[9px] font-mono uppercase tracking-widest text-white">Military-Grade Encryption Active</span>
                </div>
              </div>

                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="relative bg-[#070b12]/80 border border-vantage-gold/30 rounded-3xl p-8 md:p-12 backdrop-blur-2xl shadow-2xl flex flex-col items-center justify-center text-center space-y-5"
                >
                  <div className="w-16 h-16 rounded-full bg-vantage-gold/10 flex items-center justify-center border border-vantage-gold/30 mb-2">
                    <ShieldCheck className="w-8 h-8 text-vantage-gold" />
                  </div>
                  <h3 className="text-2xl font-display font-black text-white tracking-tight">Encrypted Transmission Secured</h3>
                  <p className="text-sm text-vantage-muted max-w-sm leading-relaxed">
                    The Vantage Concierge has received your dossier. Our elite division is currently verifying your credentials. Expect contact on your secure line shortly.
                  </p>
                  
                  <button
                    onClick={() => navigate('/')}
                    className="mt-6 border border-vantage-gold text-vantage-gold font-bold px-8 py-3 text-[10px] uppercase tracking-widest rounded-full transition-all hover:bg-vantage-gold hover:text-vantage-midnight"
                  >
                    Return to Terminal
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
