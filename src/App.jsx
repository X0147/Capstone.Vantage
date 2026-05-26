import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Placeholder imports for pages
import SearchPage from './pages/SearchPage';
import ResultsPage from './pages/ResultsPage';
import PassengerPage from './pages/PassengerPage';
import SeatSelectionPage from './pages/SeatSelectionPage';
import PaymentPage from './pages/PaymentPage';
import ConfirmationPage from './pages/ConfirmationPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-brand-dark text-white font-sans antialiased">
        {/* Placeholder Navbar */}
        <header className="p-4 border-b border-white/10 no-print">
          <div className="container mx-auto flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-accent to-brand-emerald">
              CapstoneFlight
            </h1>
          </div>
        </header>

        <main className="flex-1 container mx-auto p-4">
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/passenger-info" element={<PassengerPage />} />
            <Route path="/seat-selection" element={<SeatSelectionPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
          </Routes>
        </main>
      </div>
      <Toaster position="top-right" />
    </Router>
  );
}

export default App;
