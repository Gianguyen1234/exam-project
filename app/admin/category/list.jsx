import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Button,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { useRouter } from 'expo-router';

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const router = useRouter();

  useEffect(() => {
    axios
      .get('https://furniture-api-i01f.onrender.com/api/categories')
      .then((response) => setCategories(response.data))
      .catch((error) => {
        console.error('Error fetching categories:', error);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to load categories.',
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDeleteCategory = async (categoryId) => {
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

      await axios.delete(
        `https://furniture-api-i01f.onrender.com/api/categories/${categoryId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Category deleted successfully!',
      });

      // Remove the category from the list
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category._id !== categoryId)
      );

      setShowModal(false); // Close the modal
    } catch (error) {
      console.error('Error deleting category:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to delete category.',
      });
    }
  };

  const handleEditCategory = (categoryId) => {
    router.push(`/admin/category/edit?id=${categoryId}`);
  };

  const openDeleteModal = (categoryId) => {
    setCategoryToDelete(categoryId);
    setShowModal(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Category List</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#3498db" />
      ) : categories.length === 0 ? (
        <Text style={styles.noCategories}>No categories available.</Text>
      ) : (
        <FlatList
  data={categories}
  keyExtractor={(item) => item._id}
  renderItem={({ item }) => (
    <View style={styles.categoryContainer}>
      <View style={styles.categoryDetails}>
        <Text style={styles.categoryName}>{item.name}</Text>
        <Text style={styles.categoryDescription}>{item.description || "No description available."}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={() => handleEditCategory(item._id)}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={() => openDeleteModal(item._id)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  )}
/>

      )}

      {/* Delete Confirmation Modal */}
      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirm Delete</Text>
            <Text>Are you sure you want to delete this category?</Text>
            <View style={styles.modalActions}>
              <Button title="Cancel" onPress={() => setShowModal(false)} />
              <Button
                title="Delete"
                onPress={() => handleDeleteCategory(categoryToDelete)}
                color="red"
              />
            </View>
          </View>
        </View>
      </Modal>

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
  noCategories: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 20,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
    elevation: 2,
  },
  categoryName: {
    fontSize: 18,
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
  editButton: {
    backgroundColor: '#3498db',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  categoryDetails: {
    flex: 1,
  },
  categoryDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 5,
  },
});
