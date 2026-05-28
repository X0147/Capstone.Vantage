import React from 'react';
import { User } from 'lucide-react';

export default function ProfileEditPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-xl px-sm py-md">
      <div className="space-y-6">
        <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2">
          <User className="h-8 w-8 text-vantage-accent" />
          Edit Profile
        </h1>
        
        <div className="premium-glass rounded-3xl border border-white/5 p-md space-y-6">
          <p className="text-vantage-muted border-b border-white/10 pb-4">
            Manage your personal details, secure vault preferences, and communication nodes.
          </p>
          
          <div className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="fullName" className="text-xs font-bold text-vantage-accent uppercase tracking-wider block">Full Name</label>
              <input 
                id="fullName"
                type="text" 
                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-vantage-accent transition-colors"
                placeholder="Enter your name"
                defaultValue="Vantage User"
              />
            </div>
            
            <div className="space-y-1">
              <label htmlFor="email" className="text-xs font-bold text-vantage-accent uppercase tracking-wider block">Encrypted Email Node</label>
              <input 
                id="email"
                type="email" 
                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-vantage-accent transition-colors"
                placeholder="Secure email"
                defaultValue="user@vantage.matrix"
              />
            </div>
            
            <div className="pt-4">
              <button className="bg-vantage-accent text-vantage-dark font-bold px-6 py-3 rounded-lg hover:bg-white transition-colors">
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
