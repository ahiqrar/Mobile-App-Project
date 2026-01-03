import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, Search, MapPin, Crown, User, Sun, Sunset, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cities, months, timeSlots } from "@/data/banquets";
import heroBanquet from "@/assets/hero-banquet.jpg";

const HomeScreen = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>(months[new Date().getMonth()]);
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("All Cities");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedDate) params.set("date", selectedDate);
    if (selectedMonth) params.set("month", selectedMonth);
    if (selectedSlot) params.set("slot", selectedSlot);
    if (selectedCity !== "All Cities") params.set("city", selectedCity);
    navigate(`/banquets?${params.toString()}`);
  };

  const slotIcons = {
    morning: Sun,
    evening: Sunset,
    night: Moon,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[70vh] min-h-[500px]">
        <img
          src={heroBanquet}
          alt="Luxury banquet venue"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-background" />
        
        {/* Navigation */}
        <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center">
              <Crown className="w-5 h-5 text-foreground" />
            </div>
            <span className="text-xl font-serif font-bold text-primary-foreground">BanquetBook</span>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="glass" 
              size="sm" 
              onClick={() => navigate("/profile")}
              className="hidden sm:flex"
            >
              <User className="w-4 h-4" />
              Profile
            </Button>
            <Button 
              variant="gold" 
              size="sm" 
              onClick={() => navigate("/bookings")}
            >
              My Bookings
            </Button>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-[calc(100%-100px)] px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-serif font-bold text-primary-foreground mb-4"
          >
            Find Your Dream
            <span className="block text-gradient-gold">Venue</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mb-8"
          >
            Discover and book the finest banquet halls for weddings, corporate events, and celebrations
          </motion.p>
        </div>
      </div>

      {/* Search Box */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative z-20 max-w-5xl mx-auto px-6 -mt-24"
      >
        <div className="bg-card rounded-2xl shadow-elegant p-6 md:p-8 border border-border">
          <h2 className="text-xl font-serif font-semibold text-foreground mb-6">Search Available Venues</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Date Picker */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Select Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full h-12 px-4 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
              />
            </div>

            {/* Month Selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Select Month
              </label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full h-12 px-4 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
              >
                {months.map((month) => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>

            {/* City Selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Select City
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full h-12 px-4 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
              >
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <Button variant="hero" size="lg" className="w-full" onClick={handleSearch}>
                <Search className="w-5 h-5" />
                Search
              </Button>
            </div>
          </div>

          {/* Time Slot Selector */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Preferred Time Slot
            </label>
            <div className="grid grid-cols-3 gap-3">
              {timeSlots.map((slot) => {
                const Icon = slotIcons[slot.id];
                return (
                  <button
                    key={slot.id}
                    onClick={() => setSelectedSlot(slot.id === selectedSlot ? "" : slot.id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                      selectedSlot === slot.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <Icon className={`w-6 h-6 ${selectedSlot === slot.id ? "text-primary" : "text-muted-foreground"}`} />
                    <span className={`font-medium ${selectedSlot === slot.id ? "text-primary" : "text-foreground"}`}>
                      {slot.label}
                    </span>
                    <span className="text-xs text-muted-foreground">{slot.time}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Features Section */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h3 className="text-2xl font-serif font-bold text-foreground text-center mb-12">Why Choose BanquetBook?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Verified Venues",
              description: "All venues are personally verified for quality and authenticity",
              icon: "✓",
            },
            {
              title: "Best Prices",
              description: "Compare prices and find the best deals for your budget",
              icon: "₨",
            },
            {
              title: "Easy Booking",
              description: "Book your perfect venue in just a few clicks",
              icon: "📅",
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 rounded-xl bg-card border border-border shadow-elegant card-hover"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-gold flex items-center justify-center mx-auto mb-4 text-2xl">
                {feature.icon}
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h4>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomeScreen;
