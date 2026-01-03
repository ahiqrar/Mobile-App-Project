import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, CheckCircle2, XCircle, Calendar, MapPin, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import banquet1 from "@/assets/banquet-1.jpg";
import banquet2 from "@/assets/banquet-2.jpg";

type BookingStatus = "pending" | "approved" | "rejected";

interface Booking {
  id: string;
  venueName: string;
  venueImage: string;
  location: string;
  date: string;
  timeSlot: string;
  guests: number;
  status: BookingStatus;
  price: number;
}

const BookingStatusScreen = () => {
  const navigate = useNavigate();
  
  // Mock booking data
  const [bookings] = useState<Booking[]>([
    {
      id: "1",
      venueName: "Royal Palace Banquet",
      venueImage: banquet1,
      location: "DHA Phase 6, Karachi",
      date: "2026-02-15",
      timeSlot: "Evening",
      guests: 300,
      status: "approved",
      price: 250000,
    },
    {
      id: "2",
      venueName: "Grand Celebration Hall",
      venueImage: banquet2,
      location: "Gulshan-e-Iqbal, Karachi",
      date: "2026-03-20",
      timeSlot: "Night",
      guests: 200,
      status: "pending",
      price: 180000,
    },
    {
      id: "3",
      venueName: "Garden Paradise Venue",
      venueImage: banquet1,
      location: "Bahria Town, Lahore",
      date: "2026-01-10",
      timeSlot: "Evening",
      guests: 400,
      status: "rejected",
      price: 320000,
    },
  ]);

  const statusConfig = {
    pending: {
      label: "Pending",
      color: "text-warning",
      bg: "bg-warning/10",
      icon: Clock,
    },
    approved: {
      label: "Approved",
      color: "text-success",
      bg: "bg-success/10",
      icon: CheckCircle2,
    },
    rejected: {
      label: "Rejected",
      color: "text-destructive",
      bg: "bg-destructive/10",
      icon: XCircle,
    },
  };

  const [activeTab, setActiveTab] = useState<BookingStatus | "all">("all");

  const filteredBookings = activeTab === "all" 
    ? bookings 
    : bookings.filter((b) => b.status === activeTab);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate("/home")}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-serif font-bold text-foreground">My Bookings</h1>
            <p className="text-sm text-muted-foreground">{bookings.length} total bookings</p>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[
            { id: "all", label: "All" },
            { id: "pending", label: "Pending" },
            { id: "approved", label: "Approved" },
            { id: "rejected", label: "Rejected" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      <main className="max-w-4xl mx-auto px-6 pb-12">
        {filteredBookings.length > 0 ? (
          <div className="space-y-4">
            {filteredBookings.map((booking, index) => {
              const StatusIcon = statusConfig[booking.status].icon;
              return (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-card rounded-xl border border-border overflow-hidden shadow-elegant"
                >
                  <div className="flex flex-col sm:flex-row">
                    <img
                      src={booking.venueImage}
                      alt={booking.venueName}
                      className="w-full sm:w-40 h-32 sm:h-auto object-cover"
                    />
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-serif font-semibold text-foreground">{booking.venueName}</h3>
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig[booking.status].bg} ${statusConfig[booking.status].color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {statusConfig[booking.status].label}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mb-3">
                        <MapPin className="w-4 h-4" />
                        {booking.location}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {new Date(booking.date).toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {booking.timeSlot}
                        </span>
                      </div>
                      <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{booking.guests} guests</span>
                        <span className="font-semibold text-primary">PKR {booking.price.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No bookings found</h3>
            <p className="text-muted-foreground mb-6">Start exploring venues to make your first booking</p>
            <Button variant="hero" onClick={() => navigate("/banquets")}>
              Browse Venues
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default BookingStatusScreen;
