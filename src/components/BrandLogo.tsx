import React from 'react';

interface BrandLogoProps {
  className?: string;
  iconSize?: string;
  showText?: boolean;
  textSize?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  iconSize = 'w-8 h-8',
  showText = true,
  textSize = 'text-sm',
}) => {
  return (
    <div className={`flex items-center gap-xs select-none ${className}`}>
      {/* High-Fidelity Custom Vector Badge */}
      <svg 
        className={`${iconSize} drop-shadow-[0_0_12px_rgba(56,189,248,0.35)] transform transition-transform duration-500 hover:scale-105`} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="brandLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
          <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Aerodynamic wing chassis */}
        <path 
          d="M20 75L50 15L80 75L50 60L20 75Z" 
          fill="url(#brandLogoGrad)" 
          filter="url(#logoGlow)"
        />
        
        {/* Core telemetry alignment shaft */}
        <path 
          d="M50 15V60" 
          stroke="#ffffff" 
          strokeWidth="3.5" 
          strokeLinecap="round" 
          opacity="0.9" 
        />
        
        {/* Micro PNR node node */}
        <circle cx="50" cy="60" r="3" fill="#ffffff" />
      </svg>

      {showText && (
        <span className={`font-black tracking-widest uppercase text-white font-sans ${textSize}`}>
          VANTAGE<span className="text-vantage-accent">.AERO</span>
        </span>
      )}
    </div>
  );
};

export default BrandLogo;
