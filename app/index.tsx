import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
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
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#2C3E50',
    textAlign: 'center',
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
  },
  buttonHover: {
    backgroundColor: '#2980B9',
  },
});
