import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ShowScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>This is the Show Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default ShowScreen;
