
import React, { useState } from 'react';
import { useApp } from '../../AppContext';
import { Banquet } from '../../types';

const OwnerDashboard: React.FC = () => {
  const { banquets, user } = useApp();
  const ownerBanquets = banquets.filter(b => b.ownerId === user?.id);
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold text-indigo-900">Owner Dashboard</h1>
          <p className="text-gray-500">Manage your properties and bookings</p>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 shadow-lg transition-transform active:scale-95"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
          Add New Hall
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Halls', value: ownerBanquets.length, icon: '🏢', color: 'indigo' },
          { label: 'Pending Bookings', value: 12, icon: '⏳', color: 'amber' },
          { label: 'Monthly Revenue', value: 'Rs. 4.5M', icon: '💰', color: 'emerald' },
          { label: 'Avg Rating', value: '4.7/5', icon: '⭐', color: 'indigo' }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl bg-${stat.color}-50 flex items-center justify-center text-2xl shadow-inner`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-xl font-black text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Halls List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Your Banquet Halls</h2>
          {ownerBanquets.map(b => (
            <div key={b.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 group hover:border-indigo-200 transition-colors">
              <img src={b.images[0]} className="w-24 h-24 rounded-xl object-cover" />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-gray-900">{b.name}</h3>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-700">Live</span>
                </div>
                <p className="text-sm text-gray-500 mb-2">{b.location}</p>
                <div className="flex gap-4 text-xs font-medium text-gray-400">
                  <span>Capacity: {b.capacity}</span>
                  <span>Price: Rs. {b.pricePerSlot.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                </button>
                <button className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Action */}
        <div className="space-y-6">
          <div className="bg-indigo-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <h3 className="text-xl font-bold mb-4">Subscription Status</h3>
            <p className="text-indigo-200 text-sm mb-6">You are currently on the <b className="text-white">Basic Plan</b>. Upgrade to get featured placement.</p>
            <div className="flex justify-between items-end mb-8">
              <div>
                <p className="text-xs uppercase font-bold text-indigo-400 mb-1">Renews in</p>
                <p className="text-3xl font-bold">12 Days</p>
              </div>
              <button className="bg-white text-indigo-900 px-4 py-2 rounded-xl text-sm font-bold shadow-lg hover:bg-indigo-50">Manage</button>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
             <h3 className="font-bold text-gray-900 mb-4">Quick Links</h3>
             <ul className="space-y-3 text-sm">
               <li><a href="#/availability" className="text-indigo-600 hover:underline flex items-center gap-2">Manage Availability Schedule →</a></li>
               <li><a href="#/" className="text-indigo-600 hover:underline flex items-center gap-2">View Booking Requests →</a></li>
               <li><a href="#/" className="text-indigo-600 hover:underline flex items-center gap-2">Update Hall Images →</a></li>
             </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
