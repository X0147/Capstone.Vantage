import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';

interface PromoCardProps {
  city: string;
  iata: string;
  price: number;
  duration: string;
  image: string;
  tag: string;
  onSelect: (iata: string) => void;
}

export const PromoCard: React.FC<PromoCardProps> = ({
  city,
  iata,
  price,
  duration,
  image,
  tag,
  onSelect,
}) => (
  <motion.div
    whileHover={{ y: -8, scale: 1.01 }}
    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    onClick={() => onSelect(iata)}
    className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer shadow-card hover:shadow-card-hover transition-shadow duration-300"
    role="button"
    tabIndex={0}
    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect(iata); }}
    aria-label={`Fly to ${city} (${iata}) from $${price}`}
  >
    {/* Background image */}
    <img
      src={image}
      alt={city}
      loading="lazy"
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-110"
    />

    {/* Gradient overlay */}
    <div className="absolute inset-0 bg-card-overlay transition-opacity duration-300 group-hover:opacity-90" />

    {/* Top-right tag */}
    <span className="absolute top-sm right-sm z-20 rounded-xl bg-black/40 backdrop-blur-md px-xs py-2xs text-[9px] font-mono font-bold text-white uppercase tracking-widest border border-white/15">
      {tag}
    </span>

    {/* Card content */}
    <div className="absolute bottom-0 left-0 w-full p-md z-20">
      <span className="font-mono text-[9px] font-bold text-vantage-accent uppercase tracking-widest">
        New York (JFK) →
      </span>
      <h3 className="font-display text-xl font-bold text-white mt-2xs leading-tight">
        {city}
        <span className="font-sans text-sm font-normal text-white/60 ml-2xs">({iata})</span>
      </h3>
      <div className="flex items-center justify-between mt-xs pt-xs border-t border-white/15">
        <div className="flex items-center gap-2xs text-[10px] text-white/60 font-mono">
          <Clock className="w-3 h-3" />
          {duration}
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[9px] text-white/40 font-mono">from</span>
          <span className="text-vantage-gold font-bold text-base leading-none">${price}</span>
        </div>
      </div>

      {/* Hover CTA */}
      <div className="overflow-hidden mt-xs">
        <div className="flex items-center gap-2xs text-xs font-bold text-white/0 group-hover:text-vantage-accent translate-y-4 group-hover:translate-y-0 transition-all duration-300 ease-premium">
          Explore this route <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  </motion.div>
);
