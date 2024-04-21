import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Service from "../../service/Service";

const Review = ({ productId }) => {
  const [review, setReview] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const loadReview = async () => {
      try {
        const response = await Service.getReviewByProductId(productId);
        setReview(response.data);
        if (response.data) {
          setRating(response.data.rating);
          setComment(response.data.comment);
        }
      } catch (error) {
        console.error("Error loading review:", error);
      }
    };

    loadReview();
  }, [productId]);

  const handleSubmit = async () => {
    try {
      let formData = new FormData();
      formData.append("rating", rating);
      formData.append("comment", comment);
      formData.append("idProduct", productId);

      if (review) {
        const response = await Service.updateReview(review._id, formData);
        setReview(response.data);
      } else {
        const response = await Service.createReview(formData);
        setReview(response.data);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const handleDelete = async () => {
    if (review) {
      try {
        await Service.deleteReview(review._id);
        setReview(null);
        setRating(0);
        setComment("");
      } catch (error) {
        console.error("Error deleting review:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      {review ? (
        <View style={styles.reviewContainer}>
          <Text style={styles.title}>Tu reseña</Text>
          <Text style={styles.comment}>{review.comment}</Text>
          <TouchableOpacity style={styles.button} onPress={handleDelete}>
            <Text style={styles.buttonText}>Eliminar reseña</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.reviewContainer}>
          <Text style={styles.title}>Escribe una reseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Deja un comentario..."
            value={comment}
            onChangeText={setComment}
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Enviar reseña</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  reviewContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  comment: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default Review;
