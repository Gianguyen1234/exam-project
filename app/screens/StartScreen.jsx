import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import PopularProducts from './PopularProducts'; 

const StartScreen = ({ navigation }) => {
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Renovate Your Interior</Text>
        <Button
          title="Go to catalog"
          onPress={() => navigation.navigate('ShowScreen')}  
        />
      </View>
      
      <PopularProducts />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default StartScreen;
