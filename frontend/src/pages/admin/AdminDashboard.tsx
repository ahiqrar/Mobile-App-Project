import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Crown, Building2, Users, CreditCard, CheckCircle2, XCircle,
  BarChart3, Search, Filter, ChevronDown, Eye, Trash2, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import banquet1 from "@/assets/banquet-1.jpg";
import banquet2 from "@/assets/banquet-2.jpg";

type Tab = "venues" | "owners" | "subscriptions";

const AdminDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<Tab>("venues");
  const [searchQuery, setSearchQuery] = useState("");

  const stats = [
    { label: "Total Venues", value: "156", icon: Building2, change: "+12 this month" },
    { label: "Active Owners", value: "89", icon: Users, change: "+5 this month" },
    { label: "Revenue", value: "PKR 1.2M", icon: CreditCard, change: "+15% vs last month" },
    { label: "Bookings", value: "342", icon: BarChart3, change: "+28 this week" },
  ];

  const venues = [
    { id: "1", name: "Royal Palace Banquet", owner: "Ahmed Khan", city: "Karachi", isHighlighted: true, status: "active", rating: 4.8, image: banquet1 },
    { id: "2", name: "Grand Celebration Hall", owner: "Sara Ahmed", city: "Karachi", isHighlighted: false, status: "active", rating: 4.5, image: banquet2 },
    { id: "3", name: "Garden Paradise", owner: "Ali Hassan", city: "Lahore", isHighlighted: true, status: "pending", rating: 4.9, image: banquet1 },
  ];

  const owners = [
    { id: "1", name: "Ahmed Khan", email: "ahmed@email.com", venues: 2, subscription: "Featured", status: "active" },
    { id: "2", name: "Sara Ahmed", email: "sara@email.com", venues: 1, subscription: "Basic", status: "active" },
    { id: "3", name: "Ali Hassan", email: "ali@email.com", venues: 1, subscription: "Featured", status: "pending" },
  ];

  const handleApprove = (id: string, type: string) => {
    toast({
      title: `${type} Approved`,
      description: `The ${type.toLowerCase()} has been approved successfully`,
    });
  };

  const handleReject = (id: string, type: string) => {
    toast({
      title: `${type} Rejected`,
      description: `The ${type.toLowerCase()} has been rejected`,
      variant: "destructive",
    });
  };

  const handleHighlight = (id: string) => {
    toast({
      title: "Highlight Updated",
      description: "Venue highlight status has been updated",
    });
  };

  const tabs = [
    { id: "venues", label: "Venues", icon: Building2 },
    { id: "owners", label: "Owners", icon: Users },
    { id: "subscriptions", label: "Subscriptions", icon: CreditCard },
  ];

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
              <p className="text-xs text-primary-foreground/70">Admin Dashboard</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
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
                <stat.icon className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
              <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
              <p className="text-xs text-success">{stat.change}</p>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </div>

        {/* Venues Tab */}
        {activeTab === "venues" && (
          <div className="space-y-4">
            {venues.map((venue, index) => (
              <motion.div
                key={venue.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-card rounded-xl border border-border overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    className="w-full sm:w-32 h-24 object-cover"
                  />
                  <div className="flex-1 p-4 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">{venue.name}</h3>
                        {venue.isHighlighted && (
                          <span className="featured-badge text-xs flex items-center gap-1">
                            <Crown className="w-3 h-3" />
                            Featured
                          </span>
                        )}
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          venue.status === "active" 
                            ? "bg-success/10 text-success" 
                            : "bg-warning/10 text-warning"
                        }`}>
                          {venue.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">Owner: {venue.owner} • {venue.city}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <Star className="w-4 h-4 text-accent fill-accent" />
                        {venue.rating}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant={venue.isHighlighted ? "secondary" : "gold"}
                        size="sm"
                        onClick={() => handleHighlight(venue.id)}
                      >
                        <Star className="w-4 h-4" />
                        {venue.isHighlighted ? "Remove Highlight" : "Highlight"}
                      </Button>
                      {venue.status === "pending" && (
                        <>
                          <Button variant="ghost" size="icon" onClick={() => handleApprove(venue.id, "Venue")} className="text-success">
                            <CheckCircle2 className="w-5 h-5" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleReject(venue.id, "Venue")} className="text-destructive">
                            <XCircle className="w-5 h-5" />
                          </Button>
                        </>
                      )}
                      <Button variant="ghost" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Owners Tab */}
        {activeTab === "owners" && (
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <table className="w-full">
              <thead className="bg-secondary">
                <tr>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Owner</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Venues</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Plan</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {owners.map((owner) => (
                  <tr key={owner.id} className="border-t border-border">
                    <td className="p-4">
                      <p className="font-medium text-foreground">{owner.name}</p>
                      <p className="text-sm text-muted-foreground">{owner.email}</p>
                    </td>
                    <td className="p-4 text-foreground">{owner.venues}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        owner.subscription === "Featured" 
                          ? "bg-gradient-gold text-foreground" 
                          : "bg-secondary text-secondary-foreground"
                      }`}>
                        {owner.subscription}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        owner.status === "active" 
                          ? "bg-success/10 text-success" 
                          : "bg-warning/10 text-warning"
                      }`}>
                        {owner.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      {owner.status === "pending" && (
                        <>
                          <Button variant="ghost" size="icon" onClick={() => handleApprove(owner.id, "Owner")} className="text-success">
                            <CheckCircle2 className="w-5 h-5" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleReject(owner.id, "Owner")} className="text-destructive">
                            <XCircle className="w-5 h-5" />
                          </Button>
                        </>
                      )}
                      <Button variant="ghost" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Subscriptions Tab */}
        {activeTab === "subscriptions" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="text-lg font-serif font-semibold mb-4">Subscription Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Basic Plans</span>
                  <span className="font-semibold">54 owners</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Featured Plans</span>
                  <span className="font-semibold">35 owners</span>
                </div>
                <div className="border-t border-border pt-4 flex justify-between">
                  <span className="text-muted-foreground">Monthly Revenue</span>
                  <span className="font-bold text-primary">PKR 283,000</span>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="text-lg font-serif font-semibold mb-4">Recent Payments</h3>
              <div className="space-y-3">
                {[
                  { owner: "Ahmed Khan", amount: 5000, plan: "Featured", date: "Jan 15" },
                  { owner: "Sara Ahmed", amount: 2000, plan: "Basic", date: "Jan 14" },
                  { owner: "Ali Hassan", amount: 5000, plan: "Featured", date: "Jan 13" },
                ].map((payment, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                    <div>
                      <p className="font-medium text-foreground">{payment.owner}</p>
                      <p className="text-sm text-muted-foreground">{payment.plan} • {payment.date}</p>
                    </div>
                    <span className="font-semibold text-success">+PKR {payment.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
