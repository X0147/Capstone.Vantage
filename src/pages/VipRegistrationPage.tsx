import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send, ShieldCheck, Star, Sparkles, Fingerprint, Lock, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PRIVILEGES = [
  { icon: ShieldCheck, title: 'Sovereign Terminal Clearance', desc: 'Bypass commercial security arrays with invisible biometric verification.' },
  { icon: Lock, title: 'Zero-Knowledge Itineraries', desc: 'AES-256 encrypted flight logs. Your movements remain mathematically untraceable.' },
  { icon: Globe, title: 'Global Sanctuary Access', desc: 'Unrestricted entry to 1,200+ private departure lounges worldwide.' },
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent('Vantage Black Status Registration Request');
    const body = encodeURIComponent(
      `Vantage Elite Team,\n\nI would like to apply for the Vantage Black Syndicate and secure sovereign terminal clearance.\n\n` +
      `Here are my details:\n` +
      `- Full Name: ${formData.name}\n` +
      `- Email Address: ${formData.email}\n` +
      `- Phone Number: ${formData.phone}\n` +
      `- Preferred Home Base: ${formData.homeBase}\n` +
      `- Additional Requirements: ${formData.requirements || 'None'}\n\n` +
      `Please contact me to finalize my registration.\n\nSovereign Regards,\n${formData.name}`
    );
    window.location.href = `mailto:concierge@vantage.aero?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-vantage-midnight flex flex-col relative overflow-hidden">
      {/* ── Cinematic Background ── */}
      <img
        src={`${import.meta.env.BASE_URL || '/'}images/earth-network.jpg`}
        alt=""
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
              Command the <br />
              <span className="text-gradient-gold relative">
                Absolute Apex
                <Sparkles className="absolute -top-4 -right-8 w-6 h-6 text-vantage-gold/50" />
              </span>
            </h1>
            <p className="text-base text-vantage-muted leading-relaxed max-w-md pt-2">
              Submit your cryptographic signature below to request sovereign terminal clearance. Access to the Syndicate is strictly curated by our elite concierge division.
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
            
            <form onSubmit={handleSubmit} className="relative bg-[#070b12]/60 border border-white/10 rounded-4xl p-8 md:p-10 backdrop-blur-xl shadow-2xl space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2.5 relative">
                  <label className={\`text-[9px] font-mono uppercase tracking-widest transition-colors \${focusedField === 'name' ? 'text-vantage-gold' : 'text-vantage-muted'}\`}>Full Name</label>
                  <input
                    required type="text" name="name" value={formData.name} onChange={handleChange}
                    onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField(null)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:border-vantage-gold/50 focus:bg-white/[0.05] transition-all"
                    placeholder="Enter legal name"
                  />
                  {focusedField === 'name' && <motion.div layoutId="activeFieldGlow" className="absolute -inset-0.5 rounded-2xl border border-vantage-gold/30 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />}
                </div>

                {/* Email */}
                <div className="space-y-2.5 relative">
                  <label className={\`text-[9px] font-mono uppercase tracking-widest transition-colors \${focusedField === 'email' ? 'text-vantage-gold' : 'text-vantage-muted'}\`}>Cryptographic Email</label>
                  <input
                    required type="email" name="email" value={formData.email} onChange={handleChange}
                    onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:border-vantage-gold/50 focus:bg-white/[0.05] transition-all"
                    placeholder="secure@domain.com"
                  />
                  {focusedField === 'email' && <motion.div layoutId="activeFieldGlow" className="absolute -inset-0.5 rounded-2xl border border-vantage-gold/30 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Phone */}
                <div className="space-y-2.5 relative">
                  <label className={\`text-[9px] font-mono uppercase tracking-widest transition-colors \${focusedField === 'phone' ? 'text-vantage-gold' : 'text-vantage-muted'}\`}>Secure Line (Phone)</label>
                  <input
                    required type="tel" name="phone" value={formData.phone} onChange={handleChange}
                    onFocus={() => setFocusedField('phone')} onBlur={() => setFocusedField(null)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:border-vantage-gold/50 focus:bg-white/[0.05] transition-all"
                    placeholder="+1 (000) 000-0000"
                  />
                  {focusedField === 'phone' && <motion.div layoutId="activeFieldGlow" className="absolute -inset-0.5 rounded-2xl border border-vantage-gold/30 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />}
                </div>

                {/* Home Base */}
                <div className="space-y-2.5 relative">
                  <label className={\`text-[9px] font-mono uppercase tracking-widest transition-colors \${focusedField === 'homeBase' ? 'text-vantage-gold' : 'text-vantage-muted'}\`}>Origin Sanctuary (Home Base)</label>
                  <input
                    required type="text" name="homeBase" value={formData.homeBase} onChange={handleChange}
                    onFocus={() => setFocusedField('homeBase')} onBlur={() => setFocusedField(null)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:border-vantage-gold/50 focus:bg-white/[0.05] transition-all"
                    placeholder="JFK, LHR, DXB..."
                  />
                  {focusedField === 'homeBase' && <motion.div layoutId="activeFieldGlow" className="absolute -inset-0.5 rounded-2xl border border-vantage-gold/30 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />}
                </div>
              </div>

              {/* Requirements */}
              <div className="space-y-2.5 relative">
                <label className={\`text-[9px] font-mono uppercase tracking-widest transition-colors \${focusedField === 'reqs' ? 'text-vantage-gold' : 'text-vantage-muted'}\`}>Bespoke Requirements (Optional)</label>
                <textarea
                  name="requirements" value={formData.requirements} onChange={handleChange}
                  onFocus={() => setFocusedField('reqs')} onBlur={() => setFocusedField(null)}
                  rows={3}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:border-vantage-gold/50 focus:bg-white/[0.05] transition-all resize-none"
                  placeholder="Specify dietary mandates, fleet preferences, or detail security protocol..."
                />
                {focusedField === 'reqs' && <motion.div layoutId="activeFieldGlow" className="absolute -inset-0.5 rounded-2xl border border-vantage-gold/30 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />}
              </div>

              {/* Submit Section */}
              <div className="pt-6 mt-6 border-t border-white/10">
                <button
                  type="submit"
                  className="group relative w-full overflow-hidden rounded-2xl bg-vantage-gold text-vantage-midnight font-bold px-6 py-5 text-sm uppercase tracking-widest transition-all hover:bg-vantage-gold-light hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    Transmit Credentials to Concierge <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </button>
                <div className="mt-5 flex justify-center items-center gap-2 opacity-50">
                  <ShieldCheck className="w-3.5 h-3.5 text-vantage-gold" />
                  <span className="text-[9px] font-mono uppercase tracking-widest text-white">Military-Grade Encryption Active</span>
                </div>
              </div>

            </form>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
