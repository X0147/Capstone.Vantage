import React from 'react';

interface BrandLogoProps {
  className?: string;
  iconSize?: string;

  textSize?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  iconSize = 'w-48 h-auto',
  showText = false, // Logo 10 includes text inherently
}) => {
  return (
    <div className={`flex items-center select-none ${className}`}>
      {/* Premium Serif Luxury Concept (Adapted for Dark Mode) */}
      <svg 
        className={`${iconSize} drop-shadow-[0_0_15px_rgba(56,189,248,0.2)] transform transition-transform duration-500 hover:scale-[1.02]`} 
        viewBox="0 0 500 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="luxuryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#a3b8cc" />
          </linearGradient>
        </defs>
        <text
          x="0"
          y="65"
          fontFamily="'Times New Roman', Times, serif"
          fontSize="54"
          fontStyle="italic"
          fontWeight="bold"
          fill="url(#luxuryGrad)"
        >
          Capstone
        </text>
        <circle cx="245" cy="50" r="5" fill="#38bdf8" />
        <text
          x="265"
          y="65"
          fontFamily="'Times New Roman', Times, serif"
          fontSize="34"
          fontStyle="italic"
          fill="#38bdf8"
        >
          Vantage
        </text>
      </svg>
    </div>
  );
};

export default BrandLogo;
