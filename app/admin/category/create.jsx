import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

export default function CreateCategory() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleCreateCategory = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        Toast.show({
          type: 'error',
          text1: 'Authentication Error',
          text2: 'Please log in to create a category.',
        });
        return;
      }

      const response = await axios.post(
        'https://furniture-api-i01f.onrender.com/api/categories',
        { name, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Toast.show({
        type: 'success',
        text1: 'Category Created',
        text2: `Category "${response.data.name}" has been created successfully.`,
      });

      setName('');
      setDescription('');
    } catch (error) {
      console.error('Error creating category:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to create category. Please try again.',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Category</Text>
      <TextInput
        style={styles.input}
        placeholder="Category Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Category Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Button title="Create Category" onPress={handleCreateCategory} />
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
