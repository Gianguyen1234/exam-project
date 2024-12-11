import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ShowScreen = () => {
  const discoveryProducts = ['Sofas', 'Chairs', 'Tables', 'Kitchen'];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Discovery Products</Text>
      <View style={styles.discoveryContainer}>
        {discoveryProducts.map((category) => (
          <TouchableOpacity key={category} style={styles.discoveryItem}>
            <Text style={styles.discoveryText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  discoveryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  discoveryItem: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  discoveryText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ShowScreen;
