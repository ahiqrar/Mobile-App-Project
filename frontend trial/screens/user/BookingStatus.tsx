
import React from 'react';
import { useApp } from '../../AppContext';

const BookingStatus: React.FC = () => {
  const { bookings, banquets } = useApp();

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="text-3xl font-serif font-bold text-indigo-900 mb-8">My Booking History</h2>

      {bookings.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl text-center border border-gray-100 shadow-sm">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>
          <p className="text-gray-500 font-medium">You haven't made any bookings yet.</p>
          <button className="mt-4 text-indigo-600 font-bold hover:underline">Browse Venues</button>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map(booking => {
            const banquet = banquets.find(b => b.id === booking.banquetId);
            return (
              <div key={booking.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="w-full md:w-32 h-24 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                   <img src={banquet?.images[0]} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{banquet?.name || 'Venue'}</h3>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      booking.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 
                      booking.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 
                      'bg-rose-100 text-rose-700'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400 text-[10px] uppercase font-bold">Date</p>
                      <p className="font-medium text-gray-700">{booking.date}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-[10px] uppercase font-bold">Slot</p>
                      <p className="font-medium text-gray-700">{booking.timeSlot}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-[10px] uppercase font-bold">Price</p>
                      <p className="font-medium text-gray-700">Rs. {booking.totalPrice.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-[10px] uppercase font-bold">Booking ID</p>
                      <p className="font-medium text-gray-700">#{booking.id.toUpperCase()}</p>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-auto flex md:flex-col gap-2">
                   <button className="flex-1 px-4 py-2 text-xs font-bold text-indigo-600 hover:bg-indigo-50 rounded-lg border border-indigo-100 transition-colors">Details</button>
                   {booking.status === 'Pending' && (
                     <button className="flex-1 px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-lg border border-rose-100 transition-colors">Cancel</button>
                   )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BookingStatus;
