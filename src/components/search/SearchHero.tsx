import React from 'react';
import TabSwitcher from './TabSwitcher';
import LocationInput from './LocationInput';
import DateRangePicker from './DateRangePicker';
import PassengersSelector from './PassengersSelector';
import ButtonPrimary from '../ui/ButtonPrimary';
import useSearchStore from '../../store/useSearchStore';
import { useNavigate } from 'react-router-dom';

export const SearchHero: React.FC = () => {
  const { searchParams, setSearchParams, addRecentSearch } = useSearchStore();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    addRecentSearch(searchParams);
    // In a real app we would trigger the query (React Query) and navigate to results
    navigate('/search');
  };

  return (
    <section className="bg-white/6 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-xl">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Find flights</h3>
          <TabSwitcher value={searchParams.tripType} onChange={(t) => setSearchParams({ tripType: t as any })} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-1">
            <LocationInput label="From" field="from" />
          </div>
          <div className="md:col-span-1">
            <LocationInput label="To" field="to" />
          </div>
          <div className="md:col-span-1">
            <DateRangePicker />
          </div>
          <div className="md:col-span-1">
            <PassengersSelector />
          </div>
        </div>

        <div className="flex items-center gap-3 justify-end">
          <ButtonPrimary type="submit">Search Flights</ButtonPrimary>
        </div>
      </form>
    </section>
  );
};

export default SearchHero;
