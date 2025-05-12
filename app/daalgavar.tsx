import { Ionicons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ASSIGNMENTS = [
  {
    id: '1',
    subject: 'Веб програмчлал',
    subjectColor: '#FF6B81',
    title: 'Лабораторийн ажил 1',
    description: 'React Native суулгах, төсөл үүсгэх',
    date: '2024-03-25',
    status: 'pending',
  },
  {
    id: '2',
    subject: 'Өгөгдлийн сан',
    subjectColor: '#00B894',
    title: 'Бие даалт 1',
    description: 'ERD диаграм зурах',
    date: '2024-03-26',
    status: 'sent',
  },
  {
    id: '3',
    subject: 'Програмчлалын хэл',
    subjectColor: '#00BFAE',
    title: 'Бие даалт 2',
    description: 'Python функц бичих',
    date: '2024-03-27',
    status: 'pending',
  },
];

export default function DaalgavarScreen() {
  const [assignments, setAssignments] = useState(ASSIGNMENTS);
  const navigation = useNavigation();

  const handleSend = (id: string) => {
    setAssignments(prev => prev.map(a => a.id === id ? { ...a, status: 'sent' } : a));
  };

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
        <Text style={styles.headerTitle}>Даалгавар</Text>
        <View style={styles.menuBtn} />
      </View>
      <FlatList
        data={assignments}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 20, paddingTop: 12 }}
        renderItem={({ item }) => <AssignmentCard assignment={item} onSend={handleSend} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

function AssignmentCard({ assignment, onSend }: { assignment: any, onSend: (id: string) => void }) {
  return (
    <View style={styles.card}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
        <View style={[styles.dot, { backgroundColor: assignment.subjectColor }]} />
        <Text style={[styles.subject, { color: assignment.subjectColor }]}>{assignment.subject}</Text>
      </View>
      <Text style={styles.title}>{assignment.title}</Text>
      <Text style={styles.desc}>{assignment.description}</Text>
      <View style={styles.cardFooter}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="calendar-outline" size={18} color="#888" style={{ marginRight: 4 }} />
          <Text style={styles.date}>{assignment.date}</Text>
        </View>
        {assignment.status === 'pending' ? (
          <TouchableOpacity style={styles.sendBtn} onPress={() => onSend(assignment.id)}>
            <Text style={styles.sendBtnText}>Илгээх</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.sentBtn}>
            <Text style={styles.sentBtnText}>Илгээсэн</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8F8' },
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
    marginBottom: 8,
  },
  menuBtn: { 
    padding: 4,
    width: 40,
    alignItems: 'center',
  },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  subject: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#222',
  },
  desc: {
    fontSize: 15,
    color: '#888',
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  date: {
    fontSize: 14,
    color: '#888',
  },
  sendBtn: {
    backgroundColor: '#FF6B81',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 22,
  },
  sendBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  sentBtn: {
    borderWidth: 1.5,
    borderColor: '#FF6B81',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 18,
  },
  sentBtnText: {
    color: '#FF6B81',
    fontWeight: 'bold',
    fontSize: 15,
  },
}); 