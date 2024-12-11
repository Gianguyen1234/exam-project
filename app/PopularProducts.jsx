import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Button } from 'react-native';

const products = [
  { id: '1', name: 'Modern Sofa', price: '$599', image: 'https://via.placeholder.com/150' },
  { id: '2', name: 'Wooden Dining Table', price: '$299', image: 'https://via.placeholder.com/150' },
  { id: '3', name: 'Lamp Light', price: '$49', image: 'https://via.placeholder.com/150' },
  { id: '4', name: 'Coffee Table', price: '$159', image: 'https://via.placeholder.com/150' },
  { id: '5', name: 'Chair', price: '$89', image: 'https://via.placeholder.com/150' },
  { id: '6', name: 'Bookshelf', price: '$149', image: 'https://via.placeholder.com/150' },
];

export default function PopularProducts() {
  const [numColumns, setNumColumns] = useState(2); // Default to 2 columns

  // Toggle between 2 or 3 columns when the button is pressed
  const toggleColumns = () => {
    setNumColumns(prevColumns => (prevColumns === 2 ? 3 : 2));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Popular Products</Text>
      
      {/* Button to toggle between 2 and 3 columns */}
      <Button title={`Switch to ${numColumns === 2 ? '3' : '2'} Columns`} onPress={toggleColumns} />
      
      {/* FlatList to render the products in a dynamic grid layout */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}  // Use the dynamic number of columns
        key={numColumns}  // Add key prop to force re-render when numColumns changes
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            {/* Product image */}
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>{item.price}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Align content to top for better spacing
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 30,  // Increased font size for better visibility
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',  // Darker color for the title
    textAlign: 'center', // Center align the title
  },
  itemContainer: {
    flex: 1, // Make item container flexible to fit in the grid
    margin: 10, // Space between items
    backgroundColor: '#fff',
    borderRadius: 12, // Rounded corners for a modern look
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,  // Subtle shadow for depth
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,  // Android shadow
    borderWidth: 1, // Add a border for item separation
    borderColor: '#ddd',  // Light border for better item distinction
  },
  itemImage: {
    width: 150,  // Set the width of the image
    height: 150, // Set the height of the image
    borderRadius: 10, // Rounded corners for the image
    marginBottom: 10, // Space between image and text
  },
  itemName: {
    fontSize: 18, // Larger font for better readability
    fontWeight: 'bold',
    color: '#333',  // Dark color for better contrast
    marginBottom: 5, // Small space between name and price
  },
  itemPrice: {
    fontSize: 16,  // Slightly larger font size for price
    color: '#007BFF',  // Blue color for price to make it stand out
  },
});
