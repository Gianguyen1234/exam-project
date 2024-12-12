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
  { id: '2', name: 'Wooden Dining Table', price: '$299', image: 'https://images.pexels.com/photos/2092058/pexels-photo-2092058.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { id: '3', name: 'Lamp Light', price: '$49', image: 'https://images.pexels.com/photos/5490911/pexels-photo-5490911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { id: '4', name: 'Coffee Table', price: '$159', image: 'https://images.pexels.com/photos/27548805/pexels-photo-27548805/free-photo-of-a-cup-of-coffee-and-a-cookie-on-a-wooden-table.jpeg' },
  { id: '5', name: 'Chair', price: '$89', image: 'https://images.pexels.com/photos/2082090/pexels-photo-2082090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { id: '6', name: 'Bookshelf', price: '$149', image: 'https://images.pexels.com/photos/2177482/pexels-photo-2177482.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
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
    const listener = Dimensions.addEventListener('change', updateLayout); // addEventListener returns a listener

    // Cleanup function to remove listener
    return () => {
      listener.remove(); // Correct way to remove the listener
    };
  }, []);

  const renderItem = ({ item }) => (
    <View style={[styles.itemContainer, isMobile ? styles.mobileItemContainer : styles.webItemContainer]}>
      <Image source={{ uri: item.image }} style={[styles.itemImage, isMobile ? styles.mobileItemImage : styles.webItemImage]} />
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>{item.price}</Text>
      <TouchableOpacity style={styles.buyNowButton} onPress={() => router.push(`/CartScreen`)}>
        <Text style={styles.buyNowButtonText}>Buy Now</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Popular Products</Text>
      <FlatList
        key={isMobile ? 'mobile' : 'web'}
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={isMobile ? 1 : 3}
        horizontal={isMobile} // Enable horizontal scrolling for mobile
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        contentContainerStyle={isMobile ? styles.mobileContentContainer : styles.webContentContainer}
        snapToAlignment="center"
        snapToInterval={Dimensions.get('window').width * 0.8 + 10} // Snap each item into view
        decelerationRate="fast" // Smooth snapping
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
    padding: 10,
  },
  mobileItemContainer: {
    width: Dimensions.get('window').width * 0.8, // 80% of screen width for mobile
  },
  webItemContainer: {
    width: Dimensions.get('window').width / 3 - 30, // Divide screen into 3 columns with spacing
  },
  itemImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  mobileItemImage: {
    height: 200,
  },
  webItemImage: {
    height: 150,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 5,
    textAlign: 'center',
  },
  itemPrice: {
    fontSize: 14,
    color: '#007BFF',
    marginBottom: 10,
  },
  mobileContentContainer: {
    paddingLeft: 10,
  },
  webContentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
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
