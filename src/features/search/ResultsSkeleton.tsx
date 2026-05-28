import React from 'react';

export const ResultsSkeleton: React.FC = () => {
  return (
    <div className="w-full space-y-sm animate-pulse">
      {[1, 2, 3, 4].map((index) => (
        <div
          key={index}
          className="relative h-[88px] w-full overflow-hidden rounded-xl border border-white/5 bg-gradient-to-r from-vantage-surface/60 to-vantage-slate/40"
        >
          {/* Shimmer gradient strip overlay tracking to our tokens config */}
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shimmer_2s_infinite_linear]" />

          <div className="flex h-full items-center justify-between gap-sm p-sm opacity-60">
            <div className="flex w-1/4 items-center gap-xs">
              <div className="h-10 w-10 rounded-lg bg-white/5" />
              <div className="flex-1 space-y-2xs">
                <div className="h-3 w-24 rounded bg-white/10" />
                <div className="h-2 w-16 rounded bg-white/5" />
              </div>
            </div>
            <div className="flex w-2/4 items-center justify-between gap-md">
              <div className="space-y-2xs">
                <div className="h-4 w-12 rounded bg-white/10" />
              </div>
              <div className="mx-sm h-[2px] flex-1 bg-white/10" />
              <div className="space-y-2xs">
                <div className="h-4 w-12 rounded bg-white/10" />
              </div>
            </div>
            <div className="h-8 w-24 max-w-[120px] rounded-lg bg-white/10" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResultsSkeleton;
