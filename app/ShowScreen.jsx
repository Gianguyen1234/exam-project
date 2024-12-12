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

  const handleBuyNow = (productName) => {
    alert(`${productName} has been purchased!`);
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
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>20% OFF</Text>
            </View>
            <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>
            <TouchableOpacity style={styles.buyButton} onPress={() => handleBuyNow(item.name)}>
              <Text style={styles.buyButtonText}>Buy Now</Text>
            </TouchableOpacity>
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
    backgroundColor: '#37474F',
    borderRadius: 12,
    marginHorizontal: 5,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  categoryText: {
    color: '#ECEFF1',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
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
  discountBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#FF5722',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    zIndex: 1,
  },
  discountText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
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
    fontSize: 18,
    fontWeight: '600',
    color: '#FF5722',
    textAlign: 'center',
    marginTop: 5,
  },
  buyButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 10,
  },
  buyButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 12,
    backgroundColor: '#F8F8F8',
    borderTopWidth: 0.5,
    borderTopColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  footerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#ffffff',
    borderRadius: 30,
    elevation: 4,
    shadowColor: '#ddd',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  footerText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'capitalize',
    letterSpacing: 1,
  },
});
