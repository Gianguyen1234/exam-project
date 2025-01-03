// File: AboutShop.jsx

import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

export default function AboutShop() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }}
        style={styles.bannerImage}
      />
      <View style={styles.content}>
        <Text style={styles.title}>About Renovate Your Interior</Text>
        <Text style={styles.description}>
          Welcome to Renovate Your Interior, your one-stop destination for premium interior design and furniture solutions.
          Our shop specializes in providing high-quality, modern, and affordable products to transform your living space
          into a masterpiece.
        </Text>
        <Text style={styles.sectionTitle}>Our Mission</Text>
        <Text style={styles.description}>
          At Renovate Your Interior, we aim to inspire creativity and innovation in interior design by offering a
          wide variety of products tailored to meet the unique needs of every customer.
        </Text>
        <Text style={styles.sectionTitle}>Why Choose Us?</Text>
        <Text style={styles.description}>
          - Premium quality furniture and decor
          - Affordable prices
          - Excellent customer service
          - A wide selection of modern and timeless designs
        </Text>
        <Text style={styles.sectionTitle}>Contact Us</Text>
        <Text style={styles.description}>
          Have questions or need assistance? Feel free to reach out to us:
        </Text>
        <Text style={styles.contactDetails}>
          Email: support@renovateyourinterior.com{'\n'}
          Phone: +1 234 567 8901{'\n'}
          Address: 123 Interior Street, Design City, DC 45678
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
  },
  bannerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
    marginBottom: 15,
    textAlign: 'justify',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
    marginBottom: 5,
  },
  contactDetails: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
    marginTop: 10,
  },
});
