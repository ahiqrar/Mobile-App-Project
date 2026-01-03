import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Crown, Plus, Building2, Calendar, CreditCard, 
  BarChart3, Settings, LogOut, ChevronRight, Eye, Edit2, Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import banquet1 from "@/assets/banquet-1.jpg";
import banquet2 from "@/assets/banquet-2.jpg";

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const stats = [
    { label: "Total Venues", value: "2", icon: Building2, color: "text-primary" },
    { label: "Active Bookings", value: "8", icon: Calendar, color: "text-success" },
    { label: "This Month", value: "PKR 850K", icon: BarChart3, color: "text-accent" },
    { label: "Subscription", value: "Active", icon: CreditCard, color: "text-success" },
  ];

  const venues = [
    {
      id: "1",
      name: "Royal Palace Banquet",
      location: "DHA Phase 6, Karachi",
      image: banquet1,
      isHighlighted: true,
      bookings: 5,
      rating: 4.8,
    },
    {
      id: "2",
      name: "Grand Celebration Hall",
      location: "Gulshan-e-Iqbal, Karachi",
      image: banquet2,
      isHighlighted: false,
      bookings: 3,
      rating: 4.5,
    },
  ];

  const recentBookings = [
    { id: "1", venue: "Royal Palace Banquet", customer: "Ali Hassan", date: "Feb 15, 2026", status: "pending" },
    { id: "2", venue: "Royal Palace Banquet", customer: "Sara Ahmed", date: "Feb 20, 2026", status: "approved" },
    { id: "3", venue: "Grand Celebration Hall", customer: "Usman Khan", date: "Mar 5, 2026", status: "pending" },
  ];

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-gradient-dark text-primary-foreground">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center">
              <Crown className="w-5 h-5 text-foreground" />
            </div>
            <div>
              <span className="text-lg font-serif font-bold">BanquetBook</span>
              <p className="text-xs text-primary-foreground/70">Owner Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="glass" size="sm" onClick={() => navigate("/owner/settings")}>
              <Settings className="w-4 h-4" />
            </Button>
            <Button variant="glass" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-card rounded-xl border border-border p-4 shadow-elegant"
            >
              <div className="flex items-center gap-3 mb-2">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* My Venues */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-serif font-bold text-foreground">My Venues</h2>
              <Button variant="hero" size="sm">
                <Plus className="w-4 h-4" />
                Add Venue
              </Button>
            </div>
            <div className="space-y-4">
              {venues.map((venue, index) => (
                <motion.div
                  key={venue.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-card rounded-xl border border-border overflow-hidden shadow-elegant"
                >
                  <div className="flex flex-col sm:flex-row">
                    <div className="relative">
                      <img
                        src={venue.image}
                        alt={venue.name}
                        className="w-full sm:w-40 h-32 object-cover"
                      />
                      {venue.isHighlighted && (
                        <div className="absolute top-2 left-2 featured-badge flex items-center gap-1 text-xs">
                          <Crown className="w-3 h-3" />
                          Featured
                        </div>
                      )}
                    </div>
                    <div className="flex-1 p-4">
                      <h3 className="font-serif font-semibold text-foreground mb-1">{venue.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{venue.location}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{venue.bookings} active bookings</span>
                        <span>⭐ {venue.rating}</span>
                      </div>
                    </div>
                    <div className="flex sm:flex-col items-center justify-center gap-2 p-4 border-t sm:border-t-0 sm:border-l border-border">
                      <Button variant="ghost" size="icon" onClick={() => navigate(`/owner/venue/${venue.id}`)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="h-auto py-4 flex flex-col items-center gap-2"
                onClick={() => navigate("/owner/availability")}
              >
                <Calendar className="w-6 h-6" />
                <span>Manage Availability</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-4 flex flex-col items-center gap-2"
                onClick={() => navigate("/owner/subscription")}
              >
                <CreditCard className="w-6 h-6" />
                <span>Subscription</span>
              </Button>
            </div>
          </div>

          {/* Recent Bookings */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-serif font-bold text-foreground">Recent Bookings</h2>
              <Button variant="ghost" size="sm">
                View All
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              {recentBookings.map((booking, index) => (
                <div
                  key={booking.id}
                  className={`p-4 ${index !== recentBookings.length - 1 ? "border-b border-border" : ""}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-foreground">{booking.customer}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      booking.status === "approved" 
                        ? "bg-success/10 text-success" 
                        : "bg-warning/10 text-warning"
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{booking.venue}</p>
                  <p className="text-sm text-muted-foreground">{booking.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OwnerDashboard;
