import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Importing icon library

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
    const listener = Dimensions.addEventListener('change', updateLayout);

    return () => {
      listener.remove();
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
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>RENOVATE YOUR INTERIOR</Text>
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

      <Text style={styles.sectionTitle}>Popular Products</Text>
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    margin: 10,
    textAlign: 'center',
  },
  itemContainer: {
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    padding: 10,
  },
  mobileItemContainer: {
    width: Dimensions.get('window').width * 0.8,
  },
  webItemContainer: {
    width: Dimensions.get('window').width / 3 - 30,
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
  },
  itemPrice: {
    fontSize: 14,
    color: '#007BFF',
    marginBottom: 10,
  },
  buyNowButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 20,
  },
  buyNowButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
