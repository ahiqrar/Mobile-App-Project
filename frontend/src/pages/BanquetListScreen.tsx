import { useState, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Filter, MapPin, Star, Users, Crown, ArrowLeft, 
  SlidersHorizontal, X, ChevronDown 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { banquets, Banquet, cities } from "@/data/banquets";

const BanquetListScreen = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showFilter, setShowFilter] = useState(false);
  
  // Filter states
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
  const [selectedCity, setSelectedCity] = useState<string>(searchParams.get("city") || "All Cities");
  const [minCapacity, setMinCapacity] = useState<number>(0);
  const [minRating, setMinRating] = useState<number>(0);
  const [highlightedOnly, setHighlightedOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("featured");

  const filteredBanquets = useMemo(() => {
    let result = banquets.filter((b) => {
      if (selectedCity !== "All Cities" && b.city !== selectedCity) return false;
      if (b.price < priceRange[0] || b.price > priceRange[1]) return false;
      if (b.capacity < minCapacity) return false;
      if (b.rating < minRating) return false;
      if (highlightedOnly && !b.isHighlighted) return false;
      return true;
    });

    // Sort
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "featured":
      default:
        result.sort((a, b) => (b.isHighlighted ? 1 : 0) - (a.isHighlighted ? 1 : 0));
        break;
    }

    return result;
  }, [selectedCity, priceRange, minCapacity, minRating, highlightedOnly, sortBy]);

  const BanquetCard = ({ banquet, index }: { banquet: Banquet; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-card rounded-xl overflow-hidden border border-border shadow-elegant card-hover cursor-pointer"
      onClick={() => navigate(`/banquet/${banquet.id}`)}
    >
      <div className="relative">
        <img
          src={banquet.image}
          alt={banquet.name}
          className="w-full h-48 object-cover"
        />
        {banquet.isHighlighted && (
          <div className="absolute top-3 left-3 featured-badge flex items-center gap-1">
            <Crown className="w-3 h-3" />
            Featured
          </div>
        )}
        <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
          <Star className="w-4 h-4 text-accent fill-accent" />
          <span className="font-semibold text-sm">{banquet.rating}</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-serif font-semibold text-lg text-foreground mb-1">{banquet.name}</h3>
        <p className="text-muted-foreground text-sm flex items-center gap-1 mb-3">
          <MapPin className="w-4 h-4" />
          {banquet.location}, {banquet.city}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <Users className="w-4 h-4" />
            {banquet.capacity} guests
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Starting from</p>
            <p className="text-lg font-bold text-primary">
              PKR {banquet.price.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate("/home")}
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-serif font-bold text-foreground">Available Venues</h1>
              <p className="text-sm text-muted-foreground">{filteredBanquets.length} venues found</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilter(true)}
            className="flex items-center gap-2"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </Button>
        </div>
      </header>

      {/* Sort Bar */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4 overflow-x-auto">
        <span className="text-sm text-muted-foreground whitespace-nowrap">Sort by:</span>
        {[
          { id: "featured", label: "Featured" },
          { id: "price-low", label: "Price: Low to High" },
          { id: "price-high", label: "Price: High to Low" },
          { id: "rating", label: "Top Rated" },
        ].map((option) => (
          <button
            key={option.id}
            onClick={() => setSortBy(option.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              sortBy === option.id
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Banquet Grid */}
      <main className="max-w-7xl mx-auto px-6 pb-12">
        {filteredBanquets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBanquets.map((banquet, index) => (
              <BanquetCard key={banquet.id} banquet={banquet} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Filter className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No venues found</h3>
            <p className="text-muted-foreground mb-6">Try adjusting your filters</p>
            <Button variant="outline" onClick={() => {
              setPriceRange([0, 500000]);
              setSelectedCity("All Cities");
              setMinCapacity(0);
              setMinRating(0);
              setHighlightedOnly(false);
            }}>
              Reset Filters
            </Button>
          </div>
        )}
      </main>

      {/* Filter Modal */}
      {showFilter && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-foreground/50 backdrop-blur-sm flex items-end md:items-center justify-center"
          onClick={() => setShowFilter(false)}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-background w-full md:w-[500px] md:rounded-2xl rounded-t-2xl max-h-[80vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-background border-b border-border px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-serif font-bold">Filters</h2>
              <button onClick={() => setShowFilter(false)} className="p-2 hover:bg-secondary rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Price Range */}
              <div>
                <label className="text-sm font-medium text-foreground mb-3 block">
                  Price Range: PKR {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()}
                </label>
                <div className="flex gap-4">
                  <input
                    type="range"
                    min="0"
                    max="500000"
                    step="10000"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="flex-1"
                  />
                  <input
                    type="range"
                    min="0"
                    max="500000"
                    step="10000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="flex-1"
                  />
                </div>
              </div>

              {/* City */}
              <div>
                <label className="text-sm font-medium text-foreground mb-3 block">Location</label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full h-12 px-4 rounded-lg border border-input bg-background text-foreground"
                >
                  {cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              {/* Capacity */}
              <div>
                <label className="text-sm font-medium text-foreground mb-3 block">
                  Minimum Capacity: {minCapacity} guests
                </label>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="50"
                  value={minCapacity}
                  onChange={(e) => setMinCapacity(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Rating */}
              <div>
                <label className="text-sm font-medium text-foreground mb-3 block">
                  Minimum Rating: {minRating}+
                </label>
                <div className="flex gap-2">
                  {[0, 3, 3.5, 4, 4.5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setMinRating(rating)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                        minRating === rating
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      {rating === 0 ? "Any" : `${rating}+`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Highlighted Only */}
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">Featured venues only</label>
                <button
                  onClick={() => setHighlightedOnly(!highlightedOnly)}
                  className={`w-12 h-6 rounded-full transition-all ${
                    highlightedOnly ? "bg-primary" : "bg-border"
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full bg-background shadow-md transition-transform ${
                    highlightedOnly ? "translate-x-6" : "translate-x-0.5"
                  }`} />
                </button>
              </div>
            </div>

            <div className="sticky bottom-0 bg-background border-t border-border p-6 flex gap-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setPriceRange([0, 500000]);
                  setSelectedCity("All Cities");
                  setMinCapacity(0);
                  setMinRating(0);
                  setHighlightedOnly(false);
                }}
              >
                Reset
              </Button>
              <Button
                variant="hero"
                className="flex-1"
                onClick={() => setShowFilter(false)}
              >
                Apply Filters
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default BanquetListScreen;
