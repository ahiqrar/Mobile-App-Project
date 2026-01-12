import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  SafeAreaView,
  Platform,
} from 'react-native';
import * as Icons from 'lucide-react-native';

const {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Calendar,
  LogOut,
  ChevronRight,
  Edit2,
  Settings,
  Bell,
  HelpCircle,
  Crown
} = Icons as any;

const { width } = Dimensions.get('window');

const UserProfileScreen = ({ navigation }: any) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Ahmed Khan",
    email: "ahmed.khan@email.com",
    phone: "+92 300 1234567",
    joinedDate: "January 2026",
  });

  const menuItems = [
    { icon: Calendar, label: "My Bookings" },
    { icon: Bell, label: "Notifications" },
    { icon: Settings, label: "Settings" },
    { icon: HelpCircle, label: "Help & Support" },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <ArrowLeft size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => setIsEditing(!isEditing)}
        >
          {isEditing ? (
            <Text style={styles.saveText}>Save</Text>
          ) : (
            <Edit2 size={20} color="#000" />
          )}
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <User size={40} color="#fff" />
            </View>
          </View>

          {isEditing ? (
            <View style={styles.editForm}>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  value={profile.name}
                  onChangeText={(text) => setProfile({ ...profile, name: text })}
                />
              </View>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  style={styles.input}
                  value={profile.email}
                  keyboardType="email-address"
                  onChangeText={(text) => setProfile({ ...profile, email: text })}
                />
              </View>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Phone</Text>
                <TextInput
                  style={styles.input}
                  value={profile.phone}
                  keyboardType="phone-pad"
                  onChangeText={(text) => setProfile({ ...profile, phone: text })}
                />
              </View>
            </View>
          ) : (
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{profile.name}</Text>
              <View style={styles.infoRow}>
                <Mail size={14} color="#888" />
                <Text style={styles.infoText}>{profile.email}</Text>
              </View>
              <View style={styles.infoRow}>
                <Phone size={14} color="#888" />
                <Text style={styles.infoText}>{profile.phone}</Text>
              </View>
              <Text style={styles.joinedText}>Member since {profile.joinedDate}</Text>
            </View>
          )}
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          {[
            { label: "Bookings", value: "3" },
            { label: "Completed", value: "1" },
            { label: "Favorites", value: "5" },
          ].map((stat) => (
            <View key={stat.label} style={styles.statBox}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Menu */}
        <View style={styles.menuCard}>
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <TouchableOpacity
                key={item.label}
                style={[styles.menuItem, index !== menuItems.length - 1 && styles.menuItemBorder]}
              >
                <View style={styles.menuItemLeft}>
                  <Icon size={20} color="#666" />
                  <Text style={styles.menuItemLabel}>{item.label}</Text>
                </View>
                <ChevronRight size={20} color="#ccc" />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={() => navigation.replace('Auth')}>
          <LogOut size={20} color="#EF4444" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        {/* Owner Portal */}
        <View style={styles.ownerPortal}>
          <Text style={styles.ownerText}>Are you a venue owner?</Text>
          <TouchableOpacity style={styles.switchBtn}>
            <Crown size={16} color="#EAB308" />
            <Text style={styles.switchBtnText}>Switch to Owner Portal</Text>
          </TouchableOpacity>
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
  editBtn: {
    padding: 5,
  },
  saveText: {
    color: '#EAB308',
    fontWeight: 'bold',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EAB308',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    alignItems: 'center',
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
  },
  joinedText: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 12,
  },
  editForm: {
    width: '100%',
  },
  inputWrapper: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 6,
    marginLeft: 4,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 14,
    backgroundColor: '#f9f9f9',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statBox: {
    flex: 0.31,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#EAB308',
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  menuCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    overflow: 'hidden',
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuItemLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#fee2e2',
    backgroundColor: '#fef2f2',
    gap: 8,
    marginBottom: 30,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#EF4444',
  },
  ownerPortal: {
    alignItems: 'center',
  },
  ownerText: {
    fontSize: 13,
    color: '#888',
    marginBottom: 8,
  },
  switchBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  switchBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#EAB308',
  },
});

export default UserProfileScreen;
