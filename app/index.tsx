import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import PopularProducts from './PopularProducts';
import { Provider } from 'react-redux';
import store from './redux/store';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo

export default function StartScreen() {
  const router = useRouter();
  const { width } = Dimensions.get('window');

  return (
    <Provider store={store}>
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
          <TouchableOpacity
            style={[styles.authButton, styles.loginButton]}
            onPress={() => router.push('/login')}>
            <Ionicons name="log-in-outline" size={20} color="#fff" style={styles.icon} />
            <Text style={styles.authButtonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.authButton, styles.registerButton]}
            onPress={() => router.push('/register')}>
            <Ionicons name="person-add-outline" size={20} color="#fff" style={styles.icon} />
            <Text style={styles.authButtonText}>Register</Text>
          </TouchableOpacity>
        </View>

        <PopularProducts />
      </View>
    </Provider>
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
    marginLeft: 8, // Adds spacing between the icon and text
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
  icon: {
    marginRight: 8, // Space between icon and text
  },
  authButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  authButtonHover: {
    transform: 'scale(1.05)', // Hover effect for zoom
  },
  authButtonActive: {
    backgroundColor: '#16a085', // Darker shade of green for active state
  },
});
