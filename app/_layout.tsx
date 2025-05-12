import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Drawer } from 'expo-router/drawer';
import { Image, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

function CustomDrawerContent(props: any) {
  return (
    <View style={{ flex: 1, backgroundColor: '#fdfcfe' }}>
      <View style={styles.profileSection}>
        <Image 
          source={require('../assets/images/nmit.jpg')} 
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Б.Хувьтөгөлдөр</Text>
        <Text style={styles.profileId}>SE21D60</Text>
      </View>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ flexGrow: 1, paddingTop: 10 }}
      >
        <View style={styles.drawerListWrap}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
    </View>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Drawer
          drawerContent={props => <CustomDrawerContent {...props} />}
          screenOptions={{
            headerShown: false,
            drawerActiveTintColor: '#FF6B81',
            drawerInactiveTintColor: '#888',
            drawerLabelStyle: { 
              fontSize: 16, 
              fontWeight: '600',
              marginLeft: 10,
            },
            drawerStyle: { 
              backgroundColor: '#fff',
              width: 280,
              borderTopRightRadius: 32,
              borderBottomRightRadius: 32,
              shadowColor: '#FF6B81',
              shadowOpacity: 0.08,
              shadowRadius: 16,
              shadowOffset: { width: 0, height: 4 },
              elevation: 8,
            },
            drawerItemStyle: {
              borderRadius: 14,
              marginHorizontal: 8,
              marginVertical: 6,
              paddingVertical: 8,
              paddingLeft: 2,
            },
          }}
        >
          <Drawer.Screen name="login" options={{ drawerItemStyle: { display: 'none' } }} />
          <Drawer.Screen name="index" options={{
            title: 'Нүүр хуудас',
            drawerIcon: ({ color, size }) => <MaterialIcons name="home" size={size} color={color} />,
          }} />
          <Drawer.Screen name="medegdel" options={{
            title: 'Мэдэгдэл',
            drawerIcon: ({ color, size }) => <Ionicons name="notifications-outline" size={size} color={color} />,
          }} />
          <Drawer.Screen name="hicheel" options={{
            title: 'Хичээл',
            drawerIcon: ({ color, size }) => <MaterialIcons name="menu-book" size={size} color={color} />,
          }} />
          <Drawer.Screen name="daalgavar" options={{
            title: 'Даалгавар',
            drawerIcon: ({ color, size }) => <FontAwesome5 name="tasks" size={size ? size - 2 : 22} color={color} />,
          }} />
          <Drawer.Screen name="irts" options={{
            title: 'Ирц',
            drawerIcon: ({ color, size }) => <Ionicons name="checkmark-done-circle" size={size} color={color} />,
          }} />
          <Drawer.Screen name="huvaari" options={{
            title: 'Хуваарь',
            drawerIcon: ({ color, size }) => <MaterialIcons name="event-note" size={size} color={color} />,
          }} />
          <Drawer.Screen name="shalgalt" options={{
            title: 'Шалгалт',
            drawerIcon: ({ color, size }) => <MaterialIcons name="assignment" size={size} color={color} />,
          }} />
          <Drawer.Screen name="dvn" options={{
            title: 'Дүн',
            drawerIcon: ({ color, size }) => <Ionicons name="star" size={size} color={color} />,
          }} />
          <Drawer.Screen name="tohirgoo" options={{
            title: 'Тохиргоо',
            drawerIcon: ({ color, size }) => <Ionicons name="settings-outline" size={size} color={color} />,
          }} />
          <Drawer.Screen name="profile" options={{
            title: 'Профайл',
            drawerIcon: ({ color, size }) => <Ionicons name="person-circle-outline" size={size} color={color} />,
          }} />
          <Drawer.Screen name="huwilbar" options={{
            title: 'Хувилбар',
            drawerIcon: ({ color, size }) => <Ionicons name="information-circle-outline" size={size} color={color} />,
          }} />
        </Drawer>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  profileSection: {
    alignItems: 'center',
    paddingVertical: 36,
    backgroundColor: '#ff5f73',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    marginBottom: 20,
    marginHorizontal: 8,
    shadowColor: '#ff6b81',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: '#fff',
    marginBottom: 12,
  },
  profileName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  profileId: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.9,
    letterSpacing: 0.6,
  },
  drawerListWrap: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 12,
  },
});
