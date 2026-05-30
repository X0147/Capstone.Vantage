import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Crown, Key, Star, Fingerprint } from 'lucide-react';
import SEO from '../components/SEO';
import StructuredFooter from '../components/StructuredFooter';

const TIERS = [
  {
    name: 'Vantage Silver',
    color: 'from-slate-400 to-slate-600',
    borderColor: 'border-slate-500/30',
    textColor: 'text-slate-300',
    description: 'The foundation of prestige. Seamless booking, priority boarding, and standard lounge access.',
    perks: ['Priority Boarding Group 2', 'Business Lounge Access', '1.5x Cryptographic Miles', '24/7 Digital Concierge']
  },
  {
    name: 'Vantage Gold',
    color: 'from-amber-300 to-amber-600',
    borderColor: 'border-vantage-gold/50',
    textColor: 'text-vantage-gold',
    description: 'Elevated global status. Access to First Class sanctuaries and accelerated ledger rewards.',
    perks: ['Priority Boarding Group 1', 'First Class Lounge Access', '3.0x Cryptographic Miles', 'Complimentary Upgrades', 'Chauffeur Transfer']
  },
  {
    name: 'Vantage Black',
    color: 'from-gray-800 via-black to-gray-900',
    borderColor: 'border-white/20',
    textColor: 'text-white',
    description: 'The Syndicate level. By invitation only. Absolute discretion and zero-friction transit.',
    perks: ['Sovereign Terminal Clearance', 'Private Tarmac Transfer', 'Zero-Gravity Miles (Unlimited)', 'Dedicated Concierge Attaché', 'Bespoke Catering Configuration']
  }
];

export const LoyaltyPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 -mt-24 relative selection:bg-vantage-gold/30 selection:text-white">
      <SEO 
        title="Vantage Black Ledger" 
        description="Explore the exclusive Vantage Black Ledger loyalty tiers, offering unprecedented airspace privileges and rewards." 
      />
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 bg-[#02050a] overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-vantage-gold/5 rounded-full blur-[150px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-lg pt-xl pb-3xl space-y-3xl">
        
        {/* Header */}
        <section className="text-center space-y-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2xs px-sm py-2xs rounded-full bg-vantage-gold/10 border border-vantage-gold/20 text-[10px] font-mono tracking-widest text-vantage-gold uppercase mb-md">
              <Crown className="w-3.5 h-3.5" /> The Syndicate
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-white mb-sm">
              The <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-vantage-gold to-amber-700">Black Ledger</span>
            </h1>
            <p className="max-w-2xl mx-auto text-vantage-muted text-lg font-light leading-relaxed">
              Membership in Vantage is not a loyalty program; it is an accession to a global syndicate. We utilize a secure cryptographic ledger to track your miles, ensuring your status is as sovereign as your wealth.
            </p>
          </motion.div>
        </section>

        {/* Core Mechanics */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-md">
          <div className="p-xl rounded-3xl premium-glass border border-white/5 bg-black/40 text-center">
            <Fingerprint className="w-8 h-8 text-sky-400 mx-auto mb-md" />
            <h3 className="text-lg font-bold text-white mb-xs">Biometric Identity</h3>
            <p className="text-xs text-vantage-muted leading-relaxed">Your face is your passport. Our proprietary biometric matrix securely encrypts your identity, allowing you to bypass traditional security bottlenecks completely.</p>
          </div>
          <div className="p-xl rounded-3xl premium-glass border border-white/5 bg-black/40 text-center">
            <Key className="w-8 h-8 text-vantage-gold mx-auto mb-md" />
            <h3 className="text-lg font-bold text-white mb-xs">Cryptographic Ledger</h3>
            <p className="text-xs text-vantage-muted leading-relaxed">Flight miles are accrued on a private, decentralized ledger. Your rewards are immutable, immune to expiration, and transferable peer-to-peer within the syndicate.</p>
          </div>
          <div className="p-xl rounded-3xl premium-glass border border-white/5 bg-black/40 text-center">
            <ShieldCheck className="w-8 h-8 text-emerald-400 mx-auto mb-md" />
            <h3 className="text-lg font-bold text-white mb-xs">Sovereign Clearance</h3>
            <p className="text-xs text-vantage-muted leading-relaxed">At the highest tiers, you do not enter public terminals. You are escorted via private tarmac transfer directly to your suite aboard the aircraft.</p>
          </div>
        </section>

        {/* Tiers */}
        <section>
          <div className="text-center mb-xl">
            <h2 className="font-display text-4xl font-bold text-white tracking-tight">Access Tiers</h2>
            <div className="h-px w-24 bg-vantage-gold/50 mx-auto mt-md" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
            {TIERS.map((tier, idx) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx, duration: 0.6 }}
                className={`relative group p-lg rounded-[2rem] border ${tier.borderColor} bg-black/50 premium-glass flex flex-col`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${tier.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500 rounded-[2rem] pointer-events-none`} />
                
                <div className="relative z-10 flex-1">
                  <h3 className={`text-2xl font-bold mb-2 ${tier.textColor}`}>{tier.name}</h3>
                  <p className="text-sm text-vantage-muted mb-lg h-16">{tier.description}</p>
                  
                  <ul className="space-y-sm mb-xl">
                    {tier.perks.map(perk => (
                      <li key={perk} className="flex items-start gap-xs text-xs text-white">
                        <Star className={`w-4 h-4 shrink-0 mt-0.5 ${tier.textColor}`} />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button className={`w-full py-sm rounded-xl border ${tier.borderColor} text-xs font-bold uppercase tracking-widest ${tier.textColor} hover:bg-white/5 transition-colors`}>
                  {tier.name === 'Vantage Black' ? 'Request Invitation' : 'Register Now'}
                </button>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
      
      <StructuredFooter />
    </div>
  );
};

export default LoyaltyPage;
