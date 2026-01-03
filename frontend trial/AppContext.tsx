
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Banquet, Booking, Role } from './types';
import { MOCK_USERS, MOCK_BANQUETS } from './constants';

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  banquets: Banquet[];
  setBanquets: React.Dispatch<React.SetStateAction<Banquet[]>>;
  bookings: Booking[];
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
  loading: boolean;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [banquets, setBanquets] = useState<Banquet[]>(MOCK_BANQUETS);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial splash loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const logout = () => {
    setUser(null);
  };

  return (
    <AppContext.Provider value={{ user, setUser, banquets, setBanquets, bookings, setBookings, loading, logout }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
