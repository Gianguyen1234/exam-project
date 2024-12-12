import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';

export default function ShowScreen() {
  const [products, setProducts] = useState([]);
  const [numColumns, setNumColumns] = useState(2); // Default to 2 columns
  const router = useRouter();  // Use the router from expo-router

  useEffect(() => {
    const updateColumns = () => {
      const screenWidth = Dimensions.get('window').width;
      setNumColumns(screenWidth < 768 ? 2 : 3);
    };
  
    // Initial setup
    updateColumns();
  
    // Subscribe to changes
    const subscription = Dimensions.addEventListener('change', updateColumns);
  
    // Cleanup subscription
    return () => subscription?.remove();
  }, []);
  
  // Fetch products from MockAPI
  useEffect(() => {
    axios.get('https://6724468e493fac3cf24db97b.mockapi.io/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleHomeNavigation = () => {
    router.push('/'); // Navigate to the home screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Discovery Products</Text>

      <View style={styles.categoriesContainer}>
        {['Sofas', 'Chairs', 'Tables', 'Kitchen'].map((category, index) => (
          <TouchableOpacity key={index} style={styles.categoryButton}>
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        key={numColumns} // Force re-render when numColumns changes
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>
          </View>
        )}
      />

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={handleHomeNavigation}>
          <Text style={styles.footerText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}  onPress={() => router.push(`/CartScreen`)}>
          <Text style={styles.footerText}>Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  categoryButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: '#37474F', // Modern, sleek, dark slate gray
    borderRadius: 12, 
    marginHorizontal: 5,
    elevation: 6, // Shadow for Android
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, // Subtle but noticeable shadow
    shadowRadius: 5, 
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  
  categoryText: {
    color: '#ECEFF1', // Soft, near-white for contrast
    fontWeight: 'bold', 
    textAlign: 'center',
    fontSize: 16, // Refined text size
  },
    
  productContainer: {
    flex: 1,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
    padding: 10,
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 18, // Slightly larger to catch attention
    fontWeight: '600', // Semi-bold for emphasis
    color: '#FF5722', // Modern, vibrant orange (contrasts nicely with gray tones)
    textAlign: 'center',
    marginTop: 5, // Adds a little space between price and product name
    paddingHorizontal: 8, // Adds some padding for spacing
    textTransform: 'uppercase', // Gives it a clean, modern feel
    letterSpacing: 1.2, // A bit of spacing for clarity and style
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly', // Evenly spaced buttons for symmetry
    paddingVertical: 12, // Increased vertical padding for better spacing
    backgroundColor: '#F8F8F8', // Light neutral background for a modern feel
    borderTopWidth: 0.5, // Subtle divider line
    borderTopColor: '#E0E0E0', // Soft, light border for separation
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 }, // Shadow above for floating effect
    shadowOpacity: 0.1, // Subtle shadow for depth
    shadowRadius: 4,
    elevation: 3, // Android shadow
  },
  
  footerButton: {
    alignItems: 'center',
    justifyContent: 'center', // Center content vertically and horizontally
    paddingVertical: 8, // Add vertical padding for better button touch target
    paddingHorizontal: 15, // Horizontal padding for wider buttons
    backgroundColor: '#ffffff', // White background for buttons
    borderRadius: 30, // Rounded buttons for a modern appearance
    elevation: 4, // Elevation for a subtle shadow effect
    shadowColor: '#ddd', // Shadow for buttons on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  
  footerText: {
    color: '#333', // Darker text color for better readability
    fontSize: 16,
    fontWeight: '600', // Semi-bold text for better legibility
    textTransform: 'capitalize', // Ensure the text is nicely presented
    letterSpacing: 1, // Subtle letter spacing for clean text
  }
  
});
