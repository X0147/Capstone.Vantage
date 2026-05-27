import React from 'react';
import SearchHero from '../components/search/SearchHero';

export default function SearchPage() {
  return (
    <div className="max-w-6xl mx-auto mt-10 space-y-8">
      <section className="relative overflow-hidden rounded-[2rem] shadow-2xl">
        <div className="h-72 w-full bg-gradient-to-tr from-vantage-midnight to-vantage-deep" />
        <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
          <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">Find your next flight in seconds</h1>
          <p className="mt-4 max-w-2xl text-sm text-white/80 sm:text-base">Compare routes, fares, and seats across top airlines with instant search results.</p>
        </div>
      </section>

      <SearchHero />
    </div>
  );
}
