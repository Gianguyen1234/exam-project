import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

export default function CreateProductPage() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    brand: '',
    stock: '0',
    images: '',
  });

  const handleCreateProduct = async () => {
    try {
      // Retrieve token from AsyncStorage for authentication
      const token = await AsyncStorage.getItem('authToken');

      if (!token) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'You are not authorized to perform this action.',
        });
        return;
      }

      // Send POST request to create product
      const response = await axios.post(
        'https://furniture-api-i01f.onrender.com/api/products',
        {
          ...form,
          price: parseFloat(form.price),
          stock: parseInt(form.stock, 10),
          images: form.images.split(',').map((url) => url.trim()),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token to the request
          },
        }
      );

      // Success message
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Product created successfully!',
      });
      setForm({ name: '', description: '', price: '', category: '', brand: '', stock: '0', images: '' });
    } catch (error) {
      console.error('Error creating product:', error.response?.data || error.message);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to create product. Please ensure all fields are filled correctly.',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Product</Text>
      {/* Form Fields */}
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={form.name}
        onChangeText={(text) => setForm({ ...form, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={form.description}
        onChangeText={(text) => setForm({ ...form, description: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Price (e.g., 99.99)"
        value={form.price}
        keyboardType="numeric"
        onChangeText={(text) => setForm({ ...form, price: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={form.category}
        onChangeText={(text) => setForm({ ...form, category: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Brand (optional)"
        value={form.brand}
        onChangeText={(text) => setForm({ ...form, brand: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Stock Quantity (default: 0)"
        value={form.stock}
        keyboardType="numeric"
        onChangeText={(text) => setForm({ ...form, stock: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Image URLs (comma-separated)"
        value={form.images}
        onChangeText={(text) => setForm({ ...form, images: text })}
      />

      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleCreateProduct}>
        <Text style={styles.buttonText}>Create Product</Text>
      </TouchableOpacity>

      {/* Toast Component */}
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
