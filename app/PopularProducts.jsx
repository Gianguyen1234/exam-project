import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function PopularProducts() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Popular Products</Text>
      <Link href="/" style={styles.link}>
        Back to Start Screen
      </Link>
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
    marginBottom: 20,
  },
  link: {
    fontSize: 18,
    color: "blue",
    marginVertical: 10,
  },
});
