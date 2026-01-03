
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../AppContext';
import { TimeSlot } from '../../types';

const BanquetDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { banquets } = useApp();
  const [activeImage, setActiveImage] = useState(0);

  const banquet = banquets.find(b => b.id === id);

  if (!banquet) return <div className="p-10 text-center">Banquet not found</div>;

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-8 pb-12">
      {/* Media Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[400px]">
        <div className="md:col-span-2 relative rounded-3xl overflow-hidden shadow-xl">
          <img src={banquet.images[activeImage]} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          <div className="absolute bottom-6 left-6 text-white">
             <h1 className="text-4xl font-serif font-bold">{banquet.name}</h1>
             <p className="flex items-center gap-2 text-gray-200 mt-2">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
               {banquet.location}
             </p>
          </div>
        </div>
        <div className="hidden md:flex flex-col gap-4">
          {banquet.images.map((img, idx) => (
            <button 
              key={idx} 
              onClick={() => setActiveImage(idx)}
              className={`flex-1 rounded-2xl overflow-hidden border-4 transition-all ${activeImage === idx ? 'border-indigo-600 shadow-lg' : 'border-transparent'}`}
            >
              <img src={img} className="w-full h-full object-cover" />
            </button>
          ))}
          {banquet.images.length === 1 && (
             <div className="flex-1 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400">
               <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
             </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Info Column */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">About Venue</h2>
            <p className="text-gray-600 leading-relaxed">{banquet.description}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
              <div className="p-4 bg-indigo-50 rounded-2xl">
                <p className="text-xs font-bold text-indigo-700 uppercase mb-1">Capacity</p>
                <p className="text-lg font-bold text-indigo-900">{banquet.capacity} Persons</p>
              </div>
              <div className="p-4 bg-amber-50 rounded-2xl">
                <p className="text-xs font-bold text-amber-700 uppercase mb-1">Rating</p>
                <p className="text-lg font-bold text-amber-900">{banquet.rating} / 5.0</p>
              </div>
              <div className="p-4 bg-emerald-50 rounded-2xl">
                <p className="text-xs font-bold text-emerald-700 uppercase mb-1">Price</p>
                <p className="text-lg font-bold text-emerald-900">Rs. {banquet.pricePerSlot.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Available Time Slots</h2>
            <div className="flex flex-col gap-3">
              {(['Morning', 'Evening', 'Night'] as TimeSlot[]).map(slot => (
                <div key={slot} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-500 border border-gray-200 shadow-sm">
                      {slot === 'Morning' ? '☀️' : slot === 'Evening' ? '🌅' : '🌙'}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{slot}</p>
                      <p className="text-xs text-gray-500">{slot === 'Morning' ? '9:00 AM - 2:00 PM' : slot === 'Evening' ? '3:00 PM - 8:00 PM' : '9:00 PM - 2:00 AM'}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">Available</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar/Booking Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white p-8 rounded-3xl border border-gray-100 shadow-xl space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Quick Booking</h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Slot Charge</span>
                <span className="font-bold">Rs. {banquet.pricePerSlot.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Service Fee</span>
                <span className="font-bold">Rs. 2,500</span>
              </div>
              <div className="pt-4 border-t flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-indigo-600">Rs. {(banquet.pricePerSlot + 2500).toLocaleString()}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-4">
              <button 
                onClick={() => navigate(`/book/${banquet.id}`)}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-100 transition-all active:scale-95"
              >
                Book Now
              </button>
              <button className="w-full bg-white border border-gray-200 text-gray-700 font-bold py-4 rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                Contact Owner
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BanquetDetail;
