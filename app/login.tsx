import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (email === 'user@gmail.com' && password === '123') {
      router.replace('/(tabs)');
    } else {
      Alert.alert('Алдаа', 'И-мэйл эсвэл нууц үг буруу байна');
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/nmit.jpg')}
          style={styles.logo}
        />
      </View>

      {/* Title */}
      <Text style={styles.title}>Оюутны апп</Text>

      {/* Inputs */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>И-мэйл</Text>
        <TextInput
          style={styles.input}
          placeholder="se21d60@nmit.edu.mn"
          placeholderTextColor="#bbb"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Text style={styles.label}>Нууц үг</Text>
        <View style={styles.passwordRow}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Нууц үг"
            placeholderTextColor="#bbb"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeButton}
          >
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={22}
              color="#555"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Login Button */}
      <TouchableOpacity
        style={[
          styles.button,
          !(email && password) && styles.buttonDisabled,
        ]}
        onPress={handleLogin}
        disabled={!(email && password)}
      >
        <Text style={styles.buttonText}>Нэвтрэх</Text>
      </TouchableOpacity>

      {/* Forgot Password */}
      <TouchableOpacity style={styles.forgotContainer}>
        <Text style={styles.forgotText}>Нууц үгээ мартсан?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: '#FDFDFD',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    borderRadius: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    color: '#FF6B81',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
    marginLeft: 4,
  },
  input: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeButton: {
    padding: 8,
    marginLeft: 4,
  },
  button: {
    backgroundColor: '#FF6B81',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 4,
    shadowColor: '#FF6B81',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  buttonDisabled: {
    backgroundColor: '#f0f0f0',
    shadowOpacity: 0,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  forgotContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  forgotText: {
    fontSize: 15,
    color: '#FF6B81',
    textDecorationLine: 'underline',
  },
});
