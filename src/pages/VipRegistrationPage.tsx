import React, { useState } from 'react';
import { ArrowLeft, Send, ShieldCheck, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function VipRegistrationPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    homeBase: '',
    requirements: '',
  });

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
    <div className="min-h-screen bg-vantage-midnight flex flex-col pt-24 pb-12 px-6">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-vantage-gold/5 rounded-full blur-[150px] -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-[120px] -ml-32 -mb-32" />
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto flex-1 flex flex-col">
        {/* Header */}
        <button
          onClick={() => navigate(-1)}
          className="self-start flex items-center gap-2 text-vantage-muted hover:text-white transition-colors mb-8 text-sm font-mono tracking-widest uppercase"
        >
          <ArrowLeft className="w-4 h-4" /> Return
        </button>

        <div className="space-y-4 mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-vantage-gold/30 bg-vantage-gold/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-vantage-gold">
            <Star className="h-3 w-3" /> Exclusive Access
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white italic leading-tight">
            Vantage Black <br />
            <span className="text-vantage-gold">Syndicate</span>
          </h1>
          <p className="text-vantage-muted leading-relaxed">
            Submit your credentials below to request sovereign terminal clearance and cryptographic reward status. A concierge will review your application and contact you directly.
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-2xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-widest text-vantage-muted">Full Name</label>
              <input
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-vantage-gold/50 transition-colors"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-widest text-vantage-muted">Email Address</label>
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-vantage-gold/50 transition-colors"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-widest text-vantage-muted">Phone Number</label>
              <input
                required
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-vantage-gold/50 transition-colors"
                placeholder="+1 (555) 000-0000"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-widest text-vantage-muted">Preferred Home Base</label>
              <input
                required
                type="text"
                name="homeBase"
                value={formData.homeBase}
                onChange={handleChange}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-vantage-gold/50 transition-colors"
                placeholder="JFK, LAX, LHR..."
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono uppercase tracking-widest text-vantage-muted">Special Requirements (Optional)</label>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              rows={4}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-vantage-gold/50 transition-colors resize-none"
              placeholder="Any dietary needs, security requirements, or typical fleet preferences..."
            />
          </div>

          <div className="pt-4 flex flex-col items-center gap-4">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-vantage-gold hover:bg-vantage-gold-light text-vantage-midnight font-bold rounded-xl px-6 py-4 uppercase tracking-widest transition-all shadow-glow-gold hover:-translate-y-1"
            >
              <Send className="w-4 h-4" /> Submit Application to Concierge
            </button>
            <p className="flex items-center gap-2 text-[10px] font-mono text-vantage-muted uppercase tracking-widest">
              <ShieldCheck className="w-3 h-3" /> Secure End-to-End Encryption
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
