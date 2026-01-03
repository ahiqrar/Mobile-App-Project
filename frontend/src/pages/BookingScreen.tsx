import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, User, Phone, Mail, Check, Sun, Sunset, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { banquets } from "@/data/banquets";
import { useToast } from "@/hooks/use-toast";

const BookingScreen = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const banquet = banquets.find((b) => b.id === id);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    timeSlot: "",
    guests: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!banquet) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-serif font-bold mb-4">Venue not found</h2>
          <Button onClick={() => navigate("/banquets")}>Back to List</Button>
        </div>
      </div>
    );
  }

  const slotOptions = [
    { id: "morning", label: "Morning", time: "9:00 AM - 2:00 PM", icon: Sun },
    { id: "evening", label: "Evening", time: "3:00 PM - 8:00 PM", icon: Sunset },
    { id: "night", label: "Night", time: "9:00 PM - 2:00 AM", icon: Moon },
  ].filter((slot) => banquet.availableSlots.includes(slot.id as any));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.timeSlot) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast({
      title: "Booking Request Sent!",
      description: "The venue owner will contact you shortly to confirm your booking.",
    });

    navigate("/bookings");
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-serif font-bold text-foreground">Book Venue</h1>
            <p className="text-sm text-muted-foreground">{banquet.name}</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Details */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-lg font-serif font-semibold text-foreground mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Your Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+92 300 1234567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="h-12"
                    />
                  </div>
                </div>
              </div>

              {/* Event Details */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-lg font-serif font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Event Details
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Event Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="guests">Expected Guests</Label>
                      <Input
                        id="guests"
                        type="number"
                        placeholder="Number of guests"
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        className="h-12"
                      />
                    </div>
                  </div>

                  {/* Time Slot Selection */}
                  <div className="space-y-3">
                    <Label>Preferred Time Slot *</Label>
                    <div className="grid grid-cols-3 gap-3">
                      {slotOptions.map((slot) => {
                        const Icon = slot.icon;
                        return (
                          <button
                            key={slot.id}
                            type="button"
                            onClick={() => setFormData({ ...formData, timeSlot: slot.id })}
                            className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                              formData.timeSlot === slot.id
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            <Icon className={`w-6 h-6 ${formData.timeSlot === slot.id ? "text-primary" : "text-muted-foreground"}`} />
                            <span className={`font-medium text-sm ${formData.timeSlot === slot.id ? "text-primary" : "text-foreground"}`}>
                              {slot.label}
                            </span>
                            <span className="text-xs text-muted-foreground">{slot.time}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Additional Message</Label>
                    <textarea
                      id="message"
                      placeholder="Any special requests or requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground resize-none focus:ring-2 focus:ring-ring focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                variant="hero"
                size="xl"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Booking Request"}
              </Button>
            </form>
          </motion.div>

          {/* Venue Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-card rounded-xl border border-border overflow-hidden sticky top-24">
              <img
                src={banquet.image}
                alt={banquet.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="font-serif font-semibold text-foreground mb-1">{banquet.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{banquet.location}, {banquet.city}</p>
                
                <div className="border-t border-border pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Base Price</span>
                    <span className="font-medium">PKR {banquet.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Capacity</span>
                    <span className="font-medium">Up to {banquet.capacity} guests</span>
                  </div>
                </div>
                
                <div className="border-t border-border mt-4 pt-4">
                  <p className="text-xs text-muted-foreground">
                    * Final pricing will be confirmed by the venue owner based on your requirements.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default BookingScreen;
