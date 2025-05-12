import { Ionicons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import React from 'react';
import { Alert, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

export default function TohirgooScreen() {
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);
  const [autoLogin, setAutoLogin] = React.useState(true);
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert(
      "Гарах",
      "Та системээс гарахдаа итгэлтэй байна уу?",
      [
        {
          text: "Болих",
          style: "cancel"
        },
        {
          text: "Гарах",
          style: "destructive",
          onPress: () => {
            // Here you would typically clear any auth tokens or user data
            router.replace('/login');
          }
        }
      ]
    );
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
        <Text style={styles.headerTitle}>Тохиргоо</Text>
        <View style={styles.menuBtn} />
      </View>

      <View style={styles.content}>
        {/* Notification Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Мэдэгдэл</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="notifications-outline" size={24} color="#666" />
              <Text style={styles.settingText}>Мэдэгдэл идэвхжүүлэх</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#ddd', true: '#FF6B81' }}
              thumbColor="#fff"
            />
          </View>
        </View>

        {/* Appearance Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Харагдац</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="moon-outline" size={24} color="#666" />
              <Text style={styles.settingText}>Харанхуй горим</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#ddd', true: '#FF6B81' }}
              thumbColor="#fff"
            />
          </View>
        </View>

        {/* Account Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Бүртгэл</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="log-in-outline" size={24} color="#666" />
              <Text style={styles.settingText}>Автомат нэвтрэх</Text>
            </View>
            <Switch
              value={autoLogin}
              onValueChange={setAutoLogin}
              trackColor={{ false: '#ddd', true: '#FF6B81' }}
              thumbColor="#fff"
            />
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Нууц үг солих</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.logoutButton]}
            onPress={handleLogout}
          >
            <Text style={[styles.buttonText, styles.logoutText]}>Гарах</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 48,
    paddingBottom: 18,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 16,
  },
  menuBtn: {
    padding: 4,
    width: 40,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  content: {
    padding: 20,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    color: '#444',
    marginLeft: 12,
  },
  button: {
    backgroundColor: '#FF6B81',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#FF6B81',
  },
  logoutText: {
    color: '#FF6B81',
  },
}); 