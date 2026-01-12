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
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as Icons from 'lucide-react-native';

const {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Sun,
  Sunset,
  Moon,
  CreditCard,
  ChevronDown
} = Icons as any;
import { banquets } from '../data/banquets';

const { width } = Dimensions.get('window');

const BookingScreen = ({ navigation, route }: any) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cnic: '',
    eventType: '',
    date: '',
    timeSlot: '',
    guests: '',
  });

  const { id } = route?.params || {};
  const banquet = banquets.find(b => b.id === id) || banquets[0];

  const handleSubmit = () => {
    alert('Booking request sent successfully!');
    navigation.navigate('BookingStatus');
  };

  const slotOptions = [
    { id: 'morning', label: 'Morning', time: '9:00 AM - 2:00 PM', icon: Sun },
    { id: 'evening', label: 'Evening', time: '3:00 PM - 8:00 PM', icon: Sunset },
    { id: 'night', label: 'Night', time: '9:00 PM - 2:00 AM', icon: Moon },
  ];

  const eventTypes = ["Wedding", "Birthday", "Corporate", "Other"];

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <ArrowLeft size={24} color="#000" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Book Venue</Text>
            <Text style={styles.headerSubtitle}>{banquet.name}</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Venue Mini Card */}
          <View style={styles.miniCard}>
            <Image source={{ uri: banquet.image }} style={styles.miniCardImage} />
            <View style={styles.miniCardInfo}>
              <Text style={styles.miniCardName}>{banquet.name}</Text>
              <Text style={styles.miniCardPrice}>PKR {banquet.price.toLocaleString()}</Text>
            </View>
          </View>

          {/* Form */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Details</Text>
            <View style={styles.inputGroup}>
              <View style={styles.inputWrapper}>
                <User size={18} color="#888" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  value={formData.name}
                  onChangeText={(text) => setFormData({ ...formData, name: text })}
                />
              </View>
              <View style={styles.inputWrapper}>
                <CreditCard size={18} color="#888" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="CNIC (e.g. 35201-xxxxxxx-x)"
                  value={formData.cnic}
                  onChangeText={(text) => setFormData({ ...formData, cnic: text })}
                />
              </View>
              <View style={styles.inputWrapper}>
                <Phone size={18} color="#888" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Phone Number"
                  keyboardType="phone-pad"
                  value={formData.phone}
                  onChangeText={(text) => setFormData({ ...formData, phone: text })}
                />
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Event Details</Text>

            <Text style={styles.label}>Event Type</Text>
            <View style={styles.optionsGrid}>
              {eventTypes.map(type => (
                <TouchableOpacity
                  key={type}
                  style={[styles.optionChip, formData.eventType === type && styles.optionChipActive]}
                  onPress={() => setFormData({ ...formData, eventType: type })}
                >
                  <Text style={[styles.optionText, formData.eventType === type && styles.optionTextActive]}>
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.inputWrapper}>
                <Calendar size={18} color="#888" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Event Date (YYYY-MM-DD)"
                  value={formData.date}
                  onChangeText={(text) => setFormData({ ...formData, date: text })}
                />
              </View>
            </View>

            <Text style={styles.label}>Time Slot</Text>
            <View style={styles.slotContainer}>
              {slotOptions.map((slot) => {
                const Icon = slot.icon;
                return (
                  <TouchableOpacity
                    key={slot.id}
                    onPress={() => setFormData({ ...formData, timeSlot: slot.id })}
                    style={[
                      styles.slotCard,
                      formData.timeSlot === slot.id && styles.slotCardActive
                    ]}
                  >
                    <Icon size={20} color={formData.timeSlot === slot.id ? "#EAB308" : "#888"} />
                    <Text style={[styles.slotLabel, formData.timeSlot === slot.id && styles.slotLabelActive]}>
                      {slot.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Text style={styles.submitBtnText}>Submit Booking Request</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
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
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  miniCard: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    borderRadius: 15,
    padding: 12,
    marginBottom: 24,
    alignItems: 'center',
  },
  miniCardImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  miniCardInfo: {
    marginLeft: 15,
  },
  miniCardName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  miniCardPrice: {
    fontSize: 14,
    color: '#EAB308',
    fontWeight: '600',
    marginTop: 2,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 12,
  },
  inputGroup: {
    gap: 12,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 54,
    borderWidth: 1,
    borderColor: '#eee',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  optionChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
  },
  optionChipActive: {
    backgroundColor: '#000',
  },
  optionText: {
    fontSize: 14,
    color: '#4B5563',
  },
  optionTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  slotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  slotCard: {
    flex: 0.31,
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  slotCardActive: {
    borderColor: '#EAB308',
    backgroundColor: '#FFFEF5',
  },
  slotLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#888',
    marginTop: 6,
  },
  slotLabelActive: {
    color: '#000',
  },
  submitBtn: {
    backgroundColor: '#000',
    height: 60,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  submitBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BookingScreen;
