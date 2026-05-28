import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookingStore } from '../store/useBookingStore';

export default function PassengerPage() {
  const navigate = useNavigate();
  const { setPassengers } = useBookingStore();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPassengers([formData]); // Currently handling single passenger for demo
    navigate('/seat-selection');
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-brand-light">Passenger Information</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">First Name</label>
              <input
                required
                type="text"
                className="w-full bg-brand-dark/50 border border-white/20 rounded p-3 text-white"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Last Name</label>
              <input
                required
                type="text"
                className="w-full bg-brand-dark/50 border border-white/20 rounded p-3 text-white"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              required
              type="email"
              className="w-full bg-brand-dark/50 border border-white/20 rounded p-3 text-white"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Phone Number</label>
            <input
              required
              type="tel"
              className="w-full bg-brand-dark/50 border border-white/20 rounded p-3 text-white"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="bg-brand-accent hover:bg-brand-accent/80 text-white font-bold py-3 px-8 rounded-lg"
            >
              Continue to Seat Selection
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
