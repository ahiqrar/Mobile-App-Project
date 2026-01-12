import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import SplashScreen from "./pages/SplashScreen";
import AuthScreen from "./pages/AuthScreen";
import HomeScreen from "./pages/HomeScreen";
import BanquetListScreen from "./pages/BanquetListScreen";
import BanquetDetailScreen from "./pages/BanquetDetailScreen";
import BookingScreen from "./pages/BookingScreen";
import BookingStatusScreen from "./pages/BookingStatusScreen";
import UserProfileScreen from "./pages/UserProfileScreen";
import OwnerDashboard from "./pages/owner/OwnerDashboard";
import AvailabilityManagement from "./pages/owner/AvailabilityManagement";
import SubscriptionScreen from "./pages/owner/SubscriptionScreen";
import AdminDashboard from "./pages/admin/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<SplashScreen />} />
          <Route path="/login" element={<AuthScreen />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/banquets" element={<BanquetListScreen />} />
          <Route path="/banquet/:id" element={<BanquetDetailScreen />} />
          <Route path="/booking/:id" element={<BookingScreen />} />
          <Route path="/bookings" element={<BookingStatusScreen />} />
          <Route path="/profile" element={<UserProfileScreen />} />
          
          {/* Owner Routes */}
          <Route path="/owner/dashboard" element={<OwnerDashboard />} />
          <Route path="/owner/availability" element={<AvailabilityManagement />} />
          <Route path="/owner/subscription" element={<SubscriptionScreen />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
