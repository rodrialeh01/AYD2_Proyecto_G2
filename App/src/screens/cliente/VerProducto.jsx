import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
const VerProducto =({ route, nav })=>{
  const [quantity, setQuantity] = useState(1);
    const { product, vendedor } = route.params;
    return(
        <View style={styles.container}>
        <View style={styles.top}></View>

        <View style={styles.container2}>
            <Text style={styles.textContainer} className="font-bold">
                {product.name}
            </Text>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.cardContent} >
                <Image
                    style={styles.image}
                    className="object-contain w-64 h-64"
                    source={{ uri: product.pathImage }}
                />
                </View>
                <View style={styles.container4}>
                  <Text>
                    <Text style={styles.boldText}>Vendedor: </Text>
                    <Text>{vendedor}</Text>
                  </Text>
                </View>
                <Text style={styles.stock}>Cantidad: {product.stock}</Text>
                <Text style={styles.price}>Q{product.price}</Text>
                <View style={styles.container3}>
                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.text}>{quantity}</Text>
                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>+</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                            style={styles.editButton1}
                            key={product._id}
                >
                    <Text style={styles.editButton2}>
                        <AntDesign name="shoppingcart" size={20} color="#fff" style={{ marginRight: 50 }} />
                        Comprar
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    </View>
    )
}

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
    container3: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    container4: {
      alignItems: 'center',
      justifyContent: 'center',
      margin: 10,
    },
    button: {
      backgroundColor: 'blue',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginHorizontal: 5,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
    },
    text: {
      fontSize: 16,
      marginHorizontal: 5,
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
    desc: {
      fontSize: 19,
      marginBottom: 5
    },
    price: {
      fontSize: 30,
      marginBottom: 5,
      alignSelf: "center",
    },
    stock: {
      fontSize: 16,
      marginBottom: 5,
      alignSelf: "center",
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
    boldText: {
      fontWeight: 'bold',
    },
  });

export default VerProducto;