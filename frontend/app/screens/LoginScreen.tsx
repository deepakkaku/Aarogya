import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
  Image,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'expo-router';
import { colors } from '../../ui/colors';
import { storeSessionToken } from '../../lib/authUtils';

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
      } else {
        await storeSessionToken();
        router.replace('/');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.centerContainer}>
        <View style={styles.card}>
          {/* Left Side: Form */}
          <View style={styles.leftPane}>
            <Image source={require('../../assets/images/aaroagya_logo.svg')} style={styles.logo} resizeMode="contain" />
            <Text style={styles.tagline}>Simplifying OPD for Bharat</Text>
            <View style={{ height: 32 }} />
            <View style={styles.formGroup}>
              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  placeholder="deepak@aarogyadesk.in"
                  value={email}
                  onChangeText={setEmail}
                  style={styles.input}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor="#888"
                />
              </View>
              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.passwordRow}>
                  <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    style={[styles.input, { flex: 1, marginBottom: 0 }]}
                    secureTextEntry={!showPassword}
                    placeholderTextColor="#888"
                  />
                  <Pressable onPress={() => setShowPassword((v) => !v)} style={styles.eyeIcon}>
                    <Text style={{ fontSize: 18, color: '#888' }}>{showPassword ? '🙈' : '👁️'}</Text>
                  </Pressable>
                </View>
              </View>
              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot password</Text>
              </TouchableOpacity>
              {error && <Text style={styles.error}>{error}</Text>}
              <TouchableOpacity onPress={handleLogin} style={styles.loginButton} disabled={loading}>
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.loginButtonText}>Login</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
          {/* Right Side: Doctor Image */}
          <View style={styles.rightPane}>
            <Image
              source={require('../../assets/images/placeholder_doctor.jpg')}
              style={styles.doctorImage}
              resizeMode="cover"
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ededed',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 24,
    overflow: 'hidden',
    width: 900,
    height: 700,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 32,
    elevation: 16,
  },
  leftPane: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  rightPane: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 260,
    height: 80,
    marginBottom: 8,
    tintColor: colors.primary,
  },
  tagline: {
    fontSize: 20,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: 32,
    marginLeft: 4,
  },
  formGroup: {
    width: 340,
    // alignSelf: 'flex-start',
  },
  fieldGroup: {
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '700',
    marginBottom: 4,
    marginLeft: 4,
    textAlign: 'left',
  },
  input: {
    width: 340,
    height: 44,
    borderWidth: 1,
    borderColor: '#b7c3c7',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
    color: '#222',
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 340,
    marginBottom: 8,
  },
  eyeIcon: {
    marginLeft: -36,
    padding: 8,
  },
  forgotPassword: {
    alignSelf: 'flex-start',
    marginBottom: 24,
    marginLeft: 4,
  },
  forgotPasswordText: {
    color: colors.primary,
    fontWeight: '600',
    textDecorationLine: 'underline',
    fontSize: 14,
  },
  error: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'left',
    fontSize: 15,
  },
  loginButton: {
    width: '100%',
    backgroundColor: colors.primary,
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  doctorImage: {
    width: '100%',
    height: '100%',
  },
});
