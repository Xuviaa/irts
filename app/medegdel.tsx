import { Ionicons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const NOTIFICATIONS = [
  {
    id: '1',
    title: 'Шинэ даалгавар ирлээ',
    description: 'Веб програмчлал хичээлийн лабораторийн ажил 2 нэмэгдлээ.',
    date: '2024-06-01 10:30',
    icon: 'document-text-outline',
    color: '#FF6B81',
  },
  {
    id: '2',
    title: 'Ирцийн бүртгэл',
    description: 'Өгөгдлийн сан хичээлийн ирцийн кодыг багш орууллаа.',
    date: '2024-06-01 09:00',
    icon: 'checkmark-done-circle-outline',
    color: '#20BF6B',
  },
  {
    id: '3',
    title: 'Шалгалтын хуваарь шинэчлэгдлээ',
    description: 'Програмчлалын хэл шалгалтын огноо өөрчлөгдсөн.',
    date: '2024-05-31 17:45',
    icon: 'calendar-outline',
    color: '#4B7BEC',
  },
];

export default function MedegdelScreen() {
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
        <Text style={styles.headerTitle}>Мэдэгдэл</Text>
        <View style={styles.menuBtn} />
      </View>
      <FlatList
        data={NOTIFICATIONS}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 20, paddingTop: 12, paddingBottom: 24 }}
        renderItem={({ item }) => <NotificationCard notification={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

function NotificationCard({ notification }: { notification: any }) {
  return (
    <View style={styles.card}>
      <View style={[styles.iconCircle, { backgroundColor: notification.color + '22' }] }>
        <Ionicons name={notification.icon} size={26} color={notification.color} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{notification.title}</Text>
        <Text style={styles.desc}>{notification.description}</Text>
        <Text style={styles.date}>{notification.date}</Text>
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
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    gap: 14,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
  },
  desc: {
    fontSize: 15,
    color: '#888',
    marginBottom: 6,
  },
  date: {
    fontSize: 13,
    color: '#aaa',
    marginTop: 2,
  },
}); 