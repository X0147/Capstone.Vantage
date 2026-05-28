import { Link, Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Bar */}
      <nav className="p-4 bg-slate-900 text-white flex justify-between">
        <div className="font-bold">Vantage Flights</div>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="search" className="hover:underline">
            Search
          </Link>
        </div>
      </nav>

      {/* Dynamic Page Content */}
      <main className="flex-grow container mx-auto p-4">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="p-4 bg-slate-100 text-center text-sm text-slate-600">
        © 2026 Vantage Capstone Project. All rights reserved.
      </footer>
    </div>
  );
}
