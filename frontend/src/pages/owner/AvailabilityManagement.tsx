import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Check, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

type SlotStatus = "free" | "booked" | "blocked";

interface DaySlots {
  morning: SlotStatus;
  evening: SlotStatus;
  night: SlotStatus;
}

const AvailabilityManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedVenue, setSelectedVenue] = useState("1");
  
  // Mock availability data
  const [availability, setAvailability] = useState<Record<string, DaySlots>>({
    "2026-02-15": { morning: "booked", evening: "free", night: "free" },
    "2026-02-16": { morning: "free", evening: "booked", night: "blocked" },
    "2026-02-20": { morning: "free", evening: "free", night: "booked" },
  });

  const venues = [
    { id: "1", name: "Royal Palace Banquet" },
    { id: "2", name: "Grand Celebration Hall" },
  ];

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const monthName = currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const getDateKey = (day: number) => {
    const month = (currentMonth.getMonth() + 1).toString().padStart(2, "0");
    const dayStr = day.toString().padStart(2, "0");
    return `${currentMonth.getFullYear()}-${month}-${dayStr}`;
  };

  const getDaySlots = (day: number): DaySlots => {
    const key = getDateKey(day);
    return availability[key] || { morning: "free", evening: "free", night: "free" };
  };

  const toggleSlot = (day: number, slot: keyof DaySlots) => {
    const key = getDateKey(day);
    const currentSlots = getDaySlots(day);
    const currentStatus = currentSlots[slot];
    
    // Cycle through: free -> blocked -> free (can't manually set booked)
    const newStatus: SlotStatus = currentStatus === "booked" 
      ? "booked" 
      : currentStatus === "free" 
        ? "blocked" 
        : "free";
    
    setAvailability({
      ...availability,
      [key]: { ...currentSlots, [slot]: newStatus },
    });

    toast({
      title: "Availability updated",
      description: `${slot.charAt(0).toUpperCase() + slot.slice(1)} slot ${newStatus === "blocked" ? "blocked" : "opened"}`,
    });
  };

  const statusColors = {
    free: "bg-success/20 text-success border-success/30",
    booked: "bg-primary/20 text-primary border-primary/30",
    blocked: "bg-muted text-muted-foreground border-border",
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate("/owner/dashboard")}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-serif font-bold text-foreground">Availability</h1>
            <p className="text-sm text-muted-foreground">Manage your venue calendar</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Venue Selector */}
        <div className="mb-6">
          <label className="text-sm font-medium text-muted-foreground mb-2 block">Select Venue</label>
          <select
            value={selectedVenue}
            onChange={(e) => setSelectedVenue(e.target.value)}
            className="w-full h-12 px-4 rounded-lg border border-input bg-background text-foreground"
          >
            {venues.map((venue) => (
              <option key={venue.id} value={venue.id}>{venue.name}</option>
            ))}
          </select>
        </div>

        {/* Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card rounded-xl border border-border p-6"
        >
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-6">
            <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-secondary">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-serif font-semibold">{monthName}</h2>
            <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-secondary">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mb-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-success/20 border border-success/30" />
              <span className="text-muted-foreground">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-primary/20 border border-primary/30" />
              <span className="text-muted-foreground">Booked</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-muted border border-border" />
              <span className="text-muted-foreground">Blocked</span>
            </div>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Empty cells for days before the first of the month */}
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}
            
            {/* Days of the month */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const slots = getDaySlots(day);
              const isPast = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day) < new Date();
              
              return (
                <div
                  key={day}
                  className={`aspect-square p-1 rounded-lg border ${isPast ? "opacity-50" : ""} ${
                    Object.values(slots).some(s => s === "booked") ? "border-primary/30 bg-primary/5" : "border-border"
                  }`}
                >
                  <div className="text-xs font-medium mb-1 text-center">{day}</div>
                  <div className="space-y-0.5">
                    {(["morning", "evening", "night"] as const).map((slot) => (
                      <button
                        key={slot}
                        onClick={() => !isPast && toggleSlot(day, slot)}
                        disabled={isPast || slots[slot] === "booked"}
                        className={`w-full h-1.5 rounded-sm transition-colors ${statusColors[slots[slot]]} ${
                          isPast || slots[slot] === "booked" ? "cursor-not-allowed" : "cursor-pointer hover:opacity-80"
                        }`}
                        title={`${slot}: ${slots[slot]}`}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Help Text */}
        <p className="text-sm text-muted-foreground text-center mt-6">
          Tap on time slots to toggle between available and blocked. Booked slots cannot be changed.
        </p>
      </main>
    </div>
  );
};

export default AvailabilityManagement;
