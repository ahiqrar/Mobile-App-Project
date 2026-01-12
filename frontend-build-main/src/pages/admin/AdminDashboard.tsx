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
  TextInput,
  FlatList,
} from 'react-native';
import {
  Crown,
  Building2,
  Users,
  CreditCard,
  CheckCircle2,
  XCircle,
  BarChart3,
  Search,
  Filter,
  Eye,
  Star,
  LogOut
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

type Tab = 'venues' | 'owners' | 'subscriptions';

const AdminDashboard = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState<Tab>('venues');
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    { label: "Venues", value: "156", icon: Building2, change: "+12" },
    { label: "Owners", value: "89", icon: Users, change: "+5" },
    { label: "Revenue", value: "1.2M", icon: CreditCard, change: "+15%" },
    { label: "Bookings", value: "342", icon: BarChart3, change: "+28" },
  ];

  const venues = [
    { id: "1", name: "Royal Palace", owner: "Ahmed Khan", city: "Karachi", isHighlighted: true, status: "active", rating: 4.8, image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800' },
    { id: "2", name: "Grand Celebration", owner: "Sara Ahmed", city: "Karachi", isHighlighted: false, status: "active", rating: 4.5, image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800' },
    { id: "3", name: "Garden Paradise", owner: "Ali Hassan", city: "Lahore", isHighlighted: false, status: "pending", rating: 4.9, image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800' },
  ];

  const owners = [
    { id: "1", name: "Ahmed Khan", email: "ahmed@email.com", venues: 2, subscription: "Featured", status: "active" },
    { id: "2", name: "Sara Ahmed", email: "sara@email.com", venues: 1, subscription: "Basic", status: "active" },
    { id: "3", name: "Ali Hassan", email: "ali@email.com", venues: 1, subscription: "Featured", status: "pending" },
  ];

  const tabs = [
    { id: 'venues', label: 'Venues', icon: Building2 },
    { id: 'owners', label: 'Owners', icon: Users },
    { id: 'subscriptions', label: 'Subs', icon: CreditCard },
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
            <Text style={styles.headerSubtitle}>Admin Dashboard</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.logoutBtn} onPress={() => navigation.replace('Auth')}>
          <LogOut size={20} color="#EF4444" />
        </TouchableOpacity>
      </View>

      {/* Stats row - non-scrollable as it fits */}
      <View style={styles.statsRow}>
        {stats.map((stat, i) => (
          <View key={i} style={styles.statBox}>
            <stat.icon size={16} color="#EAB308" />
            <Text style={styles.statVal}>{stat.value}</Text>
            <Text style={styles.statLab}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Tab bar */}
      <View style={styles.tabBar}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            onPress={() => setActiveTab(tab.id as Tab)}
            style={[styles.tab, activeTab === tab.id && styles.activeTab]}
          >
            <tab.icon size={18} color={activeTab === tab.id ? '#EAB308' : '#888'} />
            <Text style={[styles.tabText, activeTab === tab.id && styles.activeTabText]}>{tab.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.searchBar}>
        <Search size={18} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.filterBtn}>
          <Filter size={18} color="#666" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {activeTab === 'venues' && (
          <View style={styles.tabContent}>
            {venues.map((venue) => (
              <View key={venue.id} style={styles.venueItem}>
                <Image source={{ uri: venue.image }} style={styles.venueImg} />
                <View style={styles.venueInfo}>
                  <View style={styles.venueHeader}>
                    <Text style={styles.venueName}>{venue.name}</Text>
                    {venue.isHighlighted && <Crown size={12} color="#EAB308" />}
                  </View>
                  <Text style={styles.venueMeta}>{venue.owner} • {venue.city}</Text>
                  <View style={styles.venueFooter}>
                    <View style={[styles.statusBadge, { backgroundColor: venue.status === 'active' ? '#ECFDF5' : '#FFFBEB' }]}>
                      <Text style={[styles.statusText, { color: venue.status === 'active' ? '#10B981' : '#F59E0B' }]}>{venue.status}</Text>
                    </View>
                    <View style={styles.actions}>
                      <TouchableOpacity style={styles.actionBtn}>
                        <Eye size={16} color="#666" />
                      </TouchableOpacity>
                      {venue.status === 'pending' && (
                        <TouchableOpacity style={styles.approveBtn}>
                          <CheckCircle2 size={16} color="#10B981" />
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'owners' && (
          <View style={styles.tabContent}>
            {owners.map((owner) => (
              <View key={owner.id} style={styles.ownerItem}>
                <View style={styles.ownerHeader}>
                  <View>
                    <Text style={styles.ownerName}>{owner.name}</Text>
                    <Text style={styles.ownerEmail}>{owner.email}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: owner.status === 'active' ? '#ECFDF5' : '#FFFBEB' }]}>
                    <Text style={[styles.statusText, { color: owner.status === 'active' ? '#10B981' : '#F59E0B' }]}>{owner.status}</Text>
                  </View>
                </View>
                <View style={styles.ownerMeta}>
                  <Text style={styles.metaLabel}>Venues: <Text style={styles.metaVal}>{owner.venues}</Text></Text>
                  <Text style={styles.metaLabel}>Plan: <Text style={styles.metaVal}>{owner.subscription}</Text></Text>
                </View>
                <View style={styles.ownerActions}>
                  <TouchableOpacity style={styles.viewBtn}>
                    <Text style={styles.viewBtnText}>View Details</Text>
                  </TouchableOpacity>
                  {owner.status === 'pending' && (
                    <View style={styles.pendingActions}>
                      <TouchableOpacity style={styles.iconAction}>
                        <CheckCircle2 size={20} color="#10B981" />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.iconAction}>
                        <XCircle size={20} color="#EF4444" />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'subscriptions' && (
          <View style={styles.tabContent}>
            <View style={styles.summaryCard}>
              <Text style={styles.cardTitle}>Monthly Summary</Text>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Basic Plans</Text>
                <Text style={styles.summaryVal}>54 owners</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Featured Plans</Text>
                <Text style={styles.summaryVal}>35 owners</Text>
              </View>
              <View style={[styles.summaryItem, styles.totalItem]}>
                <Text style={styles.totalLabel}>Total Revenue</Text>
                <Text style={styles.totalVal}>PKR 283,000</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Recent Payments</Text>
            <View style={styles.paymentsList}>
              {[1, 2, 3].map((_, i) => (
                <View key={i} style={styles.paymentItem}>
                  <View>
                    <Text style={styles.payOwner}>Owner Name {i + 1}</Text>
                    <Text style={styles.payDate}>Jan 15, 2026</Text>
                  </View>
                  <Text style={styles.payAmount}>+PKR 5,000</Text>
                </View>
              ))}
            </View>
          </View>
        )}
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
  logoutBtn: {
    padding: 8,
  },
  statsRow: {
    flexDirection: 'row',
    padding: 15,
    gap: 10,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },
  statVal: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 4,
  },
  statLab: {
    fontSize: 9,
    color: '#888',
    textTransform: 'uppercase',
  },
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#EAB308',
  },
  tabText: {
    fontSize: 13,
    color: '#888',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#000',
    fontWeight: '700',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 15,
    gap: 10,
  },
  searchIcon: {
    position: 'absolute',
    left: 25,
    zIndex: 1,
  },
  searchInput: {
    flex: 1,
    height: 44,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingLeft: 40,
    fontSize: 14,
  },
  filterBtn: {
    width: 44,
    height: 44,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    padding: 15,
    paddingBottom: 40,
  },
  tabContent: {
    gap: 15,
  },
  venueItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    overflow: 'hidden',
  },
  venueImg: {
    width: 80,
    height: 80,
  },
  venueInfo: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  venueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  venueName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  venueMeta: {
    fontSize: 11,
    color: '#888',
  },
  venueFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  statusText: {
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionBtn: {
    padding: 4,
  },
  approveBtn: {
    padding: 4,
  },
  ownerItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 15,
  },
  ownerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  ownerName: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  ownerEmail: {
    fontSize: 12,
    color: '#888',
  },
  ownerMeta: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 15,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f5f5f5',
  },
  metaLabel: {
    fontSize: 12,
    color: '#666',
  },
  metaVal: {
    fontWeight: 'bold',
    color: '#000',
  },
  ownerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 6,
  },
  viewBtnText: {
    fontSize: 12,
    fontWeight: '600',
  },
  pendingActions: {
    flexDirection: 'row',
    gap: 15,
  },
  iconAction: {
    padding: 5,
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 15,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 13,
    color: '#666',
  },
  summaryVal: {
    fontSize: 13,
    fontWeight: '600',
  },
  totalItem: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  totalVal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#EAB308',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  paymentsList: {
    backgroundColor: '#fff',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#eee',
    overflow: 'hidden',
  },
  paymentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  payOwner: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  payDate: {
    fontSize: 11,
    color: '#888',
  },
  payAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#10B981',
  },
});

export default AdminDashboard;
