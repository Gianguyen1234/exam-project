import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import Toast from 'react-native-toast-message';

export default function EditCategory() {
    const { id } = useLocalSearchParams();
   
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (!token) {
          console.error('Authentication token not found.');
          return;
        }

        const response = await axios.get(`https://furniture-api-i01f.onrender.com/api/categories/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setName(response.data.name);
        setDescription(response.data.description);
      } catch (error) {
        console.error('Error fetching category:', error);
      }
    };

    fetchCategory();
  }, [id]);

  const handleEditCategory = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        Toast.show({
          type: 'error',
          text1: 'Authentication Error',
          text2: 'Please log in to edit a category.',
        });
        return;
      }

      await axios.put(
        `https://furniture-api-i01f.onrender.com/api/categories/${id}`,
        { name, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Toast.show({
        type: 'success',
        text1: 'Category Updated',
        text2: `Category "${name}" has been updated successfully.`,
      });
    } catch (error) {
      console.error('Error updating category:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to update category. Please try again.',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Category</Text>
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
      <Button title="Save Changes" onPress={handleEditCategory} />
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
