import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import * as Icons from 'lucide-react-native';

const {
  ArrowLeft,
  Clock,
  CheckCircle2,
  XCircle,
  Calendar,
  MapPin,
  ChevronRight
} = Icons as any;

const { width } = Dimensions.get('window');

type BookingStatus = 'pending' | 'approved' | 'rejected';

interface Booking {
  id: string;
  venueName: string;
  venueImage: string;
  location: string;
  date: string;
  timeSlot: string;
  guests: number;
  status: BookingStatus;
  price: number;
}

const BookingStatusScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState<BookingStatus | 'all'>('all');

  const [bookings] = useState<Booking[]>([
    {
      id: '1',
      venueName: 'Royal Palace Banquet',
      venueImage: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800',
      location: 'DHA Phase 6, Karachi',
      date: '2026-02-15',
      timeSlot: 'Evening',
      guests: 300,
      status: 'approved',
      price: 250000,
    },
    {
      id: '2',
      venueName: 'Grand Celebration Hall',
      venueImage: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800',
      location: 'Gulshan-e-Iqbal, Karachi',
      date: '2026-03-20',
      timeSlot: 'Night',
      guests: 200,
      status: 'pending',
      price: 180000,
    },
    {
      id: '3',
      venueName: 'Garden Paradise Venue',
      venueImage: 'https://images.unsplash.com/photo-1549333321-12684d022830?w=800',
      location: 'Bahria Town, Lahore',
      date: '2026-01-10',
      timeSlot: 'Evening',
      guests: 400,
      status: 'rejected',
      price: 320000,
    },
  ]);

  const statusConfig: any = {
    pending: { label: 'Pending', color: '#F59E0B', bg: '#FFFBEB', icon: Clock },
    approved: { label: 'Approved', color: '#10B981', bg: '#ECFDF5', icon: CheckCircle2 },
    rejected: { label: 'Rejected', color: '#EF4444', bg: '#FEF2F2', icon: XCircle },
  };

  const filteredBookings = activeTab === 'all'
    ? bookings
    : bookings.filter((b) => b.status === activeTab);

  const renderBookingItem = ({ item }: { item: Booking }) => {
    const config = statusConfig[item.status];
    const StatusIcon = config.icon;

    return (
      <TouchableOpacity style={styles.bookingCard}>
        <Image source={{ uri: item.venueImage }} style={styles.venueImage} />
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={styles.venueName} numberOfLines={1}>{item.venueName}</Text>
            <View style={[styles.statusBadge, { backgroundColor: config.bg }]}>
              <StatusIcon size={12} color={config.color} />
              <Text style={[styles.statusText, { color: config.color }]}>{config.label}</Text>
            </View>
          </View>

          <View style={styles.locationRow}>
            <MapPin size={12} color="#888" />
            <Text style={styles.locationText}>{item.location}</Text>
          </View>

          <View style={styles.detailsRow}>
            <View style={styles.detailItem}>
              <Calendar size={14} color="#666" />
              <Text style={styles.detailText}>{item.date}</Text>
            </View>
            <View style={styles.detailItem}>
              <Clock size={14} color="#666" />
              <Text style={styles.detailText}>{item.timeSlot}</Text>
            </View>
          </View>

          <View style={styles.cardFooter}>
            <Text style={styles.guestsText}>{item.guests} Guests</Text>
            <Text style={styles.bookingPrice}>PKR {item.price.toLocaleString()}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <ArrowLeft size={24} color="#000" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>My Bookings</Text>
            <Text style={styles.headerSubtitle}>{bookings.length} total bookings</Text>
          </View>
        </View>
      </View>

      <View style={styles.tabBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabContent}>
          {['all', 'pending', 'approved', 'rejected'].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab as any)}
              style={[styles.tabItem, activeTab === tab && styles.tabItemActive]}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredBookings}
        keyExtractor={(item) => item.id}
        renderItem={renderBookingItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Calendar size={60} color="#eee" />
            <Text style={styles.emptyText}>No bookings found in this category.</Text>
          </View>
        }
      />
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
  },
  backBtn: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#888',
  },
  tabBar: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tabContent: {
    paddingHorizontal: 20,
    gap: 10,
  },
  tabItem: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  tabItemActive: {
    backgroundColor: '#000',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },
  tabTextActive: {
    color: '#fff',
  },
  listContainer: {
    padding: 20,
  },
  bookingCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 16,
    overflow: 'hidden',
    flexDirection: 'row',
    height: 140,
  },
  venueImage: {
    width: 100,
    height: '100%',
  },
  cardContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  venueName: {
    fontSize: 15,
    fontWeight: 'bold',
    flex: 1,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  locationText: {
    fontSize: 12,
    color: '#888',
  },
  detailsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 12,
    color: '#666',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f5f5f5',
  },
  guestsText: {
    fontSize: 12,
    color: '#888',
  },
  bookingPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#EAB308',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 100,
  },
  emptyText: {
    marginTop: 16,
    color: '#888',
    fontSize: 14,
  },
});

export default BookingStatusScreen;
