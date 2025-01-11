import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

export default function CreateUserPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '', // Added confirmPassword field
  });

  const handleCreateUser = async () => {
    if (form.password !== form.confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Passwords do not match. Please try again.',
      });
      return;
    }

    try {
      const token = await AsyncStorage.getItem('authToken');

      if (!token) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'You are not authorized to perform this action.',
        });
        return;
      }

      await axios.post(
        'https://furniture-api-i01f.onrender.com/api/auth/register',
        {
          name: form.name,
          email: form.email,
          password: form.password,
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
        text2: 'User created successfully!',
      });

      // Reset the form after successful submission
      setForm({ name: '', email: '', password: '', confirmPassword: '' });
    } catch (error) {
      console.error('Error creating user:', error.response?.data || error.message);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to create user. Please ensure all fields are filled correctly.',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New User</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={form.name}
        onChangeText={(text) => setForm({ ...form, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={form.email}
        keyboardType="email-address"
        onChangeText={(text) => setForm({ ...form, email: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={form.password}
        secureTextEntry
        onChangeText={(text) => setForm({ ...form, password: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={form.confirmPassword}
        secureTextEntry
        onChangeText={(text) => setForm({ ...form, confirmPassword: text })}
      />
      <TouchableOpacity style={styles.button} onPress={handleCreateUser}>
        <Text style={styles.buttonText}>Create User</Text>
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
