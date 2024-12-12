import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function CheckoutScreen() {
  const router = useRouter();

  const handlePlaceOrder = () => {
    // You can implement your order submission logic here
    router.push('/OrderConfirmationScreen');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Checkout</Text>

      {/* Billing Information Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Billing Information</Text>
        <TextInput style={styles.input} placeholder="Full Name" />
        <TextInput style={styles.input} placeholder="Address" />
        <TextInput style={styles.input} placeholder="City" />
        <TextInput style={styles.input} placeholder="Postal Code" />
        <TextInput style={styles.input} placeholder="Country" />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          keyboardType="phone-pad"
        />
      </View>

      {/* Payment Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Information</Text>
        <TextInput style={styles.input} placeholder="Card Number" keyboardType="numeric" />
        <View style={styles.row}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Expiration Date"
          />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="CVV"
            keyboardType="numeric"
          />
        </View>
      </View>

      {/* Order Summary Section */}
      <View style={styles.section}>
        <Text style={styles.summaryTitle}>Order Summary</Text>
        <View style={styles.orderSummaryContainer}>
          <Text style={styles.summaryText}>Items Total: <Text style={styles.amount}>$999.99</Text></Text>
          <Text style={styles.summaryText}>Shipping: <Text style={styles.amount}>$20.00</Text></Text>
          <Text style={styles.totalText}>Total: <Text style={styles.amountTotal}>$1019.99</Text></Text>
        </View>
      </View>

      {/* Place Order Button */}
      <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
        <Text style={styles.placeOrderButtonText}>Place Order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  orderSummaryContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
    marginBottom: 30,
  },
  summaryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginBottom: 8,
  },
  amount: {
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  totalText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
    marginTop: 12,
  },
  amountTotal: {
    fontWeight: 'bold',
    color: '#E74C3C',  // Highlighting total with a red color
    fontSize: 20,
  },
  placeOrderButton: {
    backgroundColor: '#2980B9', // Dark blue background color
    borderRadius: 25, // Rounded corners for a sleek look
    paddingVertical: 15, // Vertical padding
    paddingHorizontal: 35, // Horizontal padding
    marginBottom: 30, // Space from the element below
    alignSelf: 'center', // Center the button horizontally
    shadowColor: '#2980B9', // Soft shadow for depth matching the background
    shadowOpacity: 0.3, // Slight opacity for shadow
    shadowRadius: 10, // Shadow blur radius for smooth depth effect
    shadowOffset: { width: 0, height: 6 }, // Shadow positioning for realistic depth
    elevation: 8, // For Android shadow effect
  },
  
  placeOrderButtonText: {
    color: '#fff', // White text for contrast against the blue background
    fontSize: 18, // Font size for readability
    fontWeight: '700', // Bold font weight for emphasis
    textAlign: 'center', // Center the text horizontally
  },
  
});
