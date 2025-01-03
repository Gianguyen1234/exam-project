import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const products = [
  { id: '1', name: 'Modern Sofa', price: '$599', image: 'https://images.pexels.com/photos/133919/pexels-photo-133919.jpeg' },
  { id: '2', name: 'Wooden Dining Table', price: '$299', image: 'https://images.pexels.com/photos/2092058/pexels-photo-2092058.jpeg' },
  { id: '3', name: 'Lamp Light', price: '$49', image: 'https://images.pexels.com/photos/5490911/pexels-photo-5490911.jpeg' },
  { id: '4', name: 'Coffee Table', price: '$159', image: 'https://images.pexels.com/photos/27548805/pexels-photo-27548805/free-photo-of-a-cup-of-coffee-and-a-cookie-on-a-wooden-table.jpeg' },
  { id: '5', name: 'Chair', price: '$89', image: 'https://images.pexels.com/photos/2082090/pexels-photo-2082090.jpeg' },
  { id: '6', name: 'Bookshelf', price: '$149', image: 'https://images.pexels.com/photos/2177482/pexels-photo-2177482.jpeg' },
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
    const listener = Dimensions.addEventListener('change', updateLayout);

    return () => {
      listener.remove();
    };
  }, []);

  const renderItem = ({ item }) => (
    <View style={[styles.itemContainer, isMobile ? styles.mobileItemContainer : styles.webItemContainer]}>
      <Image source={{ uri: item.image }} style={[styles.itemImage, isMobile ? styles.mobileItemImage : styles.webItemImage]} />
      <Text style={styles.itemName}>{item.name}</Text>
      <View style={styles.itemPriceContainer}>
        <Ionicons name="star" size={16} color="#FFD700" />
        <Text style={styles.itemPrice}>{item.price}</Text>
      </View>
      <TouchableOpacity style={styles.buyNowButton} onPress={() => router.push('/CartScreen')}>
        <Text style={styles.buyNowButtonText}>Buy Now</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>TRANSFORM YOUR SPACE</Text>
        <View style={styles.authButtons}>
          <TouchableOpacity style={styles.chatButton} onPress={() => router.push('/Chat')}>
            <Ionicons name="chatbubble-ellipses-outline" size={20} color="#fff" style={styles.buttonIcon} />
            <Text style={styles.authButtonText}>Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.aboutButton} onPress={() => router.push('/AboutShop')}>
            <Ionicons name="information-circle-outline" size={20} color="#fff" style={styles.buttonIcon} />
            <Text style={styles.authButtonText}>About Shop</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.sectionTitle}>🌟 Popular Products</Text>
      <FlatList
        key={isMobile ? 'mobile' : 'web'}
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={isMobile ? 1 : 3}
        horizontal={isMobile}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        contentContainerStyle={isMobile ? styles.mobileContentContainer : styles.webContentContainer}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins',  // Modern font
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  authButtons: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#17a2b8',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  aboutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffc107',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  authButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  buttonIcon: {
    marginRight: 5,
  },
  sectionTitle: {
    fontSize: 24, // Increased font size for better visibility
    fontWeight: 'bold',
    color: '#333',
    marginTop:25,
    marginVertical: 10,  // Added vertical margin for more space around the title
    textAlign: 'center',
    letterSpacing: 1.5,  // Add letter spacing for readability
    backgroundImage: 'linear-gradient(45deg, #ff9a8b, #ffc3a0)',  // Gradient effect
    backgroundClip: 'text',  // Clip the background to text for gradient
    WebkitBackgroundClip: 'text',  // For Safari browsers
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',  // Subtle text shadow for depth
  },
  
  itemContainer: {
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    padding: 10,
    elevation: 5,  // Slight shadow to give depth
  },
  mobileItemContainer: {
    width: Dimensions.get('window').width * 0.8,
    transition: 'transform 0.3s ease',
  },
  webItemContainer: {
    width: Dimensions.get('window').width / 3 - 30,
    transition: 'transform 0.3s ease',
  },
  itemImage: {
    width: '100%',
    borderRadius: 12,
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
    marginVertical: 5,
    textAlign: 'center',
    color: '#333',
    transition: 'color 0.3s ease',
  },
  itemPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: 14,
    color: '#007BFF',
    marginLeft: 5,
  },
  buyNowButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
    transition: 'transform 0.3s ease',
  },
  buyNowButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
