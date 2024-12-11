import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';  
import PopularProducts from './PopularProducts';  
import { Provider } from 'react-redux'; 
import store from './redux/store';

export default function StartScreen() {
  const router = useRouter();

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Text style={styles.title}>Renovate Your Interior</Text>
        
        {/* Buttons with modern UI */}
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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 25,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
