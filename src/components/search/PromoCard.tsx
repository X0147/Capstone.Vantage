import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';

interface PromoCardProps {
  city: string;
  iata: string;
  price: number;
  offRate: number;
  duration: string;
  image: string;
  tag: string;
  onSelect: (city: string, iata: string, price: number, offRate: number) => void;
}

export const PromoCard: React.FC<PromoCardProps> = ({
  city,
  iata,
  price,
  offRate,
  duration,
  image,
  tag,
  onSelect,
}) => {
  const promoPrice = Math.round(price * (1 - offRate / 100));

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onSelect(city, iata, price, offRate)}
      className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer shadow-card hover:shadow-card-hover transition-shadow duration-300"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' ?? e.key === ' ') onSelect(city, iata, price, offRate); }}
      aria-label={`Fly to ${city} (${iata}) from $${promoPrice} with ${offRate}% off`}
    >
      {/* Background image */}
      <img
        src={image}
        alt={city}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-premium group-hover:scale-105"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-all duration-700 group-hover:from-black/95 group-hover:via-black/60" />

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
            <span className="text-[9.5px] text-white/40 font-mono line-through">${price}</span>
            <div className="flex items-baseline gap-[2px]">
              <span className="text-vantage-gold font-bold text-base leading-none">${promoPrice}</span>
              <span className="text-[8px] text-vantage-emerald font-bold font-mono">-{offRate}%</span>
            </div>
          </div>
        </div>

        {/* Hover CTA */}
        <div className="overflow-hidden mt-sm">
          <div className="flex items-center gap-xs text-[10px] font-bold uppercase tracking-widest text-vantage-accent opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-premium">
            Email to Book Flight <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
