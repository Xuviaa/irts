import { Ionicons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const EXAMS = [
  {
    id: '1',
    subject: 'Веб програмчлал',
    subjectColor: '#FF6B81',
    type: 'Явцын шалгалт',
    typeColor: '#FF6B81',
    title: 'Явцын шалгалт 1',
    date: '2024-03-30',
    time: '09:00 - 10:30',
    room: '301',
    status: 'upcoming'
  },
  {
    id: '2',
    subject: 'Өгөгдлийн сан',
    subjectColor: '#4B7BEC',
    type: 'Дунд шалгалт',
    typeColor: '#4B7BEC',
    title: 'Дунд шалгалт',
    date: '2024-04-02',
    time: '11:00 - 12:30',
    room: '405',
    status: 'today'
  },
  {
    id: '3',
    subject: 'Програмчлалын хэл',
    subjectColor: '#20BF6B',
    type: 'Улирлын шалгалт',
    typeColor: '#20BF6B',
    title: 'Улирлын шалгалт',
    date: '2024-04-05',
    time: '13:00 - 14:30',
    room: '202',
    status: 'tomorrow'
  },
];

const STATUS_BADGES = {
  upcoming: { label: 'Удахгүй', color: '#FF6B81' },
  today: { label: 'Өнөөдөр', color: '#4B7BEC' },
  tomorrow: { label: 'Маргааш', color: '#20BF6B' },
};

export default function ShalgaltScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.menuBtn}
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        >
          <Ionicons name="menu" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Шалгалтууд</Text>
        <View style={styles.menuBtn} />
      </View>
      {/* Summary Cards */}
      <View style={styles.summaryContainer}>
        <SummaryCard color="#FF6B81" label="Удахгүй" number={3} />
        <SummaryCard color="#4B7BEC" label="Өнөөдөр" number={2} />
        <SummaryCard color="#20BF6B" label="Маргааш" number={1} />
      </View>
      <FlatList
        data={EXAMS}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => <ExamCard exam={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

function SummaryCard({ color, label, number }: { color: string; label: string; number: number }) {
  return (
    <View style={[styles.summaryCard, { backgroundColor: color + 'CC', shadowColor: color }]}> 
      <Text style={styles.summaryNumber}>{number}</Text>
      <Text style={styles.summaryLabel}>{label}</Text>
    </View>
  );
}

function ExamCard({ exam }: { exam: any }) {
  const badge = STATUS_BADGES[exam.status as keyof typeof STATUS_BADGES] || STATUS_BADGES.upcoming;
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.92}>
      <View style={styles.cardHeader}>
        <View style={styles.subjectContainer}>
          <View style={[styles.subjectDot, { backgroundColor: exam.subjectColor }]} />
          <Text style={[styles.subject, { color: exam.subjectColor }]}>{exam.subject}</Text>
        </View>
        <View style={[styles.typeBadge, { backgroundColor: exam.typeColor + '15' }]}> 
          <Text style={[styles.typeBadgeText, { color: exam.typeColor }]}>{exam.type}</Text>
        </View>
      </View>
      <Text style={styles.title}>{exam.title}</Text>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Ionicons name="calendar-outline" size={18} color="#666" style={styles.infoIcon} />
          <Text style={styles.info}>{exam.date}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={18} color="#666" style={styles.infoIcon} />
          <Text style={styles.info}>{exam.time}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={18} color="#666" style={styles.infoIcon} />
          <Text style={styles.info}>{exam.room}</Text>
        </View>
      </View>
      <View style={[styles.statusBadge, { backgroundColor: badge.color + '22', borderColor: badge.color }]}> 
        <Text style={[styles.statusBadgeText, { color: badge.color }]}>{badge.label}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F8F8F8' 
  },
  header: {
    backgroundColor: '#FF6B81',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 48,
    paddingBottom: 18,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#FF6B81',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  menuBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: { 
    color: '#fff', 
    fontSize: 22, 
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    borderRadius: 18,
    padding: 18,
    alignItems: 'center',
    marginHorizontal: 2,
    elevation: 3,
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  summaryNumber: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  summaryLabel: {
    color: '#fff',
    fontSize: 15,
    opacity: 0.95,
    fontWeight: '500',
  },
  listContainer: { 
    padding: 20, 
    paddingTop: 0, 
    paddingBottom: 24 
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 22,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
    borderWidth: 1.5,
    borderColor: '#F8D7DF',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  subjectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subjectDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  subject: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  typeBadge: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  typeBadgeText: {
    fontSize: 13,
    fontWeight: '600',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 16,
  },
  infoContainer: {
    backgroundColor: '#F8F8F8',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoIcon: {
    marginRight: 8,
  },
  info: {
    fontSize: 15,
    color: '#666',
  },
  statusBadge: {
    alignSelf: 'flex-end',
    marginTop: -8,
    borderRadius: 12,
    borderWidth: 1.5,
    paddingHorizontal: 14,
    paddingVertical: 5,
    marginBottom: 2,
  },
  statusBadgeText: {
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
}); 