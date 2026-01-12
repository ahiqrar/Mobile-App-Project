import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import * as Icons from 'lucide-react-native';

const {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Info
} = Icons as any;

const { width } = Dimensions.get('window');

type SlotStatus = 'free' | 'booked' | 'blocked';

interface DaySlots {
  morning: SlotStatus;
  evening: SlotStatus;
  night: SlotStatus;
}

const AvailabilityManagement = ({ navigation }: any) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedVenue, setSelectedVenue] = useState('1');

  const [availability, setAvailability] = useState<Record<string, DaySlots>>({
    '2026-02-15': { morning: 'booked', evening: 'free', night: 'free' },
    '2026-02-16': { morning: 'free', evening: 'booked', night: 'blocked' },
    '2026-02-20': { morning: 'free', evening: 'free', night: 'booked' },
  });

  const venues = [
    { id: '1', name: 'Royal Palace Banquet' },
    { id: '2', name: 'Grand Celebration Hall' },
  ];

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const getDaySlots = (day: number): DaySlots => {
    const month = (currentMonth.getMonth() + 1).toString().padStart(2, '0');
    const dayStr = day.toString().padStart(2, '0');
    const key = `${currentMonth.getFullYear()}-${month}-${dayStr}`;
    return availability[key] || { morning: 'free', evening: 'free', night: 'free' };
  };

  const toggleSlot = (day: number, slot: keyof DaySlots) => {
    const month = (currentMonth.getMonth() + 1).toString().padStart(2, '0');
    const dayStr = day.toString().padStart(2, '0');
    const key = `${currentMonth.getFullYear()}-${month}-${dayStr}`;

    const currentSlots = getDaySlots(day);
    const currentStatus = currentSlots[slot];

    if (currentStatus === 'booked') return;

    const newStatus: SlotStatus = currentStatus === 'free' ? 'blocked' : 'free';

    setAvailability({
      ...availability,
      [key]: { ...currentSlots, [slot]: newStatus },
    });
  };

  const statusColors: any = {
    free: '#10B981',
    booked: '#EAB308',
    blocked: '#666',
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <ArrowLeft size={24} color="#000" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Availability</Text>
            <Text style={styles.headerSubtitle}>Manage your venue calendar</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Venue Selector */}
        <View style={styles.selectorContainer}>
          <Text style={styles.label}>Select Venue</Text>
          <View style={styles.venuePicker}>
            <Text style={styles.venuePickerText}>{venues.find(v => v.id === selectedVenue)?.name}</Text>
          </View>
        </View>

        {/* Calendar Card */}
        <View style={styles.calendarCard}>
          <View style={styles.monthNav}>
            <TouchableOpacity onPress={prevMonth} style={styles.navIconBtn}>
              <ChevronLeft size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.monthTitle}>{monthName}</Text>
            <TouchableOpacity onPress={nextMonth} style={styles.navIconBtn}>
              <ChevronRight size={24} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Legend */}
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendBox, { backgroundColor: '#10B98120', borderColor: '#10B981' }]} />
              <Text style={styles.legendText}>Available</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendBox, { backgroundColor: '#EAB30820', borderColor: '#EAB308' }]} />
              <Text style={styles.legendText}>Booked</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendBox, { backgroundColor: '#f0f0f0', borderColor: '#ccc' }]} />
              <Text style={styles.legendText}>Blocked</Text>
            </View>
          </View>

          {/* Day Headers */}
          <View style={styles.dayHeaders}>
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
              <Text key={i} style={styles.dayHeaderText}>{day}</Text>
            ))}
          </View>

          {/* Calendar Grid */}
          <View style={styles.grid}>
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <View key={`empty-${i}`} style={styles.cell} />
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const slots = getDaySlots(day);
              return (
                <View key={day} style={styles.cell}>
                  <Text style={styles.dayLabel}>{day}</Text>
                  <View style={styles.slotsRow}>
                    {(['morning', 'evening', 'night'] as const).map((slot) => (
                      <TouchableOpacity
                        key={slot}
                        onPress={() => toggleSlot(day, slot)}
                        style={[
                          styles.slotIndicator,
                          { backgroundColor: statusColors[slots[slot]] },
                          slots[slot] === 'free' && { backgroundColor: '#10B98120', borderWidth: 0.5, borderColor: '#10B981' },
                          slots[slot] === 'booked' && { backgroundColor: '#EAB308' },
                          slots[slot] === 'blocked' && { backgroundColor: '#ccc' },
                        ]}
                      />
                    ))}
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.helpBox}>
          <Info size={16} color="#888" />
          <Text style={styles.helpText}>
            Tap on time slots to toggle between available and blocked. Booked slots cannot be changed.
          </Text>
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
  selectorContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  venuePicker: {
    height: 50,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    justifyContent: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#f9f9f9',
  },
  venuePickerText: {
    fontSize: 15,
    color: '#333',
  },
  calendarCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  monthNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  navIconBtn: {
    padding: 8,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendBox: {
    width: 12,
    height: 12,
    borderRadius: 3,
    borderWidth: 1,
  },
  legendText: {
    fontSize: 11,
    color: '#888',
  },
  dayHeaders: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  dayHeaderText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    color: '#aaa',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    width: (width - 74) / 7,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    marginHorizontal: 1,
  },
  dayLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  slotsRow: {
    flexDirection: 'row',
    gap: 2,
  },
  slotIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  helpBox: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 12,
    marginTop: 24,
    gap: 10,
    alignItems: 'center',
  },
  helpText: {
    fontSize: 12,
    color: '#666',
    flex: 1,
    lineHeight: 18,
  },
});

export default AvailabilityManagement;
