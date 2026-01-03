
import React, { useState } from 'react';
import { useApp } from '../../AppContext';
import { TimeSlot } from '../../types';

const AvailabilityManagement: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [slotStatus, setSlotStatus] = useState<Record<TimeSlot, boolean>>({
    Morning: true,
    Evening: false,
    Night: true
  });

  const toggleSlot = (slot: TimeSlot) => {
    setSlotStatus(prev => ({ ...prev, [slot]: !prev[slot] }));
  };

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-indigo-900">Manage Availability</h1>
          <p className="text-gray-500">Block or open dates for your banquet halls</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm">
           <span className="text-xs text-gray-400 font-bold uppercase">Hall:</span>
           <select className="ml-2 font-bold text-gray-900 border-none outline-none bg-transparent">
             <option>Grand Royal Plaza</option>
             <option>Serene Gardens</option>
           </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
           <h3 className="text-xl font-bold mb-6 text-gray-900">1. Choose Date</h3>
           <input 
             type="date" 
             value={selectedDate}
             onChange={(e) => setSelectedDate(e.target.value)}
             className="w-full bg-gray-50 p-6 rounded-2xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-indigo-500 text-lg font-bold text-gray-700"
           />
           <div className="mt-8 grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-gray-400 uppercase">
             <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
           </div>
           <div className="grid grid-cols-7 gap-1 mt-2">
             {Array.from({length: 31}).map((_, i) => (
               <div key={i} className={`h-10 rounded-lg flex items-center justify-center text-sm font-bold ${i+1 === 15 ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-600 hover:bg-gray-100'}`}>
                 {i+1}
               </div>
             ))}
           </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col">
          <h3 className="text-xl font-bold mb-6 text-gray-900">2. Set Slots for {selectedDate}</h3>
          <div className="space-y-4 flex-1">
            {(['Morning', 'Evening', 'Night'] as TimeSlot[]).map(slot => (
              <button
                key={slot}
                onClick={() => toggleSlot(slot)}
                className={`w-full p-6 rounded-2xl border-2 flex items-center justify-between transition-all ${slotStatus[slot] ? 'border-emerald-100 bg-emerald-50 shadow-sm' : 'border-rose-100 bg-rose-50'}`}
              >
                <div className="text-left">
                  <p className={`font-black text-lg ${slotStatus[slot] ? 'text-emerald-900' : 'text-rose-900'}`}>{slot}</p>
                  <p className="text-xs text-gray-500 font-medium">{slot === 'Morning' ? '9AM - 2PM' : slot === 'Evening' ? '3PM - 8PM' : '9PM - 2AM'}</p>
                </div>
                <div className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${slotStatus[slot] ? 'bg-emerald-200 text-emerald-800' : 'bg-rose-200 text-rose-800'}`}>
                  {slotStatus[slot] ? 'Available' : 'Booked'}
                </div>
              </button>
            ))}
          </div>
          <button className="mt-8 w-full bg-indigo-900 text-white font-bold py-4 rounded-2xl hover:bg-indigo-800 transition-all shadow-lg">
            Save Status for this Date
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityManagement;
