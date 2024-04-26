import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Service from "../../service/Service";

const Home = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [vendedores, setVendedores] = useState([]);
  const [reload, setReload] = useState(false);
  const handleReload = () => {
    setReload(Date.now());
  };
  const handleBuy = (product, vendedor) =>{
    console.log(product)
    navigation.navigate('Producto', {product, vendedor});
  }

  useEffect(() => {
    Service.getAllProducts()
    .then((response) => {
      setProducts(response.data);
      response.data.map((product) => {
        Service.getUser(product.idUser)
        .then((res) => {
          vendedores.push(res.data.name);
        })
      })
    })
    .catch((error) => {
      console.error(error);
    });
  }, []);

    return (
    <View style={styles.container}>
        <View style={styles.top}></View>

        <View style={styles.container2}>
            <Text style={styles.textContainer} className="font-bold">
                Explora nuestros productos
            </Text>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.cardContent} >
                    {products.map((product, index) => (
                      <View style={styles.card} key={index}>
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
                            {product.description}
                        </Text>
                        <Text style={styles.description}>
                            Vendedor: {vendedores[index]}
                        </Text>
                        <TouchableOpacity
                            style={styles.editButton1}
                            key={product._id}
                            onPress={() => handleBuy(product, vendedores[index])}
                        >
                            <Text style={styles.editButton2}>
                                <AntDesign name="shoppingcart" size={20} color="#fff" style={{ marginRight: 50 }} />
                                Ver y Comprar
                            </Text>
                        </TouchableOpacity>
                    </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      position: "relative",
    },
    container2: {
      flex: 1,
      width: "100%",
      paddingHorizontal: 10,
      paddingTop: 50, // Ajusta este valor según sea necesario
      paddingBottom: 0,
      alignItems: "center",
    },
    scrollViewContent: {
      flexGrow: 1,
    },
    textContainer: {
      fontSize: 24,
      marginBottom: 5,
      alignSelf: "center",
    },
    card: {
      backgroundColor: "#fff",
      borderRadius: 10,
      marginBottom: 0,
      marginHorizontal: 10,
      shadowColor: "#000",
      padding: 20,
      margin: 20,
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
      backgroundColor: "#663CFF",
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

export default Home;