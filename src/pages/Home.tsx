import React from 'react';
import { Link } from 'react-router-dom';
import SearchPage from './SearchPage';

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="p-8 bg-white/5 rounded-2xl">
        <h2 className="text-3xl font-bold mb-2">Welcome to Vantage Flights</h2>
        <p className="text-sm text-white/80">Find and compare flights across top airlines.</p>
        <div className="mt-6">
          <Link to="/" className="inline-block bg-brand-accent text-white py-2 px-4 rounded">
            Start Searching
          </Link>
        </div>
      </section>

      <section>
        <SearchPage />
      </section>
    </div>
  );
}
