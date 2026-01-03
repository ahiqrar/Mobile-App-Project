
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TimeSlot } from '../../types';

const UserHome: React.FC = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState('');
  const [slot, setSlot] = useState<TimeSlot>('Evening');
  const [month, setMonth] = useState('Current Month');

  const handleSearch = () => {
    navigate(`/list?date=${date}&slot=${slot}`);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Hero Section */}
      <section className="relative h-[400px] rounded-3xl overflow-hidden flex items-center px-8 text-white shadow-2xl">
        <img src="https://picsum.photos/seed/banquet-hero/1200/600" className="absolute inset-0 w-full h-full object-cover brightness-50" />
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-5xl font-serif font-bold mb-6">Find the Perfect Hall for Your Occasion</h1>
          <p className="text-xl text-gray-200 mb-8">Quickly check availability and book top-rated banquet halls across the city.</p>
        </div>
      </section>

      {/* Search Bar Component */}
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl -mt-20 relative z-20 border border-gray-100 max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <label className="block text-xs font-bold text-indigo-900 uppercase tracking-wider mb-2">Event Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-gray-50 px-4 py-3 rounded-xl border-none outline-none focus:ring-2 focus:ring-indigo-200 text-gray-700"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-indigo-900 uppercase tracking-wider mb-2">Time Slot</label>
          <select
            value={slot}
            onChange={(e) => setSlot(e.target.value as TimeSlot)}
            className="w-full bg-gray-50 px-4 py-3 rounded-xl border-none outline-none focus:ring-2 focus:ring-indigo-200 text-gray-700"
          >
            <option value="Morning">Morning (9AM - 2PM)</option>
            <option value="Evening">Evening (3PM - 8PM)</option>
            <option value="Night">Night (9PM - 2AM)</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-indigo-900 uppercase tracking-wider mb-2">Month</label>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-full bg-gray-50 px-4 py-3 rounded-xl border-none outline-none focus:ring-2 focus:ring-indigo-200 text-gray-700"
          >
            <option>Current Month</option>
            <option>Next Month</option>
            <option>Coming 3 Months</option>
          </select>
        </div>
        <div className="flex items-end">
          <button
            onClick={handleSearch}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            Search Now
          </button>
        </div>
      </div>

      {/* Categories / Suggestions */}
      <section className="mt-8">
        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Popular Locations</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Clifton', 'Gulshan', 'F-7', 'DHA Phase 6'].map(loc => (
            <button key={loc} className="group relative h-40 rounded-2xl overflow-hidden text-left">
              <img src={`https://picsum.photos/seed/${loc}/400/400`} className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <p className="font-bold text-lg">{loc}</p>
                <p className="text-xs text-gray-300">12+ Halls available</p>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default UserHome;
