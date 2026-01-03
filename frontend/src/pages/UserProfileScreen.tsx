import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, User, Mail, Phone, Calendar, LogOut, 
  ChevronRight, Edit2, Settings, Bell, HelpCircle, Crown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const UserProfileScreen = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  
  const [profile, setProfile] = useState({
    name: "Ahmed Khan",
    email: "ahmed.khan@email.com",
    phone: "+92 300 1234567",
    joinedDate: "January 2026",
  });

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your changes have been saved successfully",
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/login");
  };

  const menuItems = [
    { icon: Calendar, label: "My Bookings", onClick: () => navigate("/bookings") },
    { icon: Bell, label: "Notifications", onClick: () => {} },
    { icon: Settings, label: "Settings", onClick: () => {} },
    { icon: HelpCircle, label: "Help & Support", onClick: () => {} },
  ];

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/home")}
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-serif font-bold text-foreground">Profile</h1>
          </div>
          <Button
            variant={isEditing ? "hero" : "ghost"}
            size="sm"
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          >
            {isEditing ? "Save" : <Edit2 className="w-4 h-4" />}
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card rounded-2xl border border-border p-6 mb-6 text-center"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-hero flex items-center justify-center mx-auto mb-4">
            <User className="w-12 h-12 text-primary-foreground" />
          </div>
          
          {isEditing ? (
            <div className="space-y-4 max-w-sm mx-auto text-left">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="h-12"
                />
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-1">{profile.name}</h2>
              <p className="text-muted-foreground flex items-center justify-center gap-2 mb-2">
                <Mail className="w-4 h-4" />
                {profile.email}
              </p>
              <p className="text-muted-foreground flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" />
                {profile.phone}
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                Member since {profile.joinedDate}
              </p>
            </>
          )}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-6"
        >
          {[
            { label: "Bookings", value: "3" },
            { label: "Completed", value: "1" },
            { label: "Favorites", value: "5" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-card rounded-xl border border-border p-4 text-center"
            >
              <p className="text-2xl font-bold text-primary">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Menu Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-card rounded-xl border border-border overflow-hidden mb-6"
        >
          {menuItems.map((item, index) => (
            <button
              key={item.label}
              onClick={item.onClick}
              className={`w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors ${
                index !== menuItems.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium text-foreground">{item.label}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          ))}
        </motion.div>

        {/* Logout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button
            variant="outline"
            className="w-full text-destructive border-destructive/30 hover:bg-destructive/10"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </motion.div>

        {/* Owner Portal Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-muted-foreground mb-2">Are you a venue owner?</p>
          <Button variant="ghost" onClick={() => navigate("/login")}>
            <Crown className="w-4 h-4" />
            Switch to Owner Portal
          </Button>
        </motion.div>
      </main>
    </div>
  );
};

export default UserProfileScreen;
