import React from 'react';
import FlightCardSkeleton from './FlightCardSkeleton';

export interface ResultsSkeletonProps {
  count?: number;
}

function SidebarSkeleton() {
  return (
    <aside className="sticky top-24 hidden h-[calc(100vh-7rem)] w-[300px] shrink-0 overflow-y-auto rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md lg:block">
      <div className="space-y-6" aria-hidden="true">
        <div className="space-y-2">
          <div className="h-5 w-24 rounded bg-white/10 animate-pulse" />
          <div className="h-3 w-40 rounded bg-white/10 animate-pulse" />
        </div>

        <div className="space-y-3">
          <div className="h-4 w-20 rounded bg-white/10 animate-pulse" />
          <div className="h-10 rounded-xl bg-white/10 animate-pulse" />
          <div className="h-10 rounded-xl bg-white/10 animate-pulse" />
        </div>

        <div className="space-y-3">
          <div className="h-4 w-16 rounded bg-white/10 animate-pulse" />
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-12 rounded-xl bg-white/10 animate-pulse" />
          ))}
        </div>

        <div className="space-y-3">
          <div className="h-4 w-20 rounded bg-white/10 animate-pulse" />
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-12 rounded-xl bg-white/10 animate-pulse" />
          ))}
        </div>
      </div>
    </aside>
  );
}

export function ResultsSkeleton({ count = 6 }: ResultsSkeletonProps) {
  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 py-6 lg:px-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <SidebarSkeleton />

        <main className="min-w-0 flex-1 space-y-5">
          <section className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_16px_50px_rgba(0,0,0,0.18)] backdrop-blur-md lg:p-6">
            <div className="space-y-3">
              <div className="h-3 w-28 rounded bg-white/10 animate-pulse" />
              <div className="h-8 w-72 rounded bg-white/10 animate-pulse" />
              <div className="h-4 w-[28rem] max-w-full rounded bg-white/10 animate-pulse" />
            </div>
          </section>

          <FlightCardSkeleton count={count} />
        </main>
      </div>
    </div>
  );
}

export default ResultsSkeleton;
