import React, { useState, useEffect } from "react";
import Service from "../../service/Service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  Image,
} from "react-native";

export default function ListadoProductos() {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleReload = () => {
    setReload(Date.now());
  };

  const [currentProduct, setCurrentProduct] = useState({
    currentProduct: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      user = await AsyncStorage.getItem("data_user");
      user = JSON.parse(user);
      if (!user) {
        navigation.navigate("SignIn");
      }

      try {
        const res = await Service.getProducts(user.id);
        setProducts(res.data);
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
  const handleOpenEdit = (product) => {
    setCurrentProduct(product);
    navigation.navigate("FormEditP", { product, onGoBack: handleReload });
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}></View>

      <View style={styles.container2}>
        <Text style={styles.textContainer} className="font-bold">
          Listado de Productos
        </Text>
      </View>

      {loading ? (
        <ScrollView style={styles.scrollView}>
          {products.map((product,) => (
            <View style={styles.cardContent} key={product._id}>
              <View style={styles.card}>
                <Image
                  style={styles.image}
                  className="object-contain w-64 h-64"
                  source={{ uri: product.pathImage }}
                />
                <Text style={styles.name}>{product.name}</Text>
                <Text style={styles.price}>Precio: Q{product.price}</Text>
                <Text style={styles.stock}>
                  Cantidad Disponible: {product.stock}
                </Text>
                <Text style={styles.description}>
                  Descripción: {product.description}
                </Text>
                <TouchableOpacity
                  key={product._id}
                  style={styles.editButton1}
                  onPress={() => handleOpenEdit(product)}
                >
                  <Text style={styles.editButton2}>Editar</Text>
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
  editButton1: {
    marginTop: 10,
    borderRadius: 10,
  },
});
