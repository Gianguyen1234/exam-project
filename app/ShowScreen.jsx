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
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    marginHorizontal: 5,
  },
  categoryText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
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
    fontSize: 16,
    color: '#007BFF',
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  footerButton: {
    alignItems: 'center',
    flex: 1,
  },
  footerText: {
    color: '#007BFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
