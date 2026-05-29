import React from 'react';
import { motion } from 'framer-motion';
import { Plane } from 'lucide-react';

export const AnimatedSpinner: React.FC<{ size?: number; className?: string }> = ({ size = 24, className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      {/* Outer spinning ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-t-2 border-r-2 border-vantage-accent opacity-50"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
      />
      
      {/* Inner spinning ring (opposite direction) */}
      <motion.div
        className="absolute inset-[15%] rounded-full border-b-2 border-l-2 border-blue-400 opacity-70"
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
      />

      {/* Center pulsating plane */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <Plane size={size * 0.4} className="text-white transform -rotate-45" />
      </motion.div>
    </div>
  );
};

export default AnimatedSpinner;
