import React from 'react';
import { useNavigate } from 'react-router-dom';
import SeatSelector from '../features/seat/SeatSelector';

export default function SeatSelectionPage() {
  const navigate = useNavigate();

  return (
    <div className="py-md">
      <div className="text-center mb-md">
        <h1 className="text-xl font-bold text-white">Select Your Seat</h1>
        <p className="text-xs text-vantage-muted">Configure your premium cabin layout parameters</p>
      </div>
      
      <SeatSelector 
        baseFare={450} 
        onSelectionComplete={() => {
          // The selector already advanced the step in the store; 
          // now we advance the actual window location.
          navigate('/checkout');
        }} 
      />
    </div>
  );
}
