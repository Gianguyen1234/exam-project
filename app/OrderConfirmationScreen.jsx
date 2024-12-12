import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function OrderConfirmationScreen() {
  const router = useRouter();

  const handleReturnHome = () => {
    router.push('/'); // Navigate back to the home screen or catalog
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Confirmed!</Text>
      <Image
        source={{ uri: 'https://images.pexels.com/photos/3800489/pexels-photo-3800489.jpeg' }}
        style={styles.confirmationImage}
      />
      <Text style={styles.message}>Thank you for your purchase. Your order has been placed successfully!</Text>

      <View style={styles.orderSummaryContainer}>
        <Text style={styles.summaryText}>Order Summary:</Text>
        <Text style={styles.orderDetails}>Items Total: $999.99</Text>
        <Text style={styles.orderDetails}>Shipping: $20.00</Text>
        <Text style={styles.orderDetails}>Total: $1019.99</Text>
      </View>

      <TouchableOpacity style={styles.returnButton} onPress={handleReturnHome}>
        <Text style={styles.returnButtonText}>Return to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 40,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 20,
  },
  confirmationImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 2,
  },
  message: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  orderSummaryContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
    width: '100%',
    alignItems: 'center',
  },
  summaryText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  orderDetails: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  returnButton: {
    backgroundColor: '#3498DB',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 20,
  },
  returnButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
