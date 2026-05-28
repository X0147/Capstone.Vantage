import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface PromoCardProps {
  city: string;
  iata: string;
  price: number;
  duration: string;
  image: string;
  tag: string;
  onSelect: (iata: string) => void;
}

export const PromoCard: React.FC<PromoCardProps> = ({ city, iata, price, duration, image, tag, onSelect }) => (
  <motion.div
    whileHover={{ y: -6, scale: 1.02 }}
    onClick={() => onSelect(iata)}
    className="group relative h-72 rounded-2xl overflow-hidden border border-white/5 bg-black cursor-pointer shadow-lg transition-all"
    role="button"
    aria-label={`Select flight to ${city} (${iata})`}
  >
    {/* Overlay Gradient */}
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent z-10 transition-opacity group-hover:opacity-90" />
    <img
      src={image}
      alt={city}
      loading="lazy"
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
    />
    {/* Tag indicator */}
    <span className="absolute top-xs left-xs z-20 rounded-md bg-white/10 backdrop-blur-md px-2xs py-3xs text-[8px] font-mono text-white font-bold uppercase border border-white/10">
      {tag}
    </span>
    {/* Card Footer Details */}
    <div className="absolute bottom-0 left-0 w-full p-sm z-20 space-y-3xs">
      <span className="font-mono text-[9px] font-bold text-vantage-accent uppercase tracking-wide">
        New York (JFK) to
      </span>
      <h3 className="text-md font-black text-white">
        {city} ({iata})
      </h3>
      <div className="flex justify-between items-center border-t border-white/10 pt-3xs mt-3xs text-[10px] font-mono">
        <span className="text-vantage-muted">{duration}</span>
        <span className="text-emerald-400 font-bold">From ${price}</span>
      </div>
    </div>
  </motion.div>
);
