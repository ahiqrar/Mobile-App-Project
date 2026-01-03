
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import { AppProvider, useApp } from './AppContext';

// Screens
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import UserHome from './screens/user/UserHome';
import BanquetList from './screens/user/BanquetList';
import BanquetDetail from './screens/user/BanquetDetail';
import BookingScreen from './screens/user/BookingScreen';
import BookingStatus from './screens/user/BookingStatus';
import UserProfile from './screens/user/UserProfile';
import OwnerDashboard from './screens/owner/OwnerDashboard';
import AvailabilityManagement from './screens/owner/AvailabilityManagement';
import SubscriptionScreen from './screens/owner/SubscriptionScreen';
import AdminDashboard from './screens/admin/AdminDashboard';

const AppContent: React.FC = () => {
  const { user, loading } = useApp();

  if (loading) {
    return <SplashScreen />;
  }

  if (!user) {
    return (
      <Routes>
        <Route path="*" element={<LoginScreen />} />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Dynamic Navbar based on Role */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 px-4 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-serif font-bold text-indigo-900">SimpleWords</Link>
          <div className="flex items-center gap-4 text-sm font-medium">
            {user.role === 'user' && (
              <>
                <Link to="/" className="text-gray-600 hover:text-indigo-600">Search</Link>
                <Link to="/bookings" className="text-gray-600 hover:text-indigo-600">My Bookings</Link>
                <Link to="/profile" className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700">
                  {user.name.charAt(0)}
                </Link>
              </>
            )}
            {user.role === 'owner' && (
              <>
                <Link to="/" className="text-gray-600 hover:text-indigo-600">Dashboard</Link>
                <Link to="/availability" className="text-gray-600 hover:text-indigo-600">Schedule</Link>
                <Link to="/subscription" className="text-gray-600 hover:text-indigo-600">Subscription</Link>
              </>
            )}
            {user.role === 'admin' && (
              <>
                <Link to="/" className="text-gray-600 hover:text-indigo-600">System Control</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 pb-20 md:pb-6">
        <Routes>
          {/* User Routes */}
          {user.role === 'user' && (
            <>
              <Route path="/" element={<UserHome />} />
              <Route path="/list" element={<BanquetList />} />
              <Route path="/banquet/:id" element={<BanquetDetail />} />
              <Route path="/book/:id" element={<BookingScreen />} />
              <Route path="/bookings" element={<BookingStatus />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}

          {/* Owner Routes */}
          {user.role === 'owner' && (
            <>
              <Route path="/" element={<OwnerDashboard />} />
              <Route path="/availability" element={<AvailabilityManagement />} />
              <Route path="/subscription" element={<SubscriptionScreen />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}

          {/* Admin Routes */}
          {user.role === 'admin' && (
            <>
              <Route path="/" element={<AdminDashboard />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </main>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-3">
        {user.role === 'user' ? (
          <>
            <Link to="/" className="flex flex-col items-center text-gray-500 hover:text-indigo-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              <span className="text-[10px]">Explore</span>
            </Link>
            <Link to="/bookings" className="flex flex-col items-center text-gray-500 hover:text-indigo-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              <span className="text-[10px]">Bookings</span>
            </Link>
            <Link to="/profile" className="flex flex-col items-center text-gray-500 hover:text-indigo-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
              <span className="text-[10px]">Profile</span>
            </Link>
          </>
        ) : (
          <Link to="/" className="flex flex-col items-center text-indigo-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>
            <span className="text-[10px]">Dashboard</span>
          </Link>
        )}
      </div>
    </div>
  );
};

const App: React.FC = () => (
  <AppProvider>
    <HashRouter>
      <AppContent />
    </HashRouter>
  </AppProvider>
);

export default App;
