import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';  // Import useRouter for programmatic navigation
import PopularProducts from './PopularProducts';  // Import the PopularProducts component

export default function StartScreen() {
  const router = useRouter();  // Initialize the router

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Renovate Your Interior</Text>
      
      {/* Button for navigating to Show Screen */}
      <Button
        title="Go to Catalog"
        onPress={() => router.push('/ShowScreen')}  // Navigate to '/ShowScreen' instead of '/show-screen'
      />

      {/* Display Popular Products directly on the Start Screen */}
      <PopularProducts />
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
