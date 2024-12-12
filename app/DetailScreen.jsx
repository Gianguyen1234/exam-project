import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, TextInput, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function DetailScreen() {
  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState([]);
  const router = useRouter();

  const product = {
    id: '1',
    name: 'Modern Sofa',
    description: 'A stylish and comfortable sofa for your living room. Perfect for relaxing and entertaining.',
    price: '$599',
    discount: '20% OFF', // New discount field
    image: 'https://images.pexels.com/photos/133919/pexels-photo-133919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.5,
    reviews: 120,
  };

  const handleAddToCart = () => {
    alert(`${product.name} has been added to the cart!`);
  };


  const handleGoBack = () => {
    router.back();
  };

  const handleAddComment = () => {
    if (comment.trim() && rating > 0) {
      setComments([
        ...comments,
        { text: comment, rating: rating },
      ]);
      setComment('');
      setRating(0);
    } else {
      alert("Please enter a comment and select a rating.");
    }
  };

  const renderStars = (count) => {
    return [...Array(5)].map((_, index) => (
      <TouchableOpacity key={index} onPress={() => setRating(index + 1)}>
        <Text style={index < count ? styles.filledStar : styles.emptyStar}>★</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        <Text style={styles.discountLabel}>{product.discount}</Text>
      </View>

      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>{product.price}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>

      {/* Ratings and Reviews Section */}
      <View style={styles.ratingsContainer}>
        <Text style={styles.ratingText}>
          Rating: {product.rating} ({product.reviews} reviews)
        </Text>
        <View style={styles.ratingStars}>
          {[...Array(5)].map((_, index) => (
            <Text key={index} style={index < product.rating ? styles.filledStar : styles.emptyStar}>
              ★
            </Text>
          ))}
        </View>
      </View>

      {/* Quantity Selection */}
      <View style={styles.quantityContainer}>
        <Text style={styles.quantityText}>Quantity:</Text>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => setQuantity(quantity - 1 < 1 ? 1 : quantity - 1)}
        >
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityNumber}>{quantity}</Text>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => setQuantity(quantity + 1)}
        >
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
      </TouchableOpacity>


      {/* Feedback Section (Comments + Star Rating) */}
      <View style={styles.commentSection}>
        <Text style={styles.commentTitle}>Leave a Comment:</Text>

        <View style={styles.starRatingContainer}>{renderStars(5)}</View>

        <TextInput
          style={styles.commentInput}
          placeholder="Write your comment here..."
          value={comment}
          onChangeText={setComment}
        />
        <TouchableOpacity style={styles.addCommentButton} onPress={handleAddComment}>
          <Text style={styles.addCommentButtonText}>Add Comment</Text>
        </TouchableOpacity>

        <FlatList
          data={comments}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.commentCard}>
              <View style={styles.ratingStars}>{renderStars(item.rating)}</View>
              <Text style={styles.commentText}>{item.text}</Text>
            </View>
          )}
          style={styles.commentList}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007BFF',
    fontWeight: '600',
  },
  imageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  discountLabel: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'red',
    color: 'white',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 20,
    color: '#007BFF',
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    color: '#777',
    marginBottom: 20,
  },
  ratingsContainer: {
    marginBottom: 20,
  },
  ratingText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
  },
  ratingStars: {
    flexDirection: 'row',
  },
  filledStar: {
    color: '#FFD700',
    fontSize: 18,
  },
  emptyStar: {
    color: '#ddd',
    fontSize: 18,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  quantityText: {
    fontSize: 18,
    color: '#333',
    marginRight: 10,
  },
  quantityButton: {
    width: 30,
    height: 30,
    backgroundColor: '#007BFF',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityNumber: {
    fontSize: 18,
    color: '#333',
  },
  addToCartButton: {
    backgroundColor: '#007BFF',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 25,
    marginTop: 20,
    alignSelf: 'center',
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  commentSection: {
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  commentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  starRatingContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  commentInput: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  addCommentButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  addCommentButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  commentList: {
    marginTop: 20,
  },
  commentCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  commentText: {
    fontSize: 16,
    color: '#555',
  },
});
