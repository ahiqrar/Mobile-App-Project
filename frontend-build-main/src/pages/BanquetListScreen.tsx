import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  Dimensions,
  SafeAreaView,
  Platform,
  Modal,
} from 'react-native';
import * as Icons from 'lucide-react-native';

const {
  MapPin,
  Star,
  Users,
  Crown,
  ArrowLeft,
  SlidersHorizontal,
  X,
  Plus,
  Minus
} = Icons as any;
import { banquets, cities } from '../data/banquets';

const { width } = Dimensions.get('window');

const BanquetListScreen = ({ navigation }: any) => {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [minCapacity, setMinCapacity] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [sortBy, setSortBy] = useState('featured');

  const filteredBanquets = useMemo(() => {
    let result = banquets.filter((b) => {
      if (selectedCity !== 'All Cities' && b.city !== selectedCity) return false;
      if (b.price < priceRange[0] || b.price > priceRange[1]) return false;
      if (b.capacity < minCapacity) return false;
      return true;
    });

    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);
    if (sortBy === 'featured') result.sort((a, b) => (b.isHighlighted ? 1 : 0) - (a.isHighlighted ? 1 : 0));

    return result;
  }, [selectedCity, priceRange, minCapacity, sortBy]);

  const renderBanquetItem = ({ item, index }: { item: any, index: number }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('BanquetDetail', { id: item.id })}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        {item.isHighlighted && (
          <View style={styles.featuredBadge}>
            <Crown size={12} stroke="#000" />
            <Text style={styles.featuredText}>Featured</Text>
          </View>
        )}
        <View style={styles.ratingBadge}>
          <Star size={14} stroke="#EAB308" fill="#EAB308" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>
      <View style={styles.cardInfo}>
        <Text style={styles.cardName}>{item.name}</Text>
        <View style={styles.locationContainer}>
          <MapPin size={14} color="#888" />
          <Text style={styles.locationText}>{item.location}, {item.city}</Text>
        </View>
        <View style={styles.cardFooter}>
          <View style={styles.capacityInfo}>
            <Users size={14} color="#888" />
            <Text style={styles.capacityText}>{item.capacity} guests</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.pricePrefix}>Starting</Text>
            <Text style={styles.priceText}>PKR {item.price.toLocaleString()}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backBtn}>
            <ArrowLeft size={24} color="#333" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Available Venues</Text>
            <Text style={styles.headerSubtitle}>{filteredBanquets.length} venues found</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.filterBtn} onPress={() => setShowFilter(true)}>
          <SlidersHorizontal size={20} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.sortBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sortContent}>
          {[
            { id: 'featured', label: 'Featured' },
            { id: 'price-low', label: 'Low Price' },
            { id: 'price-high', label: 'High Price' },
            { id: 'rating', label: 'Top Rated' },
          ].map((op) => (
            <TouchableOpacity
              key={op.id}
              onPress={() => setSortBy(op.id)}
              style={[styles.sortTab, sortBy === op.id && styles.sortTabActive]}
            >
              <Text style={[styles.sortTabText, sortBy === op.id && styles.sortTabTextActive]}>
                {op.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredBanquets}
        keyExtractor={(item) => item.id}
        renderItem={renderBanquetItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No venues found for your selection.</Text>
            <TouchableOpacity style={styles.resetBtn} onPress={() => {
              setSelectedCity('All Cities');
              setPriceRange([0, 500000]);
              setMinCapacity(0);
            }}>
              <Text style={styles.resetBtnText}>Reset Filters</Text>
            </TouchableOpacity>
          </View>
        }
      />

      <Modal visible={showFilter} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filters</Text>
              <TouchableOpacity onPress={() => setShowFilter(false)}>
                <X size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <View style={styles.filterSection}>
                <Text style={styles.filterLabel}>Location</Text>
                <View style={styles.cityGrid}>
                  {cities.map((city) => (
                    <TouchableOpacity
                      key={city}
                      onPress={() => setSelectedCity(city)}
                      style={[styles.cityChip, selectedCity === city && styles.cityChipActive]}
                    >
                      <Text style={[styles.cityChipText, selectedCity === city && styles.cityChipTextActive]}>
                        {city}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.filterSection}>
                <Text style={styles.filterLabel}>Minimum Capacity</Text>
                <View style={styles.counterContainer}>
                  <TouchableOpacity
                    onPress={() => setMinCapacity(Math.max(0, minCapacity - 50))}
                    style={styles.counterBtn}
                  >
                    <Minus size={20} color="#000" />
                  </TouchableOpacity>
                  <Text style={styles.counterValue}>{minCapacity} Guests</Text>
                  <TouchableOpacity
                    onPress={() => setMinCapacity(minCapacity + 50)}
                    style={styles.counterBtn}
                  >
                    <Plus size={20} color="#000" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.filterSection}>
                <Text style={styles.filterLabel}>Price Range</Text>
                <Text style={styles.priceSubtext}>Up to PKR {priceRange[1].toLocaleString()}</Text>
                {/* Simplified range picker for now */}
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity style={styles.applyBtn} onPress={() => setShowFilter(false)}>
                <Text style={styles.applyBtnText}>Apply Filters</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    color: '#000',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#888',
  },
  filterBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sortBar: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sortContent: {
    paddingHorizontal: 20,
    gap: 10,
  },
  sortTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  sortTabActive: {
    backgroundColor: '#EAB308',
  },
  sortTabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },
  sortTabTextActive: {
    color: '#000',
  },
  listContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  imageContainer: {
    height: 200,
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  featuredBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAB308',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  featuredText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000',
  },
  ratingBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  cardInfo: {
    padding: 16,
  },
  cardName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 6,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 4,
  },
  locationText: {
    fontSize: 13,
    color: '#888',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f5f5f5',
  },
  capacityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  capacityText: {
    fontSize: 13,
    color: '#666',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  pricePrefix: {
    fontSize: 10,
    color: '#888',
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#EAB308',
  },
  emptyContainer: {
    paddingVertical: 60,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
  },
  resetBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EAB308',
  },
  resetBtnText: {
    color: '#EAB308',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: '75%',
    padding: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  modalBody: {
    flex: 1,
  },
  filterSection: {
    marginBottom: 30,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  cityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  cityChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
  },
  cityChipActive: {
    backgroundColor: '#EAB308',
  },
  cityChipText: {
    fontSize: 14,
    color: '#666',
  },
  cityChipTextActive: {
    color: '#000',
    fontWeight: '600',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 15,
    alignSelf: 'flex-start'
  },
  counterBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee'
  },
  counterValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  priceSubtext: {
    fontSize: 14,
    color: '#666',
  },
  modalFooter: {
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  applyBtn: {
    backgroundColor: '#000',
    height: 56,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BanquetListScreen;
