import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const MENU_ITEMS = [
  { icon: <MaterialIcons name="menu-book" size={28} color="#FF6B81" />, label: 'Хичээл', route: 'hicheel' },
  { icon: <FontAwesome5 name="tasks" size={24} color="#4B7BEC" />, label: 'Даалгавар', route: 'daalgavar' },
  { icon: <Ionicons name="checkmark-done-circle" size={28} color="#20BF6B" />, label: 'Ирц', route: 'irts' },
  { icon: <MaterialIcons name="event-note" size={28} color="#F7B731" />, label: 'Хуваарь', route: 'huvaari' },
  { icon: <MaterialIcons name="assignment" size={28} color="#FD5E53" />, label: 'Шалгалт', route: 'shalgalt' },
  { icon: <Ionicons name="star" size={28} color="#8854D0" />, label: 'Дүн', route: 'dvn' },
];

export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          style={styles.menuBtn}
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        >
          <Ionicons name="menu" size={26} color="#fff" />
        </Pressable>
        <Text style={styles.headerTitle}>Нүүр хуудас</Text>
        <Ionicons name="notifications-outline" size={24} color="#fff" />
      </View>

      {/* Profile Info */}
      <View style={styles.profileSection}>
        <Image source={require('../../assets/images/nmit.jpg')} style={styles.profileImage} />
        <View style={{ marginLeft: 14, flex: 1 }}>
          <Text style={styles.profileName}>Б.Хувьтөгөлдөр</Text>
          <Text style={styles.profileInfo}>Оюутан | SE21D60</Text>
        </View>
      </View>

      {/* Main Menu */}
      <View style={styles.menuSection}>
        <FlatList
          data={MENU_ITEMS}
          numColumns={2}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item }) => <MenuButton icon={item.icon} label={item.label} route={item.route} />}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={{ paddingBottom: 8 }}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Recent Activity */}
      <Text style={styles.sectionTitle}>Сүүлийн үйл ажиллагаа</Text>
      <FlatList
        data={[
          { icon: 'checkmark-circle' as const, text: 'Даалгавар илгээсэн', time: '2 цагийн өмнө' },
          { icon: 'checkmark-circle' as const, text: 'Даалгавар илгээсэн', time: '2 цагийн өмнө' },
        ]}
        numColumns={2}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <View style={styles.activityCard}>
            <Ionicons name={item.icon} size={22} color="#FF6B81" style={{ marginRight: 10 }} />
            <View>
              <Text style={styles.activityText}>{item.text}</Text>
              <Text style={styles.activityTime}>{item.time}</Text>
            </View>
          </View>
        )}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 18 }}
      />
    </View>
  );
}

function MenuButton({ icon, label, route }: { icon: React.ReactNode; label: string; route: string }) {
  const navigation = useNavigation();
  return (
    <Pressable
      style={({ pressed }) => [
        styles.menuButtonBox,
        { opacity: pressed ? 0.85 : 1 },
      ]}
      onPress={() => (navigation as any).navigate(route)}
    >
      {icon}
      <Text style={styles.menuLabel}>{label}</Text>
    </Pressable>
  );
}

const { width } = Dimensions.get('window');
const menuBoxWidth = (width - 56) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#FF6B81',
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    paddingTop: 42,
    paddingBottom: 18,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
    shadowColor: '#FF6B81',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  menuBtn: {
    padding: 4,
    width: 36,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginHorizontal: 20,
    marginTop: -16,
    borderRadius: 18,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  profileImage: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#fff',
  },
  profileName: {
    color: '#222',
    fontSize: 17,
    fontWeight: 'bold',
  },
  profileInfo: {
    color: '#888',
    fontSize: 13,
    marginTop: 2,
  },
  menuSection: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 12,
  },
  menuButtonBox: {
    width: menuBoxWidth,
    aspectRatio: 1.05,
    backgroundColor: '#fff',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  menuLabel: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 8,
    marginLeft: 28,
    marginBottom: 8,
    color: '#333',
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 16,
    width: (width - 56) / 2,
  },
  activityText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#222',
  },
  activityTime: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
});
