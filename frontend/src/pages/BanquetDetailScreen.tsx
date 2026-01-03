import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, Star, MapPin, Users, Phone, Mail, 
  Crown, ChevronLeft, ChevronRight, Check, Sun, Sunset, Moon, Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { banquets } from "@/data/banquets";
import { useToast } from "@/hooks/use-toast";

const BanquetDetailScreen = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentImage, setCurrentImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  
  const banquet = banquets.find((b) => b.id === id);

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

  const slotIcons = {
    morning: Sun,
    evening: Sunset,
    night: Moon,
  };

  const slotLabels = {
    morning: "Morning (9AM - 2PM)",
    evening: "Evening (3PM - 8PM)",
    night: "Night (9PM - 2AM)",
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % banquet.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + banquet.images.length) % banquet.images.length);
  };

  const handleContact = (type: "phone" | "email") => {
    if (type === "phone") {
      window.open(`tel:${banquet.contactPhone}`, "_blank");
    } else {
      window.open(`mailto:${banquet.contactEmail}`, "_blank");
    }
    toast({
      title: "Contact initiated",
      description: type === "phone" ? "Opening phone dialer..." : "Opening email client...",
    });
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Image Gallery */}
      <div className="relative h-[50vh] min-h-[350px]">
        <motion.img
          key={currentImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          src={banquet.images[currentImage]}
          alt={banquet.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-foreground/30" />
        
        {/* Navigation */}
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="p-3 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`p-3 rounded-full backdrop-blur-sm transition-colors ${
              isLiked ? "bg-primary text-primary-foreground" : "bg-background/80 hover:bg-background"
            }`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Image controls */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Image indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {banquet.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentImage === index ? "w-6 bg-primary-foreground" : "bg-primary-foreground/50"
              }`}
            />
          ))}
        </div>

        {banquet.isHighlighted && (
          <div className="absolute bottom-4 left-4 featured-badge flex items-center gap-1">
            <Crown className="w-3 h-3" />
            Featured Venue
          </div>
        )}
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 -mt-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card rounded-2xl shadow-elegant border border-border p-6 mb-6"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-2">
                {banquet.name}
              </h1>
              <p className="text-muted-foreground flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {banquet.location}, {banquet.city}
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 justify-end mb-1">
                <Star className="w-5 h-5 text-accent fill-accent" />
                <span className="text-xl font-bold">{banquet.rating}</span>
              </div>
              <p className="text-sm text-muted-foreground flex items-center gap-1 justify-end">
                <Users className="w-4 h-4" />
                Up to {banquet.capacity} guests
              </p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-6">
            {banquet.description}
          </p>

          {/* Price */}
          <div className="bg-secondary/50 rounded-xl p-4 mb-6">
            <p className="text-sm text-muted-foreground mb-1">Starting from</p>
            <p className="text-3xl font-bold text-primary">
              PKR {banquet.price.toLocaleString()}
            </p>
          </div>

          {/* Available Time Slots */}
          <div className="mb-6">
            <h3 className="font-semibold text-foreground mb-3">Available Time Slots</h3>
            <div className="grid grid-cols-3 gap-3">
              {(["morning", "evening", "night"] as const).map((slot) => {
                const Icon = slotIcons[slot];
                const isAvailable = banquet.availableSlots.includes(slot);
                return (
                  <div
                    key={slot}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 ${
                      isAvailable
                        ? "border-success/30 bg-success/5"
                        : "border-border bg-muted/30 opacity-50"
                    }`}
                  >
                    <Icon className={`w-6 h-6 ${isAvailable ? "text-success" : "text-muted-foreground"}`} />
                    <span className={`text-sm font-medium capitalize ${isAvailable ? "text-success" : "text-muted-foreground"}`}>
                      {slot}
                    </span>
                    {isAvailable && <Check className="w-4 h-4 text-success" />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Amenities */}
          <div className="mb-6">
            <h3 className="font-semibold text-foreground mb-3">Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {banquet.amenities.map((amenity) => (
                <span
                  key={amenity}
                  className="px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => handleContact("phone")}
            >
              <Phone className="w-4 h-4" />
              Call
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => handleContact("email")}
            >
              <Mail className="w-4 h-4" />
              Email
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Starting from</p>
            <p className="text-2xl font-bold text-primary">PKR {banquet.price.toLocaleString()}</p>
          </div>
          <Button
            variant="hero"
            size="lg"
            onClick={() => navigate(`/booking/${banquet.id}`)}
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BanquetDetailScreen;
