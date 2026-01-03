
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../AppContext';
import { TimeSlot, Booking } from '../../types';

const BookingScreen: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { banquets, user, setBookings } = useApp();
  const [date, setDate] = useState('');
  const [slot, setSlot] = useState<TimeSlot>('Evening');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const banquet = banquets.find(b => b.id === id);

  if (!banquet) return <div className="p-10 text-center">Banquet not found</div>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) {
      alert("Please select a date");
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      const newBooking: Booking = {
        id: Math.random().toString(36).substr(2, 9),
        banquetId: banquet.id,
        userId: user?.id || 'anon',
        date,
        timeSlot: slot,
        status: 'Pending',
        totalPrice: banquet.pricePerSlot + 2500,
      };
      setBookings(prev => [...prev, newBooking]);
      setIsSubmitting(false);
      navigate('/bookings');
    }, 1500);
  };

  return (
    <div className="max-w-xl mx-auto py-8">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-indigo-900 p-8 text-white text-center">
          <h2 className="text-3xl font-serif font-bold mb-2">Confirm Booking</h2>
          <p className="text-indigo-200">You are booking {banquet.name}</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Select Date</label>
              <input 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-gray-50 px-5 py-4 rounded-xl border-none outline-none ring-1 ring-gray-200 focus:ring-2 focus:ring-indigo-500 font-medium"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Time Slot</label>
              <div className="grid grid-cols-3 gap-3">
                {(['Morning', 'Evening', 'Night'] as TimeSlot[]).map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSlot(s)}
                    className={`py-3 rounded-xl text-xs font-bold border transition-all ${slot === s ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-indigo-50 p-6 rounded-2xl space-y-3">
            <h4 className="font-bold text-indigo-900">Summary</h4>
            <div className="flex justify-between text-sm text-indigo-700">
              <span>Hall Charges</span>
              <span>Rs. {banquet.pricePerSlot.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm text-indigo-700">
              <span>Security Deposit</span>
              <span>Rs. 2,500</span>
            </div>
            <div className="pt-3 border-t border-indigo-200 flex justify-between items-center text-lg font-bold text-indigo-900">
              <span>Grand Total</span>
              <span>Rs. {(banquet.pricePerSlot + 2500).toLocaleString()}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full font-bold py-5 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white active:scale-95'}`}
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Processing...
              </>
            ) : (
              'Submit Booking Request'
            )}
          </button>
          
          <p className="text-center text-xs text-gray-400">By clicking submit, you agree to our terms and conditions for venue booking.</p>
        </form>
      </div>
    </div>
  );
};

export default BookingScreen;
