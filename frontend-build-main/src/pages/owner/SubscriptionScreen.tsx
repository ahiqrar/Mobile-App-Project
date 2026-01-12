import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {
  ArrowLeft,
  Check,
  Crown,
  Star,
  CreditCard,
  Calendar,
  Building2
} from 'lucide-react-native';

const SubscriptionScreen = ({ navigation }: any) => {
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'featured'>('basic');

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 2000,
      period: 'month',
      features: [
        'List up to 2 venues',
        'Accept bookings',
        'Basic analytics',
        'Email support',
      ],
      icon: Building2,
    },
    {
      id: 'featured',
      name: 'Featured',
      price: 5000,
      period: 'month',
      features: [
        'Unlimited venues',
        'Featured listing badge',
        'Priority placement in search',
        'Advanced analytics',
        'Priority support',
        'Promotional banners',
      ],
      icon: Crown,
      popular: true,
    },
  ];

  const currentSubscription = {
    plan: 'basic',
    status: 'active',
    nextBilling: 'February 15, 2026',
    amount: 2000,
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <ArrowLeft size={24} color="#000" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Subscription</Text>
            <Text style={styles.headerSubtitle}>Manage your plan</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Current Plan */}
        <View style={styles.currentPlanCard}>
          <Text style={styles.sectionTitle}>Current Plan</Text>
          <View style={styles.planDetails}>
            <View>
              <Text style={styles.planName}>{currentSubscription.plan}</Text>
              <View style={styles.statusRow}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>{currentSubscription.status}</Text>
              </View>
            </View>
            <View style={styles.billingInfo}>
              <Text style={styles.billingLabel}>Next billing</Text>
              <View style={styles.billingDateRow}>
                <Calendar size={12} color="#666" />
                <Text style={styles.billingDate}>{currentSubscription.nextBilling}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Available Plans */}
        <Text style={styles.sectionTitle}>Available Plans</Text>
        <View style={styles.plansContainer}>
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isSelected = selectedPlan === plan.id;
            return (
              <TouchableOpacity
                key={plan.id}
                onPress={() => setSelectedPlan(plan.id as any)}
                style={[styles.planCard, isSelected && styles.planCardSelected]}
              >
                {plan.popular && (
                  <View style={styles.popularBadge}>
                    <Star size={10} color="#000" fill="#000" />
                    <Text style={styles.popularText}>POPULAR</Text>
                  </View>
                )}

                <View style={styles.planHeader}>
                  <View style={[styles.planIcon, plan.id === 'featured' && styles.featuredIcon]}>
                    <Icon size={24} color={plan.id === 'featured' ? '#000' : '#666'} />
                  </View>
                  <View>
                    <Text style={styles.planTitle}>{plan.name}</Text>
                    <Text style={styles.planPrice}>
                      <Text style={styles.priceAmount}>PKR {plan.price.toLocaleString()}</Text>
                      /{plan.period}
                    </Text>
                  </View>
                </View>

                <View style={styles.featuresList}>
                  {plan.features.map((feature, i) => (
                    <View key={i} style={styles.featureItem}>
                      <Check size={14} color={plan.id === 'featured' ? '#EAB308' : '#10B981'} />
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>

                {isSelected && (
                  <View style={styles.checkBadge}>
                    <Check size={14} color="#fff" />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Action Button */}
        {selectedPlan !== currentSubscription.plan && (
          <TouchableOpacity style={styles.upgradeBtn}>
            <Text style={styles.upgradeBtnText}>
              {selectedPlan === 'featured' ? 'Upgrade to Featured' : 'Downgrade to Basic'}
            </Text>
          </TouchableOpacity>
        )}

        <View style={styles.paymentSection}>
          <Text style={styles.sectionTitle}>Payment Methods</Text>
          <View style={styles.paymentCard}>
            <View style={styles.cardInfo}>
              <View style={styles.visaBadge}>
                <Text style={styles.visaText}>VISA</Text>
              </View>
              <View>
                <Text style={styles.cardDigits}>•••• •••• •••• 4242</Text>
                <Text style={styles.cardExpiry}>Expires 12/28</Text>
              </View>
            </View>
            <TouchableOpacity>
              <Text style={styles.changeText}>Change</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  backBtn: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#888',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  currentPlanCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 20,
    marginBottom: 24,
  },
  planDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  planName: {
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  statusText: {
    fontSize: 12,
    color: '#666',
    textTransform: 'capitalize',
  },
  billingInfo: {
    alignItems: 'flex-end',
  },
  billingLabel: {
    fontSize: 11,
    color: '#888',
    marginBottom: 4,
  },
  billingDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  billingDate: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  plansContainer: {
    gap: 16,
    marginBottom: 24,
  },
  planCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#eee',
    padding: 20,
    position: 'relative',
  },
  planCardSelected: {
    borderColor: '#EAB308',
  },
  popularBadge: {
    position: 'absolute',
    top: -10,
    alignSelf: 'center',
    backgroundColor: '#EAB308',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  popularText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#000',
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  planIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featuredIcon: {
    backgroundColor: '#EAB308',
  },
  planTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  planPrice: {
    fontSize: 12,
    color: '#888',
  },
  priceAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  featuresList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    fontSize: 13,
    color: '#666',
  },
  checkBadge: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#EAB308',
    justifyContent: 'center',
    alignItems: 'center',
  },
  upgradeBtn: {
    backgroundColor: '#000',
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  upgradeBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  paymentSection: {
    marginTop: 8,
  },
  paymentCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  visaBadge: {
    width: 40,
    height: 24,
    backgroundColor: '#1A1F71',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  visaText: {
    color: '#fff',
    fontSize: 8,
    fontWeight: 'bold',
  },
  cardDigits: {
    fontSize: 14,
    fontWeight: '600',
  },
  cardExpiry: {
    fontSize: 11,
    color: '#888',
  },
  changeText: {
    fontSize: 13,
    color: '#EAB308',
    fontWeight: '600',
  },
});

export default SubscriptionScreen;
