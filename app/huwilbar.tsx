import { Ionicons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HuwilbarScreen() {
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
        <Text style={styles.headerTitle}>Хувилбар</Text>
        <View style={styles.menuBtn} />
      </View>

      <View style={styles.content}>
        {/* App Info */}
        <View style={styles.section}>
          <Image 
            source={require('../assets/images/nmit.jpg')} 
            style={styles.appLogo}
          />
          <Text style={styles.appName}>НМИТ Студент</Text>
          <Text style={styles.version}>Хувилбар 1.0.0</Text>
        </View>

        {/* Developer Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Хөгжүүлэгч</Text>
          <View style={styles.infoItem}>
            <Ionicons name="code-slash-outline" size={24} color="#666" />
            <Text style={styles.infoText}>НМИТ-ийн Мэдээллийн Технологийн Тэнхим</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="mail-outline" size={24} color="#666" />
            <Text style={styles.infoText}>info@nmit.edu.mn</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="call-outline" size={24} color="#666" />
            <Text style={styles.infoText}>+976 7011-0808</Text>
          </View>
        </View>

        {/* Links */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Холбоос</Text>
          <TouchableOpacity 
            style={styles.linkItem}
            onPress={() => Linking.openURL('https://nmit.edu.mn')}
          >
            <Ionicons name="globe-outline" size={24} color="#666" />
            <Text style={styles.linkText}>nmit.edu.mn</Text>
            <Ionicons name="chevron-forward" size={24} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.linkItem}
            onPress={() => Linking.openURL('https://facebook.com/nmit')}
          >
            <Ionicons name="logo-facebook" size={24} color="#666" />
            <Text style={styles.linkText}>Facebook</Text>
            <Ionicons name="chevron-forward" size={24} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Copyright */}
        <Text style={styles.copyright}>
          © 2024 НМИТ. Бүх эрх хуулиар хамгаалагдсан.
        </Text>
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
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
  },
  appLogo: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginBottom: 16,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
  },
  version: {
    fontSize: 16,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoText: {
    fontSize: 16,
    color: '#444',
    marginLeft: 12,
    flex: 1,
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  linkText: {
    fontSize: 16,
    color: '#444',
    marginLeft: 12,
    flex: 1,
  },
  copyright: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
    marginTop: 8,
  },
}); 