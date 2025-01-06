import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

export default function AboutShop() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Banner Image */}
      <Image
        source={{
          uri: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        }}
        style={styles.bannerImage}
      />

      {/* Content Section */}
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to Renovate Your Interior</Text>

        {/* About Us Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Us</Text>
          <Text style={styles.description}>
            At Renovate Your Interior, we offer top-notch interior design services and furniture, bringing modern
            and sophisticated designs to your home at affordable prices.
          </Text>
        </View>

        {/* Mission Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Mission</Text>
          <Text style={styles.description}>
            Our mission is to inspire, create, and provide innovative and stylish solutions for every interior, no
            matter the size or budget.
          </Text>
        </View>

        {/* Why Choose Us Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why Choose Us?</Text>
          <Text style={styles.description}>
            - High-quality materials and designs{'\n'}
            - Expert advice and consultancy{'\n'}
            - Customized solutions{'\n'}
            - Affordable pricing options
          </Text>
        </View>

        {/* Contact Us Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <Text style={styles.description}>
            Need assistance? We're here to help!
          </Text>
          <Text style={styles.contactDetails}>
            Email: support@renovateyourinterior.com{'\n'}
            Phone: +1 234 567 8901{'\n'}
            Address: 123 Interior Street, Design City, DC 45678
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f9f9f9',
    paddingBottom: 20,
  },
  bannerImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  content: {
    paddingHorizontal: 25,
    paddingTop: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 25,
    fontFamily: 'Roboto', // Elegant and modern font
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginVertical: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    fontFamily: 'Roboto', 
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    textAlign: 'justify',
    fontFamily: 'Roboto',
  },
  contactDetails: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    fontFamily: 'Roboto',
    marginTop: 10,
  },
});
