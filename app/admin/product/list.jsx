import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  Button,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

export default function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const productsPerPage = 10; // Number of products per page
  const router = useRouter();

  useEffect(() => {
    axios
      .get('https://furniture-api-i01f.onrender.com/api/products')
      .then((response) => setProducts(response.data))
      .catch((error) => {
        console.error('Error fetching products:', error);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to load products.',
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDeleteProduct = async (productId) => {
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
        `https://furniture-api-i01f.onrender.com/api/products/${productId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Product deleted successfully!',
      });

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );

      setShowModal(false); // Close the modal
    } catch (error) {
      console.error('Error deleting product:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to delete product.',
      });
    }
  };

  const handleEditProduct = (productId) => {
    router.push(`/admin/product/edit?id=${productId}`); // Navigate to edit page with product ID
  };

  const openDeleteModal = (productId) => {
    setProductToDelete(productId);
    setShowModal(true);
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product List</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#3498db" />
      ) : products.length === 0 ? (
        <Text style={styles.noProducts}>No products available.</Text>
      ) : (
        <>
          <FlatList
            data={currentProducts} // Display only the products for the current page
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.productContainer}>
                <Image
                  source={{
                    uri: item.images?.[0] || 'https://via.placeholder.com/150',
                  }}
                  style={styles.productImage}
                />
                <View style={styles.productDetails}>
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
                  <View style={styles.actions}>
                    <TouchableOpacity
                      style={[styles.button, styles.editButton]}
                      onPress={() => handleEditProduct(item._id)}
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
              </View>
            )}
          />
          {/* Pagination Controls */}
          <View style={styles.pagination}>
            <TouchableOpacity
              style={[styles.pageButton, currentPage === 1 && styles.disabledButton]}
              onPress={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <Text style={styles.pageButtonText}>Previous</Text>
            </TouchableOpacity>
            <Text style={styles.pageInfo}>
              Page {currentPage} of {totalPages}
            </Text>
            <TouchableOpacity
              style={[styles.pageButton, currentPage === totalPages && styles.disabledButton]}
              onPress={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <Text style={styles.pageButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* Delete Confirmation Modal */}
      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirm Delete</Text>
            <Text>Are you sure you want to delete this product?</Text>
            <View style={styles.modalActions}>
              <Button title="Cancel" onPress={() => setShowModal(false)} />
              <Button
                title="Delete"
                onPress={() => handleDeleteProduct(productToDelete)}
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
  noProducts: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 20,
  },
  productContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 2,
  },
  productImage: {
    width: 100,
    height: 100,
  },
  productDetails: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    color: '#e74c3c',
    marginBottom: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  adminButton: {
    backgroundColor: '#2ecc71',
    marginBottom: 20,
    paddingVertical: 10,  // Adds some vertical padding for better touch targets on mobile
    paddingHorizontal: 20, // Adds horizontal padding for aesthetics
    alignSelf: 'center',  // Centers the button on the screen
    zIndex: 999,  // Ensures the button is rendered above other elements
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
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  pageButton: {
    padding: 10,
    backgroundColor: '#3498db',
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  pageButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  pageInfo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
});
