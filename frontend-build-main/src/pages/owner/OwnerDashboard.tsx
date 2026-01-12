import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  SafeAreaView,
  FlatList,
} from 'react-native';
import * as Icons from 'lucide-react-native';

const {
  Crown,
  Plus,
  Building2,
  Calendar,
  CreditCard,
  BarChart3,
  Settings,
  LogOut,
  ChevronRight,
  Eye,
  Edit2,
  Trash2,
  Star
} = Icons as any;

const { width } = Dimensions.get('window');

const OwnerDashboard = ({ navigation }: any) => {
  const stats = [
    { label: "Total Venues", value: "2", icon: Building2, color: "#EAB308" },
    { label: "Active", value: "8", icon: Calendar, color: "#10B981" },
    { label: "Revenue", value: "850K", icon: BarChart3, color: "#3B82F6" },
    { label: "Sub", value: "Active", icon: CreditCard, color: "#8B5CF6" },
  ];

  const venues = [
    {
      id: "1",
      name: "Royal Palace Banquet",
      location: "DHA Phase 6, Karachi",
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800',
      isHighlighted: true,
      bookings: 5,
      rating: 4.8,
    },
    {
      id: "2",
      name: "Grand Celebration Hall",
      location: "Gulshan-e-Iqbal, Karachi",
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800',
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.logoBadge}>
            <Crown size={20} color="#000" />
          </View>
          <View>
            <Text style={styles.headerTitle}>BanquetBook</Text>
            <Text style={styles.headerSubtitle}>Owner Dashboard</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerBtn}>
            <Settings size={20} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.replace('Auth')}>
            <LogOut size={20} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <View key={stat.label} style={styles.statCard}>
              <View style={[styles.statIconContainer, { backgroundColor: stat.color + '10' }]}>
                <stat.icon size={16} color={stat.color} />
              </View>
              <Text style={styles.statLabel}>{stat.label}</Text>
              <Text style={styles.statValue}>{stat.value}</Text>
            </View>
          ))}
        </View>

        {/* My Venues Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Venues</Text>
          <TouchableOpacity style={styles.addBtn}>
            <Plus size={16} color="#fff" />
            <Text style={styles.addBtnText}>Add</Text>
          </TouchableOpacity>
        </View>

        {venues.map((venue) => (
          <View key={venue.id} style={styles.venueCard}>
            <Image source={{ uri: venue.image }} style={styles.venueImage} />
            {venue.isHighlighted && (
              <View style={styles.featuredBadge}>
                <Crown size={10} color="#000" />
                <Text style={styles.featuredText}>Featured</Text>
              </View>
            )}
            <View style={styles.venueInfo}>
              <Text style={styles.venueName}>{venue.name}</Text>
              <Text style={styles.venueLoc}>{venue.location}</Text>
              <View style={styles.venueMeta}>
                <Text style={styles.metaText}>{venue.bookings} Bookings</Text>
                <View style={styles.ratingRow}>
                  <Star size={12} color="#EAB308" fill="#EAB308" />
                  <Text style={styles.metaText}>{venue.rating}</Text>
                </View>
              </View>
            </View>
            <View style={styles.venueActions}>
              <TouchableOpacity style={styles.actionBtn}>
                <Eye size={18} color="#666" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn}>
                <Edit2 size={18} color="#666" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn}>
                <Trash2 size={18} color="#EF4444" />
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickBtn} onPress={() => navigation.navigate('AvailabilityManagement')}>
            <Calendar size={24} color="#666" />
            <Text style={styles.quickBtnText}>Availability</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickBtn} onPress={() => navigation.navigate('SubscriptionScreen')}>
            <CreditCard size={24} color="#666" />
            <Text style={styles.quickBtnText}>Subscription</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Bookings */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Bookings</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bookingsList}>
          {recentBookings.map((booking, index) => (
            <View key={booking.id} style={[styles.bookingItem, index === recentBookings.length - 1 && { borderBottomWidth: 0 }]}>
              <View style={styles.bookingLeft}>
                <Text style={styles.customerName}>{booking.customer}</Text>
                <Text style={styles.bookingVenue}>{booking.venue}</Text>
                <Text style={styles.bookingDate}>{booking.date}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: booking.status === 'approved' ? '#ECFDF5' : '#FFFBEB' }]}>
                <Text style={[styles.statusText, { color: booking.status === 'approved' ? '#10B981' : '#F59E0B' }]}>{booking.status}</Text>
              </View>
            </View>
          ))}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EAB308',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 10,
    color: '#888',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 12,
  },
  headerBtn: {
    padding: 6,
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    width: (width - 52) / 2,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    padding: 16,
  },
  statIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  addBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  venueCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    marginBottom: 16,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  venueImage: {
    width: 80,
    height: 100,
  },
  featuredBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: '#EAB308',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  featuredText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#000',
  },
  venueInfo: {
    flex: 1,
    padding: 12,
  },
  venueName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  venueLoc: {
    fontSize: 11,
    color: '#888',
    marginBottom: 8,
  },
  venueMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  metaText: {
    fontSize: 10,
    color: '#666',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  venueActions: {
    padding: 8,
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderLeftColor: '#f5f5f5',
    gap: 8,
  },
  actionBtn: {
    padding: 6,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    marginTop: 8,
    gap: 12,
  },
  quickBtn: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  quickBtnText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#333',
  },
  viewAllText: {
    fontSize: 13,
    color: '#EAB308',
    fontWeight: '600',
  },
  bookingsList: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    overflow: 'hidden',
  },
  bookingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  bookingLeft: {
    flex: 1,
  },
  customerName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  bookingVenue: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  bookingDate: {
    fontSize: 11,
    color: '#888',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});

export default OwnerDashboard;
