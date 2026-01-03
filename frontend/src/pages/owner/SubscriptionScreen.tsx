import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Crown, Star, CreditCard, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const SubscriptionScreen = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<"basic" | "featured">("basic");

  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: 2000,
      period: "month",
      features: [
        "List up to 2 venues",
        "Accept bookings",
        "Basic analytics",
        "Email support",
      ],
      icon: Building,
    },
    {
      id: "featured",
      name: "Featured",
      price: 5000,
      period: "month",
      features: [
        "Unlimited venues",
        "Featured listing badge",
        "Priority placement in search",
        "Advanced analytics",
        "Priority support",
        "Promotional banners",
      ],
      icon: Crown,
      popular: true,
    },
  ];

  const currentSubscription = {
    plan: "basic",
    status: "active",
    nextBilling: "February 15, 2026",
    amount: 2000,
  };

  const handleUpgrade = () => {
    toast({
      title: "Upgrade initiated",
      description: "Redirecting to payment gateway...",
    });
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
            <h1 className="text-xl font-serif font-bold text-foreground">Subscription</h1>
            <p className="text-sm text-muted-foreground">Manage your plan</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Current Plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card rounded-xl border border-border p-6 mb-8"
        >
          <h2 className="text-lg font-serif font-semibold text-foreground mb-4">Current Plan</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-foreground capitalize">{currentSubscription.plan}</p>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-success" />
                {currentSubscription.status}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Next billing</p>
              <p className="font-medium text-foreground flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {currentSubscription.nextBilling}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Plans */}
        <h2 className="text-lg font-serif font-semibold text-foreground mb-4">Available Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedPlan(plan.id as any)}
              className={`relative bg-card rounded-xl border-2 p-6 cursor-pointer transition-all ${
                selectedPlan === plan.id
                  ? "border-primary shadow-lg"
                  : "border-border hover:border-primary/50"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 featured-badge flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  Popular
                </div>
              )}
              
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  plan.id === "featured" ? "bg-gradient-gold" : "bg-secondary"
                }`}>
                  {plan.id === "featured" ? (
                    <Crown className="w-6 h-6 text-foreground" />
                  ) : (
                    <CreditCard className="w-6 h-6 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
                  <p className="text-muted-foreground">
                    <span className="text-2xl font-bold text-foreground">PKR {plan.price.toLocaleString()}</span>
                    /{plan.period}
                  </p>
                </div>
              </div>

              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <Check className={`w-4 h-4 ${plan.id === "featured" ? "text-accent" : "text-success"}`} />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {selectedPlan === plan.id && (
                <div className="absolute top-4 right-4">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Upgrade Button */}
        {selectedPlan !== currentSubscription.plan && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Button variant="hero" size="xl" className="w-full" onClick={handleUpgrade}>
              {selectedPlan === "featured" ? "Upgrade to Featured" : "Downgrade to Basic"}
            </Button>
            <p className="text-sm text-muted-foreground text-center mt-4">
              Changes will be applied at the start of your next billing cycle
            </p>
          </motion.div>
        )}

        {/* Payment Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8"
        >
          <h2 className="text-lg font-serif font-semibold text-foreground mb-4">Payment Methods</h2>
          <div className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-6 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center text-white text-xs font-bold">
                  VISA
                </div>
                <div>
                  <p className="font-medium text-foreground">•••• •••• •••• 4242</p>
                  <p className="text-sm text-muted-foreground">Expires 12/28</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">Change</Button>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

function Building(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  );
}

export default SubscriptionScreen;
