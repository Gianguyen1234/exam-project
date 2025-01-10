import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, Slot } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function AdminLayout() {
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // Detect mobile layout
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
  
    // Detect screen size
    const updateLayout = () => {
      const width = Dimensions.get('window').width;
      setIsMobile(width < 768); // Mobile threshold
    };
  
    // Initial check and listener for screen size changes
    updateLayout();
    const dimensionListener = Dimensions.addEventListener('change', updateLayout);
  
    // Cleanup event listener
    return () => {
      if (dimensionListener) {
        dimensionListener.remove(); // Updated to remove the listener properly
      }
    };
  }, []);
  

  const navigateTo = (path) => {
    router.push(path);
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      setIsAuthenticated(false);
      router.replace('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const toggleProductDropdown = () => {
    setIsProductDropdownOpen(!isProductDropdownOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#1abc9c" />
      </View>
    );
  }

  if (!isAuthenticated) {
    return null; // Redirecting, so no need to render layout
  }

  return (
    <View style={styles.container}>
      {/* Toggle Button for Sidebar on Mobile */}
      {isMobile && (
        <TouchableOpacity style={styles.sidebarToggle} onPress={toggleSidebar}>
          <FontAwesome 
            name={isSidebarOpen ? 'times' : 'bars'} 
            size={24} 
            color="#fff" 
          />
        </TouchableOpacity>
      )}

      {/* Sidebar */}
      {(isSidebarOpen || !isMobile) && (
        <View style={[styles.sidebar, isMobile && styles.sidebarMobile]}>
          <Text style={styles.sidebarTitle}>Admin Panel</Text>

          {/* Product Dropdown */}
          <View style={styles.dropdownContainer}>
            <TouchableOpacity style={styles.sidebarItem} onPress={toggleProductDropdown}>
              <Text style={styles.sidebarText}>Product</Text>
            </TouchableOpacity>
            {isProductDropdownOpen && (
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

          {/* Logout */}
          <TouchableOpacity style={styles.sidebarItem} onPress={handleLogout}>
            <Text style={styles.sidebarText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Main Content */}
      <View style={styles.mainContent}>
        <Slot /> {/* This is where the child pages will be rendered */}
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
});
