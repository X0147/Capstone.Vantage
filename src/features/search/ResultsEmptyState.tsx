import React from 'react';

export interface ResultsEmptyStateProps {
  title: string;
  description: string;
}

export function ResultsEmptyState({ title, description }: ResultsEmptyStateProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 px-8 py-14 text-center shadow-[0_12px_40px_rgba(0,0,0,0.2)] backdrop-blur-md">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 text-2xl">
        ✈
      </div>
      <h3 className="mt-5 text-2xl font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-white/65">{description}</p>
    </div>
  );
}

export default ResultsEmptyState;
