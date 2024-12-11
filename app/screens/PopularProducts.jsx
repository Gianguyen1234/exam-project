import React from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";

const popularProducts = [
  {
    id: "1",
    title: "Modern Sofa",
    price: "$499.99",
    image: "https://img.freepik.com/free-psd/task-chair-isolated-transparent-background_191095-13719.jpg?t=st=1733878787~exp=1733882387~hmac=c8abc8395588f9503d15e801bfad9feee24a13e0bb9f03dbffc361257a37ae13&w=740", 
  },
  {
    id: "2",
    title: "Dining Table",
    price: "$799.99",
    image: "https://img.freepik.com/free-psd/task-chair-isolated-transparent-background_191095-13719.jpg?t=st=1733878787~exp=1733882387~hmac=c8abc8395588f9503d15e801bfad9feee24a13e0bb9f03dbffc361257a37ae13&w=740", 
  },
  {
    id: "3",
    title: "Office Chair",
    price: "$199.99",
    image: "https://via.placeholder.com/150",
  },
];

const PopularProducts = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Popular Products</Text>
      <FlatList
        data={popularProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>{item.price}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  itemContainer: {
    marginBottom: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#27ae60",
  },
});

export default PopularProducts;
