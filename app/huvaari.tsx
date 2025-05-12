import { Ionicons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const SCHEDULE = [
  {
    day: 'Даваа',
    lessons: [
      { time: '09:00 - 10:30', name: 'Веб програмчлал', teacher: 'Д.Батбаяр', room: '301', color: '#FF6B81' },
      { time: '11:00 - 12:30', name: 'Өгөгдлийн сан', teacher: 'Б.Золбоо', room: '405', color: '#4B7BEC' },
    ],
  },
  {
    day: 'Мягмар',
    lessons: [
      { time: '13:00 - 14:30', name: 'Програмчлалын хэл', teacher: 'Д.Ганзориг', room: '202', color: '#20BF6B' },
      { time: '15:00 - 16:30', name: 'Математик', teacher: 'С.Эрдэнэ', room: '101', color: '#FFD600' },
    ],
  },
  {
    day: 'Лхагва',
    lessons: [
      { time: '09:00 - 10:30', name: 'Англи хэл', teacher: 'Ж.Сараа', room: '303', color: '#00B894' },
      { time: '11:00 - 12:30', name: 'Физик', teacher: 'Б.Цогт', room: '201', color: '#8854D0' },
    ],
  },
  {
    day: 'Пүрэв',
    lessons: [
      { time: '13:00 - 14:30', name: 'Веб програмчлал', teacher: 'Д.Батбаяр', room: '301', color: '#FF6B81' },
    ],
  },
  {
    day: 'Баасан',
    lessons: [
      { time: '09:00 - 10:30', name: 'Өгөгдлийн сан', teacher: 'Б.Золбоо', room: '405', color: '#4B7BEC' },
      { time: '11:00 - 12:30', name: 'Математик', teacher: 'С.Эрдэнэ', room: '101', color: '#FFD600' },
    ],
  },
];

export default function HuvaariScreen() {
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
        <Text style={styles.headerTitle}>Хичээлийн хуваарь</Text>
        <View style={styles.menuBtn} />
      </View>
      <FlatList
        data={SCHEDULE}
        keyExtractor={item => item.day}
        contentContainerStyle={{ padding: 20, paddingTop: 0, paddingBottom: 24 }}
        renderItem={({ item }) => <DaySchedule day={item.day} lessons={item.lessons} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

function DaySchedule({ day, lessons }: { day: string, lessons: any[] }) {
  return (
    <View style={styles.dayBlock}>
      <Text style={styles.dayTitle}>{day}</Text>
      {lessons.map((lesson, idx) => (
        <View key={idx} style={[styles.lessonCard, { borderLeftColor: lesson.color }]}> 
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
            <Text style={[styles.lessonTime, { color: lesson.color }]}>{lesson.time}</Text>
            <View style={{ flex: 1 }} />
            <Text style={[styles.lessonRoom, { color: lesson.color }]}>{lesson.room}</Text>
          </View>
          <Text style={styles.lessonName}>{lesson.name}</Text>
          <Text style={styles.lessonTeacher}>{lesson.teacher}</Text>
        </View>
      ))}
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
  pageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 18,
    marginLeft: 20,
    marginTop: 8,
  },
  dayBlock: {
    marginBottom: 18,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B81',
    marginBottom: 8,
    marginLeft: 2,
  },
  lessonCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 10,
    borderLeftWidth: 6,
    shadowColor: '#FF6B81',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  lessonTime: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  lessonRoom: {
    fontSize: 15,
    fontWeight: 'bold',
    opacity: 0.7,
  },
  lessonName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 2,
  },
  lessonTeacher: {
    fontSize: 15,
    color: '#888',
    marginTop: 2,
  },
}); 