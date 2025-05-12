import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const navigation = useNavigation();
  // Example static data
  const name = 'Б.Хувьтөгөлдөр';
  const studentId = 'SE21D60';
  const email = 'user@gmail.com';
  const phone = '99112233';
  const gender = 'Эрэгтэй';
  const birthdate = '2002-05-15';
  const department = 'Мэдээллийн Технологи';

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
        <Text style={styles.headerTitle}>Профайл</Text>
        <View style={styles.menuBtn} />
      </View>
      {/* Profile Picture & Name */}
      <View style={styles.profileSection}>
        <Image source={require('../assets/images/nmit.jpg')} style={styles.profileImage} />
        <Text style={styles.profileName}>{name}</Text>
        <Text style={styles.profileId}>{studentId}</Text>
      </View>
      {/* Info Card */}
      <View style={styles.infoCard}>
        <ProfileRow icon={<Ionicons name="mail-outline" size={22} color="#FF6B81" />} label="Имэйл" value={email} />
        <ProfileRow icon={<Ionicons name="call-outline" size={22} color="#FF6B81" />} label="Утас" value={phone} />
        <View style={styles.divider} />
        <ProfileRow icon={<MaterialIcons name="wc" size={22} color="#FF6B81" />} label="Хүйс" value={gender} />
        <ProfileRow icon={<Ionicons name="calendar-outline" size={22} color="#FF6B81" />} label="Төрсөн огноо" value={birthdate} />
        <ProfileRow icon={<Ionicons name="school-outline" size={22} color="#FF6B81" />} label="Тэнхим" value={department} />
      </View>
    </View>
  );
}

function ProfileRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <View style={styles.row}>
      {icon}
      <Text style={styles.label}>{label}</Text>
      <View style={{ flex: 1 }} />
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    backgroundColor: '#FF6B81',
    paddingTop: 48,
    paddingBottom: 18,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  menuBtn: {
    padding: 4,
    width: 40,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 18,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
  },
  profileId: {
    fontSize: 16,
    color: '#888',
    marginBottom: 8,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    marginHorizontal: 20,
    padding: 18,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  label: {
    fontSize: 16,
    color: '#888',
    marginLeft: 10,
    minWidth: 90,
  },
  value: {
    fontSize: 16,
    color: '#222',
    fontWeight: 'bold',
    textAlign: 'right',
    maxWidth: 160,
  },
  divider: {
    height: 1,
    backgroundColor: '#F2B8C6',
    marginVertical: 10,
    borderRadius: 1,
  },
}); 