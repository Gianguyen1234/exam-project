import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import PopularProducts from './PopularProducts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

export default function StartScreen() {
  const router = useRouter();
  const { width } = Dimensions.get('window');
  const [loggedIn, setLoggedIn] = useState(false);

  // Check auth token on component mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('authToken');
      setLoggedIn(!!token); // Set true if token exists
    };
    checkAuth();
  }, []);

  // Handle logout action
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      setLoggedIn(false);
      Toast.show({
        type: 'success',
        text1: 'Logout Successful',
        text2: 'You have been logged out.',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Logout Failed',
        text2: 'An error occurred while logging out.',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Renovate Your Interior</Text>

      {/* Main Buttons */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/ShowScreen')}>
        <Text style={styles.buttonText}>Go to Catalog</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/DetailScreen')}>
        <Text style={styles.buttonText}>Go to Detail Screen</Text>
      </TouchableOpacity>

      {/* Authentication Buttons */}
      <View style={[styles.authContainer, width < 400 ? styles.authContainerMobile : {}]}>
        {loggedIn ? (
          <TouchableOpacity
            style={[styles.authButton, styles.logoutButton]}
            onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color="#fff" style={styles.icon} />
            <Text style={styles.authButtonText}>Logout</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity
              style={[styles.authButton, styles.loginButton]}
              onPress={() => {
                router.push('/login');
                Toast.show({
                  type: 'info',
                  text1: 'Redirecting to Login',
                  text2: 'Please log in to continue.',
                });
              }}>
              <Ionicons name="log-in-outline" size={20} color="#fff" style={styles.icon} />
              <Text style={styles.authButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.authButton, styles.registerButton]}
              onPress={() => {
                router.push('/register');
                Toast.show({
                  type: 'info',
                  text1: 'Redirecting to Register',
                  text2: 'Create a new account.',
                });
              }}>
              <Ionicons name="person-add-outline" size={20} color="#fff" style={styles.icon} />
              <Text style={styles.authButtonText}>Register</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <PopularProducts />

      {/* Toast Component */}
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontFamily: 'Montserrat',
    fontWeight: '900',
    marginBottom: 40,
    color: '#333',
    textAlign: 'center',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    textShadowColor: '#BDC3C7',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 8,
  },
  button: {
    backgroundColor: '#3498DB',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 5 },
    elevation: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 8,
  },
  authContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '80%',
  },
  authContainerMobile: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  authButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    borderRadius: 25,
    backgroundColor: '#2ecc71',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  loginButton: {
    backgroundColor: '#1abc9c',
  },
  registerButton: {
    backgroundColor: '#9b59b6',
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
  },
  icon: {
    marginRight: 8,
  },
  authButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
});
