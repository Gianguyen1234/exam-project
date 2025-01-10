import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter} from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // Extracts the 'id' parameter from the URL
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    brand: '',
    stock: '',
    images: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the existing product details
    axios
      .get(`https://furniture-api-i01f.onrender.com/api/products/${id}`)
      .then((response) => {
        const product = response.data;
        setFormData({
          name: product.name,
          description: product.description,
          price: product.price.toString(),
          category: product.category,
          brand: product.brand || '',
          stock: product.stock.toString(),
          images: product.images.join(', '),
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to fetch product details.',
        });
        setLoading(false);
      });
  }, [id]);

  const handleUpdate = async () => {
    try {
      // Retrieve the authentication token
      const token = await AsyncStorage.getItem('authToken');

      if (!token) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'You are not authorized to perform this action.',
        });
        return;
      }

      // Make the PUT request with the token in the headers
      await axios.put(
        `https://furniture-api-i01f.onrender.com/api/products/${id}`,
        {
          ...formData,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock, 10),
          images: formData.images.split(',').map((url) => url.trim()),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Product updated successfully!',
      });
      router.push('/admin/product/list'); // Navigate back to product list
    } catch (error) {
      console.error('Error updating product:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to update product.',
      });
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Product</Text>
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={formData.name}
        onChangeText={(text) => setFormData({ ...formData, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={formData.description}
        onChangeText={(text) => setFormData({ ...formData, description: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={formData.price}
        keyboardType="numeric"
        onChangeText={(text) => setFormData({ ...formData, price: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={formData.category}
        onChangeText={(text) => setFormData({ ...formData, category: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Brand"
        value={formData.brand}
        onChangeText={(text) => setFormData({ ...formData, brand: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Stock Quantity"
        value={formData.stock}
        keyboardType="numeric"
        onChangeText={(text) => setFormData({ ...formData, stock: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Image URLs (comma-separated)"
        value={formData.images}
        onChangeText={(text) => setFormData({ ...formData, images: text })}
      />
      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update Product</Text>
      </TouchableOpacity>
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
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
  },
});
