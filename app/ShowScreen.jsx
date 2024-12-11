// app/popular-products.tsx (PopularProducts)
import { View, Text, StyleSheet } from "react-native";

export default function PopularProducts() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Popular Products</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
