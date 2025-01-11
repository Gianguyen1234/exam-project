import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

export default function EditUserPage({ route, navigation }) {
  const { userId } = route.params; // User ID passed from navigation
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const fetchUserDetails = async () => {
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

      const response = await axios.get(
        `https://furniture-api-i01f.onrender.com/api/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(response.data.user); // Assuming response contains a `user` field
    } catch (error) {
      console.error('Error fetching user details:', error.response?.data || error.message);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to fetch user details. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async () => {
    if (!user.name || !user.email) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Name and email are required fields.',
      });
      return;
    }

    setUpdating(true);

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

      await axios.put(
        `https://furniture-api-i01f.onrender.com/api/users/${userId}`,
        {
          name: user.name,
          email: user.email,
          role: user.role,
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
        text2: 'User updated successfully!',
      });

      // Optionally, navigate back to the user list
      navigation.goBack();
    } catch (error) {
      console.error('Error updating user:', error.response?.data || error.message);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to update user. Please try again.',
      });
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={styles.loadingText}>Loading user details...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Unable to load user details. Please try again.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit User</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={user.name}
        onChangeText={(text) => setUser({ ...user, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={user.email}
        keyboardType="email-address"
        onChangeText={(text) => setUser({ ...user, email: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Role"
        value={user.role}
        editable={false} // Disable editing the role here for security
      />
      <TouchableOpacity style={styles.button} onPress={handleUpdateUser} disabled={updating}>
        <Text style={styles.buttonText}>{updating ? 'Updating...' : 'Update User'}</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#ff0000',
  },
});
