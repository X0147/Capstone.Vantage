import React, { useRef, useState, useEffect } from 'react';
import { PromoCard } from './PromoCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import AccessibleButton from '../AccessibleButton';

interface PromoDestination {
  city: string;
  iata: string;
  price: number;
  duration: string;
  image: string;
  tag: string;
}

interface PromoCarouselProps {
  destinations: PromoDestination[];
  onSelect: (iata: string) => void;
}

export const PromoCarousel: React.FC<PromoCarouselProps> = ({ destinations, onSelect }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const checkScrollLimits = () => {
    const el = containerRef.current;
    if (!el) return;
    
    // Check if we can scroll left/right
    setShowLeftArrow(el.scrollLeft > 10);
    setShowRightArrow(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
    
    // Calculate current visible item index
    const cardWidth = el.scrollWidth / destinations.length;
    const index = Math.round(el.scrollLeft / cardWidth);
    if (index >= 0 && index < destinations.length) {
      setActiveIndex(index);
    }

    // Calculate scroll progress percentage (0 to 100)
    const maxScroll = el.scrollWidth - el.clientWidth;
    const progress = maxScroll > 0 ? (el.scrollLeft / maxScroll) * 100 : 0;
    setScrollProgress(progress);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      el.addEventListener('scroll', checkScrollLimits, { passive: true });
      // Run once initially
      checkScrollLimits();
      // Handle window resize
      window.addEventListener('resize', checkScrollLimits);
    }
    return () => {
      if (el) {
        el.removeEventListener('scroll', checkScrollLimits);
      }
      window.removeEventListener('resize', checkScrollLimits);
    };
  }, [destinations.length]);

  const scrollBy = (direction: 'left' | 'right') => {
    const el = containerRef.current;
    if (!el) return;
    
    // Scroll amount is 1 card width or slightly less than viewport width
    const scrollAmount = el.clientWidth * 0.8;
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const scrollToItem = (idx: number) => {
    const el = containerRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / destinations.length;
    el.scrollTo({
      left: idx * cardWidth,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative group w-full">
      {/* Navigation Buttons (min-h-[44px] touch target ergonomics placed INSIDE the carousel to prevent clipping) */}
      {showLeftArrow && (
        <AccessibleButton
          ariaLabel="Scroll popular routes left"
          onClick={() => scrollBy('left')}
          className="absolute left-xs md:left-sm top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-vantage-midnight/80 backdrop-blur-md text-white flex items-center justify-center border border-white/15 hover:bg-vantage-accent hover:text-vantage-midnight hover:border-vantage-accent transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-vantage-accent"
        >
          <ChevronLeft className="w-4 h-4" />
        </AccessibleButton>
      )}

      {showRightArrow && (
        <AccessibleButton
          ariaLabel="Scroll popular routes right"
          onClick={() => scrollBy('right')}
          className="absolute right-xs md:right-sm top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-vantage-midnight/80 backdrop-blur-md text-white flex items-center justify-center border border-white/15 hover:bg-vantage-accent hover:text-vantage-midnight hover:border-vantage-accent transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-vantage-accent"
        >
          <ChevronRight className="w-4 h-4" />
        </AccessibleButton>
      )}

      {/* Carousel scroll container */}
      <div
        ref={containerRef}
        className="flex gap-sm overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none pb-sm -mx-xs px-xs sm:-mx-0 sm:px-0"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {destinations.map((promo) => (
          <div 
            key={promo.iata} 
            className="snap-start shrink-0 w-[280px] sm:w-[320px] md:w-[230px] lg:w-[242px]"
          >
            <PromoCard
              city={promo.city}
              iata={promo.iata}
              price={promo.price}
              duration={promo.duration}
              image={promo.image}
              tag={promo.tag}
              onSelect={onSelect}
            />
          </div>
        ))}
      </div>
      
      {/* Premium Horizontal Scroll Progress Tracker */}
      <div className="flex items-center justify-between mt-lg max-w-[240px] mx-auto text-[9px] font-mono tracking-widest text-white/40 uppercase">
        <span className="text-vantage-accent font-bold">01</span>
        <div className="flex-1 mx-md h-[1.5px] bg-white/5 rounded-full relative overflow-hidden">
          <div 
            className="absolute top-0 bottom-0 bg-vantage-gold rounded-full transition-all duration-150 ease-out"
            style={{ 
              left: `0%`,
              width: '25%',
              transform: `translateX(${scrollProgress * 3}%)`
            }}
          />
        </div>
        <span>{destinations.length < 10 ? `0${destinations.length}` : destinations.length}</span>
      </div>
    </div>
  );
};

export default PromoCarousel;
