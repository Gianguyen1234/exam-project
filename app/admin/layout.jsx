import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Dimensions, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, Slot } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function AdminLayout() {
  const [dropdownStates, setDropdownStates] = useState({}); // Manage all dropdown states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const checkAuthToken = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
          setIsAuthenticated(true);
        } else {
          router.replace('/login');
        }
      } catch (error) {
        console.error('Error checking auth token:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthToken();

    const updateLayout = () => {
      const width = Dimensions.get('window').width;
      setIsMobile(width < 768);
    };

    updateLayout();
    const dimensionListener = Dimensions.addEventListener('change', updateLayout);

    return () => {
      if (dimensionListener) {
        dimensionListener.remove();
      }
    };
  }, []);

  const navigateTo = (path) => {
    router.push(path);
  };

  // Reusable toggle function
  const toggleItemDropdown = (item) => {
    setDropdownStates((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      setIsAuthenticated(false);
      router.replace('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      setIsLogoutModalVisible(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#1abc9c" />
      </View>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Logout Modal */}
      <Modal
        visible={isLogoutModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsLogoutModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Are you sure you want to logout?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setIsLogoutModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleLogout}
              >
                <Text style={styles.modalButtonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Toggle Button for Sidebar on Mobile */}
      {isMobile && (
        <TouchableOpacity style={styles.sidebarToggle} onPress={() => setIsSidebarOpen(!isSidebarOpen)}>
          <FontAwesome name={isSidebarOpen ? 'times' : 'bars'} size={24} color="#fff" />
        </TouchableOpacity>
      )}

      {/* Sidebar */}
      {(isSidebarOpen || !isMobile) && (
        <View style={[styles.sidebar, isMobile && styles.sidebarMobile]}>
          <Text style={styles.sidebarTitle}>Admin Panel</Text>

          {/* Product Dropdown */}
          <View style={styles.dropdownContainer}>
            <TouchableOpacity
              style={styles.sidebarItem}
              onPress={() => toggleItemDropdown('Product')}
            >
              <Text style={styles.sidebarText}>Product</Text>
            </TouchableOpacity>
            {dropdownStates['Product'] && (
              <View style={styles.dropdownMenu}>
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => navigateTo('/admin/product/create')}
                >
                  <Text style={styles.dropdownText}>Create Product</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => navigateTo('/admin/product/list')}
                >
                  <Text style={styles.dropdownText}>Product List</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Category Dropdown */}
          <View style={styles.dropdownContainer}>
            <TouchableOpacity
              style={styles.sidebarItem}
              onPress={() => toggleItemDropdown('Category')}
            >
              <Text style={styles.sidebarText}>Category</Text>
            </TouchableOpacity>
            {dropdownStates['Category'] && (
              <View style={styles.dropdownMenu}>
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => navigateTo('/admin/category/create')}
                >
                  <Text style={styles.dropdownText}>Create Category</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => navigateTo('/admin/category/list')}
                >
                  <Text style={styles.dropdownText}>Category List</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Logout */}
          <TouchableOpacity
            style={styles.sidebarItem}
            onPress={() => setIsLogoutModalVisible(true)}
          >
            <Text style={styles.sidebarText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Main Content */}
      <View style={styles.mainContent}>
        <Slot />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: '30%',
    backgroundColor: '#2c3e50',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  sidebarMobile: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '60%',
    height: '100%',
    zIndex: 1,
    elevation: 5,
    backgroundColor: '#2c3e50',
  },
  sidebarTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 10,
    textAlign: 'center',
  },
  sidebarItem: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#34495e',
    borderRadius: 5,
  },
  sidebarText: {
    color: '#ecf0f1',
    fontSize: 16,
    fontWeight: '600',
  },
  dropdownContainer: {
    marginBottom: 10,
  },
  dropdownMenu: {
    marginTop: 5,
    marginLeft: 10,
  },
  dropdownItem: {
    padding: 10,
    backgroundColor: '#1abc9c',
    marginBottom: 5,
    borderRadius: 5,
  },
  dropdownText: {
    color: '#ecf0f1',
    fontSize: 14,
  },
  mainContent: {
    flex: 1,
    padding: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sidebarToggle: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#1abc9c',
    padding: 10,
    borderRadius: 5,
    zIndex: 2, // Ensures the button is above the sidebar
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#e74c3c',
    marginRight: 10,
  },
  confirmButton: {
    backgroundColor: '#1abc9c',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
