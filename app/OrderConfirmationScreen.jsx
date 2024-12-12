import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const orderItems = [
  {
    id: '1',
    name: 'Modern Sofa',
    price: '$599.99',
    quantity: 1,
    image: 'https://images.pexels.com/photos/133919/pexels-photo-133919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '2',
    name: 'Wooden Dining Table',
    price: '$299.99',
    quantity: 2,
    image: 'https://images.pexels.com/photos/2092058/pexels-photo-2092058.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];

export default function OrderConfirmationScreen() {
  const router = useRouter();

  const handleReturnHome = () => {
    router.push('/'); // Navigate back to the home screen or catalog
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Order Confirmed!</Text>
      <Image
        source={{
          uri: 'https://images.pexels.com/photos/459653/pexels-photo-459653.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        }}
        style={styles.confirmationImage}
      />
      <Text style={styles.message}>
        Thank you for your purchase. Your order has been placed successfully!
      </Text>

      <View style={styles.orderSummaryContainer}>
        <Text style={styles.summaryText}>Order Summary</Text>

        {/* Order Items */}
        <View style={styles.orderItemsContainer}>
          {orderItems.map(item => (
            <View key={item.id} style={styles.orderItem}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>{item.price} x {item.quantity}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Payment Method */}
        <View style={styles.paymentContainer}>
          <Text style={styles.paymentTitle}>Payment Method:</Text>
          <Text style={styles.paymentDetails}>Visa **** 1234</Text>
        </View>

        {/* Shipping Information */}
        <View style={styles.shippingContainer}>
          <Text style={styles.shippingTitle}>Shipping Information:</Text>
          <Text style={styles.shippingDetails}>John Doe, 123 Main St, New York, NY</Text>
        </View>

        {/* Total Calculation */}
        <View style={styles.totalContainer}>
          <Text style={styles.orderDetails}>Items Total: $999.99</Text>
          <Text style={styles.orderDetails}>Shipping: $20.00</Text>
          <Text style={styles.totalText}>Total: $1019.99</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.returnButton} onPress={handleReturnHome}>
        <Text style={styles.returnButtonText}>Return to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 2,
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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  orderItemsContainer: {
    width: '100%',
    marginBottom: 20,
  },
  orderItem: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  itemPrice: {
    fontSize: 14,
    color: '#555',
  },
  paymentContainer: {
    width: '100%',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  paymentDetails: {
    fontSize: 14,
    color: '#555',
  },
  shippingContainer: {
    width: '100%',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  shippingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  shippingDetails: {
    fontSize: 14,
    color: '#555',
  },
  totalContainer: {
    width: '100%',
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  orderDetails: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginTop: 10,
  },
  returnButton: {
    backgroundColor: '#3498DB',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginBottom: 50,
  },
  returnButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});
