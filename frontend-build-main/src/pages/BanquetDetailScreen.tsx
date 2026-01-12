import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  SafeAreaView,
  Linking,
} from 'react-native';
import * as Icons from 'lucide-react-native';

const {
  ArrowLeft,
  Star,
  MapPin,
  Users,
  Phone,
  Mail,
  Crown,
  ChevronLeft,
  ChevronRight,
  Check,
  Sun,
  Sunset,
  Moon,
  Heart
} = Icons as any;
import { banquets } from '../data/banquets';

const { width, height } = Dimensions.get('window');

const BanquetDetailScreen = ({ navigation, route }: any) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const { id } = route?.params || {};
  const banquet = banquets.find(b => b.id === id) || banquets[0];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % banquet.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + banquet.images.length) % banquet.images.length);
  };

  const handleContact = (type: 'phone' | 'email') => {
    const url = type === 'phone' ? `tel:${banquet.contactPhone}` : `mailto:${banquet.contactEmail}`;
    Linking.openURL(url);
  };

  const slotIcons: any = {
    morning: Sun,
    evening: Sunset,
    night: Moon,
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Image Gallery */}
        <View style={styles.gallery}>
          <Image source={{ uri: banquet.images[currentImage] }} style={styles.mainImage} />
          <View style={styles.overlay} />

          <SafeAreaView style={styles.navBar}>
            <TouchableOpacity style={styles.navBtn} onPress={() => navigation.goBack()}>
              <ArrowLeft size={24} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.navBtn, isLiked && styles.likedBtn]}
              onPress={() => setIsLiked(!isLiked)}
            >
              <Heart size={24} color={isLiked ? "#fff" : "#000"} fill={isLiked ? "#fff" : "transparent"} />
            </TouchableOpacity>
          </SafeAreaView>

          <View style={styles.galleryControls}>
            <TouchableOpacity style={styles.galleryBtn} onPress={prevImage}>
              <ChevronLeft size={24} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.galleryBtn} onPress={nextImage}>
              <ChevronRight size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <View style={styles.indicators}>
            {banquet.images.map((_, i) => (
              <View
                key={i}
                style={[styles.indicator, currentImage === i && styles.indicatorActive]}
              />
            ))}
          </View>

          {banquet.isHighlighted && (
            <View style={styles.featuredTag}>
              <Crown size={14} color="#000" />
              <Text style={styles.featuredTagText}>Featured Venue</Text>
            </View>
          )}
        </View>

        {/* Content */}
        <View style={styles.contentCard}>
          <View style={styles.mainInfo}>
            <View>
              <Text style={styles.name}>{banquet.name}</Text>
              <View style={styles.location}>
                <MapPin size={16} color="#888" />
                <Text style={styles.locationText}>{banquet.location}, {banquet.city}</Text>
              </View>
            </View>
            <View style={styles.ratingBox}>
              <Star size={20} color="#EAB308" fill="#EAB308" />
              <Text style={styles.ratingVal}>{banquet.rating}</Text>
            </View>
          </View>

          <Text style={styles.description}>{banquet.description}</Text>

          {/* Key Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Users size={20} color="#EAB308" />
              <Text style={styles.statLabel}>Capacity</Text>
              <Text style={styles.statValue}>{banquet.capacity} guests</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={{ fontSize: 20 }}>🏪</Text>
              <Text style={styles.statLabel}>Venue Type</Text>
              <Text style={styles.statValue}>Indoor Hall</Text>
            </View>
          </View>

          {/* Time Slots */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Available Time Slots</Text>
            <View style={styles.slotGrid}>
              {['morning', 'evening', 'night'].map((slot) => {
                const Icon = slotIcons[slot];
                const isAvailable = banquet.availableSlots.includes(slot as any);
                return (
                  <View
                    key={slot}
                    style={[styles.slotItem, isAvailable && styles.slotItemActive]}
                  >
                    <Icon size={24} color={isAvailable ? "#10B981" : "#888"} />
                    <Text style={[styles.slotText, isAvailable && styles.slotTextActive]}>
                      {slot.charAt(0).toUpperCase() + slot.slice(1)}
                    </Text>
                    {isAvailable && <Check size={14} color="#10B981" />}
                  </View>
                );
              })}
            </View>
          </View>

          {/* Amenities */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Amenities</Text>
            <View style={styles.amenitiesList}>
              {banquet.amenities.map((item: string) => (
                <View key={item} style={styles.amenityChip}>
                  <Text style={styles.amenityText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Contact Buttons */}
          <View style={styles.contactButtons}>
            <TouchableOpacity style={styles.contactBtn} onPress={() => handleContact('phone')}>
              <Phone size={20} color="#000" />
              <Text style={styles.contactBtnText}>Call Venue</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactBtn} onPress={() => handleContact('email')}>
              <Mail size={20} color="#000" />
              <Text style={styles.contactBtnText}>Email Venue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.priceLabel}>Starting from</Text>
          <Text style={styles.priceValue}>PKR {banquet.price.toLocaleString()}</Text>
        </View>
        <TouchableOpacity style={styles.bookBtn} onPress={() => navigation.navigate('Booking', { id: banquet.id })}>
          <Text style={styles.bookBtnText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  gallery: {
    height: height * 0.45,
    position: 'relative',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  navBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    zIndex: 10,
  },
  navBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  likedBtn: {
    backgroundColor: '#EAB308',
  },
  galleryControls: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: -22,
  },
  galleryBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicators: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  indicatorActive: {
    width: 24,
    backgroundColor: '#fff',
  },
  featuredTag: {
    position: 'absolute',
    bottom: 35,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAB308',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  featuredTagText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  contentCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    padding: 24,
  },
  mainInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 14,
    color: '#888',
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFEF5',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  ratingVal: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: '#666',
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statItem: {
    flex: 0.48,
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 8,
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 2,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  slotGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  slotItem: {
    flex: 0.31,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
    opacity: 0.5,
  },
  slotItemActive: {
    borderColor: '#10B981',
    backgroundColor: '#ECFDF5',
    opacity: 1,
  },
  slotText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#888',
    marginTop: 6,
    marginBottom: 4,
  },
  slotTextActive: {
    color: '#10B981',
  },
  amenitiesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  amenityChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
  },
  amenityText: {
    fontSize: 13,
    color: '#4B5563',
  },
  contactButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  contactBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    gap: 8,
  },
  contactBtnText: {
    fontSize: 14,
    fontWeight: '600',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  priceLabel: {
    fontSize: 12,
    color: '#888',
  },
  priceValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#EAB308',
  },
  bookBtn: {
    backgroundColor: '#000',
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 15,
  },
  bookBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BanquetDetailScreen;
