import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Dimensions,
  SafeAreaView,
  Platform,
} from 'react-native';
import * as Icons from 'lucide-react-native';

const {
  Calendar,
  Clock,
  Search,
  MapPin,
  Crown,
  User,
  Sun,
  Sunset,
  Moon,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  ChevronRight
} = Icons as any;

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }: any) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [selectedSlot, setSelectedSlot] = useState('');

  const cities = ["All Cities", "Lahore", "Karachi", "Islamabad", "Faisalabad", "Rawalpindi"];
  const timeSlots = [
    { id: 'morning', label: 'Morning', time: '11:00 AM - 04:00 PM', icon: Sun },
    { id: 'evening', label: 'Evening', time: '06:00 PM - 10:00 PM', icon: Sunset },
    { id: 'night', label: 'Night', time: '12:00 AM - 04:00 AM', icon: Moon },
  ];

  const handleSearch = () => {
    navigation.navigate('BanquetList', { city: selectedCity, date: selectedDate });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} stickyHeaderIndices={[1]} showsVerticalScrollIndicator={false}>
        {/* Header/Hero Section */}
        <View style={styles.hero}>
          <Image
            source={require('../assets/hero-banquet.jpg')}
            style={styles.heroImage}
          />
          <View style={styles.overlay} />

          <View style={styles.nav}>
            <View style={styles.logoContainer}>
              <View style={styles.logoBadge}>
                <Crown size={20} color="#000" />
              </View>
              <Text style={styles.logoText}>BanquetBook</Text>
            </View>
            <View style={styles.navIcons}>
              <TouchableOpacity style={styles.navIconBtn}>
                <User size={20} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.navIconBtn, styles.bookingBtn]}>
                <Text style={styles.bookingBtnText}>My Bookings</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>
              Find Your Dream{"\n"}
              <Text style={styles.highlightText}>Venue</Text>
            </Text>
            <Text style={styles.heroSubtitle}>
              Discover and book the finest banquet halls for weddings and celebrations.
            </Text>
          </View>
        </View>

        {/* Search Box */}
        <View style={styles.searchBoxContainer}>
          <View style={styles.searchBox}>
            <Text style={styles.searchTitle}>Search Available Venues</Text>

            <View style={styles.inputGroup}>
              <View style={styles.inputWrapper}>
                <Calendar size={18} color="#888" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Select Date"
                  value={selectedDate}
                  onChangeText={setSelectedDate}
                />
              </View>

              <View style={styles.inputWrapper}>
                <MapPin size={18} color="#888" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Select City"
                  value={selectedCity}
                  onChangeText={setSelectedCity}
                />
              </View>
            </View>

            <Text style={styles.label}>Preferred Time Slot</Text>
            <View style={styles.slotContainer}>
              {timeSlots.map((slot) => {
                const Icon = slot.icon;
                return (
                  <TouchableOpacity
                    key={slot.id}
                    onPress={() => setSelectedSlot(slot.id === selectedSlot ? '' : slot.id)}
                    style={[
                      styles.slotCard,
                      selectedSlot === slot.id && styles.slotCardActive
                    ]}
                  >
                    <Icon size={24} color={selectedSlot === slot.id ? "#EAB308" : "#888"} />
                    <Text style={[styles.slotLabel, selectedSlot === slot.id && styles.slotLabelActive]}>
                      {slot.label}
                    </Text>
                    <Text style={styles.slotTime}>{slot.time.split(' - ')[0]}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <TouchableOpacity style={styles.searchButton}>
              <Search size={20} color="#fff" style={{ marginRight: 8 }} />
              <Text style={styles.searchButtonText}>Search Venues</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Features Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why Choose Us?</Text>
          <View style={styles.featuresGrid}>
            {[
              { title: 'Verified Venues', icon: 'check-circle' },
              { title: 'Best Prices', icon: 'dollar-sign' },
              { title: 'Easy Booking', icon: 'calendar' }
            ].map((f, i) => (
              <View key={i} style={styles.featureCard}>
                <View style={styles.featureIcon}>
                  <Text style={{ fontSize: 24 }}>{i === 0 ? '✅' : i === 1 ? '💰' : '📅'}</Text>
                </View>
                <Text style={styles.featureName}>{f.title}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Contact info */}
        <View style={styles.contactSection}>
          <Text style={styles.sectionTitle}>Get In Touch</Text>
          <View style={styles.contactRow}>
            <Mail size={20} color="#EAB308" />
            <Text style={styles.contactText}>info@banquetbook.pk</Text>
          </View>
          <View style={styles.contactRow}>
            <Phone size={20} color="#EAB308" />
            <Text style={styles.contactText}>+92 300 1234567</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2026 BanquetBook. All rights reserved.</Text>
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
  container: {
    flex: 1,
  },
  hero: {
    height: height * 0.45,
    position: 'relative',
    justifyContent: 'flex-start',
  },
  heroImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 10 : 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EAB308',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  navIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navIconBtn: {
    marginLeft: 15,
  },
  bookingBtn: {
    backgroundColor: '#EAB308',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  bookingBtnText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  heroContent: {
    paddingHorizontal: 24,
    marginTop: 40,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    lineHeight: 40,
  },
  highlightText: {
    color: '#EAB308',
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 10,
    maxWidth: '80%',
  },
  searchBoxContainer: {
    marginTop: -40,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchBox: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  searchTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  inputGroup: {
    gap: 12,
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 50,
    borderWidth: 1,
    borderColor: '#eee',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#000',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 12,
  },
  slotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  slotCard: {
    flex: 0.31,
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },
  slotCardActive: {
    borderColor: '#EAB308',
    backgroundColor: '#FFFEF5',
  },
  slotLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#888',
    marginTop: 6,
  },
  slotLabelActive: {
    color: '#000',
  },
  slotTime: {
    fontSize: 10,
    color: '#aaa',
    marginTop: 2,
  },
  searchButton: {
    backgroundColor: '#000',
    height: 56,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 24,
  },
  featuresGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  featureCard: {
    flex: 0.3,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  featureName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  contactSection: {
    padding: 24,
    backgroundColor: '#f9f9f9',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    justifyContent: 'center'
  },
  contactText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#666',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#000',
  },
  footerText: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.6,
  },
});

export default HomeScreen;
