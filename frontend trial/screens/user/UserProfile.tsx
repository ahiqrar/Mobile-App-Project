
import React from 'react';
import { useApp } from '../../AppContext';
import { useNavigate } from 'react-router-dom';

const UserProfile: React.FC = () => {
  const { user, logout } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="h-32 bg-indigo-900 relative">
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
             <div className="w-24 h-24 rounded-full bg-indigo-100 border-4 border-white shadow-lg flex items-center justify-center text-3xl font-bold text-indigo-900">
               {user?.name.charAt(0)}
             </div>
          </div>
        </div>
        
        <div className="pt-16 pb-12 px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
          <p className="text-gray-500">{user?.email}</p>
          <div className="inline-block mt-3 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-widest">
            Member Since 2024
          </div>
          
          <div className="grid grid-cols-1 gap-4 mt-12 text-left">
             <button className="w-full p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition-colors">
               <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-indigo-600 shadow-sm">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                 </div>
                 <span className="font-bold text-gray-700">Edit Profile</span>
               </div>
               <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
             </button>

             <button 
                onClick={() => navigate('/bookings')}
                className="w-full p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition-colors"
              >
               <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-indigo-600 shadow-sm">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                 </div>
                 <span className="font-bold text-gray-700">My Bookings</span>
               </div>
               <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
             </button>

             <button className="w-full p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition-colors">
               <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-indigo-600 shadow-sm">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V5a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                 </div>
                 <span className="font-bold text-gray-700">Saved Cards</span>
               </div>
               <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
             </button>

             <button 
               onClick={handleLogout}
               className="w-full p-4 rounded-2xl bg-rose-50 hover:bg-rose-100 flex items-center justify-between transition-colors group"
             >
               <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-rose-600 shadow-sm group-hover:scale-110 transition-transform">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                 </div>
                 <span className="font-bold text-rose-600">Logout</span>
               </div>
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
