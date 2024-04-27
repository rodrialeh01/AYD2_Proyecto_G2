import React, { useState, useEffect } from "react";
import Service from "../../service/Service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
const Tab = createBottomTabNavigator();
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  Image,
} from "react-native";

export default function DeleteReview() {
  const [reviews, setReviews] = useState([]);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleReload = () => {
    setReload(Date.now());
  };


  useEffect(() => {
    const fetchData = async () => {
      user = await AsyncStorage.getItem("data_user");
      user = JSON.parse(user);
      if (!user) {
        navigation.navigate("SignIn");
      }

      try {
        const res = await Service.getAllRevies();
        setReviews(res.data);
        setTimeout(() => {
          setLoading(true);
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [reload]);

  const navigation = useNavigation();

  const handleDelete = (review) => {
    try {
      Service.deleteReview(review);
      alert("Review eliminada");
      handleReload();
    } catch (error) {
      console.log(error);
    }
  };

 
  return (
    <View style={styles.container}>
      <View style={styles.top}></View>

      <View style={styles.container2}>
        <Text style={styles.textContainer} className="font-bold">
          Listado de Reviews
        </Text>
      </View>
      {loading ? (
        <ScrollView style={styles.scrollView}>
          {reviews.map((review,) => (
            <View style={styles.cardContent} key={review._id}>
              <View style={styles.card}>
                {review.image ? (
                    <Image
                        style={styles.image}
                        source={{ uri: review.image }}
                    />
                ) : null || "" || undefined}
                <Text style={styles.price}>Created: {review.createdAt}</Text>
                <Text style={styles.stock}>
                  Rating: {review.rating}
                </Text>
                <Text style={styles.description}>
                  Comentario: {review.comment}
                </Text>
                <TouchableOpacity
                  key={review._id}
                  style={styles.deleteButton}
                  onPress={() => handleDelete(review._id)}
                >
                  <Text style={styles.deleteButton2}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      ) : null}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  container2: {
    width: "100%",
    paddingTop: 50,
    paddingBottom: 0,
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
    height: "100%",
  },
  textContainer: {
    fontSize: 24,
    marginBottom: 5,
    position: "relative",
    top: "10%",
    alignSelf: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 0,
    marginHorizontal: 10,
    shadowColor: "#000",
    padding: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContent: {
    padding: 20,
  },
  image: {
    alignSelf: "center",
    borderRadius: 15,
  },

  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    alignSelf: "center",
  },
  price: {
    fontSize: 16,
    marginBottom: 5,
  },
  stock: {
    fontSize: 16,
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  editButton2: {
    backgroundColor: "#ffc107",
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 10,
  },
  deleteButton: {
    backgroundColor: "#ff0000",
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 10,
  },
    deleteButton2: {
        backgroundColor: "#ff0000",
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        paddingVertical: 10,
    },
  editButton1: {
    marginTop: 10,
    borderRadius: 10,
  },
  editButton3: {
    backgroundColor: "#663CFF",
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  editButton4: {
    backgroundColor: "#984AF0",
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
