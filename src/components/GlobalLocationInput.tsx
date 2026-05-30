import React, { useState, useMemo, useRef, useEffect } from 'react';
import { getAirport } from '../utils/safeLookup';
import { Plane, MapPin } from 'lucide-react';
import { AIRPORTS } from '../data/airports';

interface LocationInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (airportCode: string) => void;
}

export const GlobalLocationInput: React.FC<LocationInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listboxId = useMemo(
    () => `location-listbox-${label.replace(/\s+/g, '-').toLowerCase()}`,
    [label]
  );



  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    const cleanQuery = query.toLowerCase().trim();
    const airportList = Object.values(AIRPORTS);
    return airportList.filter(
      (airport) =>
        airport.iata.toLowerCase().includes(cleanQuery) ||
        airport.city.toLowerCase().includes(cleanQuery) ||
        airport.country.toLowerCase().includes(cleanQuery)
    ).slice(0, 5);
  }, [query]);

  const selectedAirport = getAirport(value);

  useEffect(() => {
    if (!isOpen) setActiveIndex(-1);
  }, [isOpen]);

  useEffect(() => {
    setActiveIndex(-1);
  }, [suggestions.length]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
        break;
      case 'Enter':
        if (activeIndex >= 0 && activeIndex < suggestions.length) {
          e.preventDefault();
          const selected = suggestions[activeIndex];
          onChange(selected.iata);
          setQuery(`${selected.city} (${selected.iata})`);
          setIsOpen(false);
          setActiveIndex(-1);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setActiveIndex(-1);
        break;
      case 'Tab':
        if (activeIndex >= 0 && activeIndex < suggestions.length) {
          const targetAirport = suggestions[activeIndex];
          onChange(targetAirport.iata);
        }
        setIsOpen(false);
        setActiveIndex(-1);
        break;
      default:
        break;
    }
  };

  return (
    <div className="relative flex-1" ref={containerRef}>
      <label className="block text-[10px] uppercase tracking-wider text-vantage-muted font-mono mb-1 select-none">
        {label}
      </label>

      <div className="flex items-center gap-xs mt-0.5">
        <MapPin className="w-4 h-4 text-vantage-gold/75 shrink-0" />
        <div className="flex-1">
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded={isOpen}
            aria-controls={isOpen ? listboxId : undefined}
            aria-autocomplete="list"
            aria-activedescendant={
              activeIndex >= 0 && suggestions[activeIndex]
                ? `global-loc-suggestion-${suggestions[activeIndex].iata}`
                : undefined
            }
            value={
              isOpen
                ? query
                : selectedAirport
                  ? `${selectedAirport.city} (${selectedAirport.iata})`
                  : query
            }
            placeholder={placeholder}
            onFocus={() => {
              setIsOpen(true);
              setQuery('');
            }}
            onBlur={() =>
              setTimeout(() => {
                if (activeIndex >= 0 && suggestions[activeIndex]) {
                  onChange(suggestions[activeIndex].iata);
                }
                setIsOpen(false);
                setActiveIndex(-1);
              }, 150)
            }
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent border-0 p-0 text-sm font-semibold text-white placeholder-white/20 focus:outline-none focus:ring-0 transition-colors"
          />
        </div>
      </div>

      {isOpen && suggestions.length > 0 && (
        <ul
          id={`global-loc-list-${label.replace(/\s+/g, '-').toLowerCase()}`}
          role="listbox"
          className="absolute z-50 w-full mt-xs premium-glass border border-white/10 rounded-xl overflow-hidden shadow-2xl max-h-60"
        >
          {suggestions.map((airport, i) => (
            <li
              id={`global-loc-suggestion-${airport.iata}`}
              key={airport.iata}
              role="option"
              aria-selected={activeIndex === i}
              onMouseDown={(e) => {
                e.preventDefault();
                onChange(airport.iata);
                setQuery(`${airport.city} (${airport.iata})`);
                setIsOpen(false);
                setActiveIndex(-1);
              }}
              onMouseEnter={() => {
                setActiveIndex(i);
              }}
              className={`px-sm py-2xs cursor-pointer flex items-center justify-between text-xs transition-colors group ${
                activeIndex === i ? 'bg-white/5' : 'hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-xs">
                <Plane className="w-3.5 h-3.5 text-vantage-muted group-hover:text-vantage-accent transition-colors" />
                <div>
                  <span className="text-white font-medium">{airport.city}</span>
                  <span className="text-[10px] text-vantage-muted block">{airport.name}</span>
                </div>
              </div>
              <span className="font-mono text-[10px] bg-white/5 border border-white/5 px-2xs py-3xs rounded text-vantage-accent font-bold">
                {airport.iata}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GlobalLocationInput;
