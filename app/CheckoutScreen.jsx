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
        <TextInput
          style={styles.input}
          placeholder="Full Name"
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
        />
        <TextInput
          style={styles.input}
          placeholder="City"
        />
        <TextInput
          style={styles.input}
          placeholder="Postal Code"
        />
        <TextInput
          style={styles.input}
          placeholder="Country"
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          keyboardType="phone-pad"
        />
      </View>

      {/* Payment Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Information</Text>
        <TextInput
          style={styles.input}
          placeholder="Card Number"
          keyboardType="numeric"
        />
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
        <Text style={styles.sectionTitle}>Order Summary</Text>
        <Text style={styles.summaryText}>Items Total: $999.99</Text>
        <Text style={styles.summaryText}>Shipping: $20.00</Text>
        <Text style={styles.summaryText}>Total: $1019.99</Text>
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
  summaryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  placeOrderButton: {
    backgroundColor: '#007BFF',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 30,
    alignSelf: 'center',
  },
  placeOrderButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
