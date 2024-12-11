import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const products = [
  {
    id: '1',
    name: 'Modern Sofa',
    price: '$599',
    image: 'https://images.pexels.com/photos/133919/pexels-photo-133919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  { id: '2', name: 'Wooden Dining Table', price: '$299', image: 'https://via.placeholder.com/150' },
  { id: '3', name: 'Lamp Light', price: '$49', image: 'https://via.placeholder.com/150' },
  { id: '4', name: 'Coffee Table', price: '$159', image: 'https://via.placeholder.com/150' },
  { id: '5', name: 'Chair', price: '$89', image: 'https://via.placeholder.com/150' },
  { id: '6', name: 'Bookshelf', price: '$149', image: 'https://via.placeholder.com/150' },
];

export default function PopularProducts() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const updateLayout = () => {
      const screenWidth = Dimensions.get('window').width;
      setIsMobile(screenWidth <= 600);
    };

    updateLayout();
    Dimensions.addEventListener('change', updateLayout);

    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Popular Products</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        horizontal={isMobile} // Enable horizontal scrolling for mobile
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={[styles.itemContainer, isMobile ? styles.mobileItemContainer : null]}>
            <Image source={{ uri: item.image }} style={[styles.itemImage, isMobile ? styles.mobileItemImage : null]} />
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>{item.price}</Text>

            {/* Buy Now Button */}
            <TouchableOpacity
              style={styles.buyNowButton}
              onPress={() => router.push(`/CartScreen`)} // Navigate to CartScreen with product id
            >
              <Text style={styles.buyNowButtonText}>Buy Now</Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={isMobile && styles.mobileContentContainer} // Adjust padding for mobile layout
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  itemContainer: {
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  mobileItemContainer: {
    width: Dimensions.get('window').width * 0.8, // 80% of screen width
    marginRight: 15,
  },
  itemImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  mobileItemImage: {
    height: 200, // Taller image for mobile
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 5,
  },
  itemPrice: {
    fontSize: 14,
    color: '#007BFF',
    marginBottom: 10,
  },
  mobileContentContainer: {
    paddingLeft: 10,
  },
  buyNowButton: {
    backgroundColor: '#007BFF',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 25,
    marginTop: 10,
  },
  buyNowButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
