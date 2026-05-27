import React from 'react';

export interface FlightCardSkeletonProps {
  count?: number;
}

export function FlightCardSkeleton({ count = 6 }: FlightCardSkeletonProps) {
  return (
    <div className="grid gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.18)]"
          aria-hidden="true"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-white/10 animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 w-28 rounded bg-white/10 animate-pulse" />
                <div className="h-3 w-40 rounded bg-white/10 animate-pulse" />
              </div>
            </div>
            <div className="space-y-2 text-right">
              <div className="h-5 w-20 rounded bg-white/10 animate-pulse ml-auto" />
              <div className="h-3 w-24 rounded bg-white/10 animate-pulse ml-auto" />
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-4">
            <div className="h-16 rounded-xl bg-white/10 animate-pulse" />
            <div className="h-16 rounded-xl bg-white/10 animate-pulse" />
            <div className="h-16 rounded-xl bg-white/10 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default FlightCardSkeleton;
