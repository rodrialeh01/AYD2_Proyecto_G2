import React, {useEffect, useState} from "react";
import { Link, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Service from "../../service/Service";

export default function CrearProducto() {
  const navigation = useNavigation();
  let user;

  useEffect(() => {
    const checkUser = async () => {
    user = await AsyncStorage.getItem("data_user");
    user = JSON.parse(user);
    if (!user) {
      navigation.navigate("SignIn");
    }

    setProduct({ ...product, idUser: user.id });
  };

  checkUser();

  }, []);


  const [product, setProduct] = useState({
    pathImage: require("../../../assets/noImage.jpg"),
    name: "",
    price: 0,
    stock: 0,
    description: "",
    idUser: "",
  });

  const [image, setImage] = useState(null);
  const chooseImage = async () => {
    let options = {
      storageOptions: {
        path: "images",
      },
    };

    try {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      const result = await ImagePicker.launchImageLibraryAsync(options);
      if (!result.cancelled) {
        result2 = result.assets;
        setImage(result2[0].uri);

        await handleFormData(result2[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormData = async (result) => {
    try {
      const formData = new FormData();
      const fileUri = result.uri;
      const file = {
        uri: fileUri,
        name: result.fileName,
        type: "image/jpeg",
      };

      formData.append("image", file);
      const res = await Service.uploadImage(formData);
      setProduct({ ...product, pathImage: res.data.data.Location });

    } catch (error) {
      console.log(error);
    }
  }

  const handleEdit = (value, field) => {
    setProduct({ ...product, [field]: value });
  }

  const handleSave = async () => {
    try {
      const idUser = await AsyncStorage.getItem("data_user");
      const user = JSON.parse(idUser);
      product.idUser = user.id;


      let producto = {
        pathImage: product.pathImage,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        idUser: product.idUser,
      };
      console.log(producto);
      const res = await Service.createProduct(product);
      if (res.message === "Product created successfully") {
        alert("Producto creado exitosamente");
        navigation.navigate("ListadoProductos");
      } else {
        alert("Error al crear el producto");
      }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <View className="bg-gray-100" style={styles.container}>
      <View style={styles.top}></View>

      <View style={styles.container2}>
        <Text style={styles.textContainer} className="font-bold">
          Registrar un nuevo Producto
        </Text>

        <View style={styles.formArea} className="border-b-8 border-gray-400">
          <View className="bg-gray-200 p-3 border-b-2">
            <Image
              className="object-contain w-32 h-32"
              source={{uri: product.pathImage}}
              style={{
                alignSelf: "center",
                borderWidth: 3,
                borderColor: "gray",
                marginTop: 20,
              }}
            />
          </View>
            <View className="p-3">

                <TouchableOpacity
                    className="bg-purple-700 py-2 px-4 rounded-full w-48 mb-2 h-10 flex items-center justify-center"
                    style={{ alignSelf: "center" }}
                    onPress={chooseImage}
                >
                    <Text className="text-white font-bold text-center">Subir imagen</Text>
                </TouchableOpacity>
                
                <TextInput
                    className="h-12 w-80 border-b-2 border-black-900 rounded-full mb-3 px-3 bg-white pl-5"
                    placeholder="Nombre del producto"
                    onChangeText={(text) => handleEdit(text, "name")}
                />
                <TextInput
                    className="h-12 w-80 border-b-2 border-black-900 rounded-full mb-3 px-3 bg-white pl-5"
                    placeholder="Precio (Q)"
                    keyboardType="numeric"
                    onChangeText={(text) => handleEdit(text, "price")}
                />
                <TextInput
                    className="h-12 w-80 border-b-2 border-black-900 rounded-full mb-3 px-3 bg-white pl-5"
                    placeholder="Cantidad Disponible"
                    keyboardType="numeric"
                    onChangeText={(text) => handleEdit(text, "stock")}
                />
                <TextInput
                    multiline={true}
                    numberOfLines={4}
                    className="h-32 w-80 border border-black-900 mb-3 mt-5 px-3 bg-white pl-5"
                    placeholder="Descripción del producto..."
                    onChangeText={(text) => handleEdit(text, "description")}
                />
                <TouchableOpacity
                    style={{ alignSelf: "center" }}
                    className="bg-green-600 rounded-full w-48 h-10 mt-5 flex items-center justify-center"

                    onPress={handleSave}
                >
                    <Text className="text-white font-bold text-center">Guardar</Text>
                </TouchableOpacity>

            </View>

        </View>
      </View>
      <View style={styles.footer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  top: {
    position: "relative",

    paddingRight: 12.7,
    paddingLeft: 12.7,
    height: "30%",
  },
  textContainer: {
    fontSize: 24,
    marginBottom: 30,
    position: "relative",
    top: "10%",
    alignSelf: "center",
  },
  container2: {
    width: "100%",
    height: "100%",
    flex: 1,
    position: "absolute",
    zIndex: 2,
    backgroundColor: "transparent",
    paddingLeft: 26.3,
    paddingRight: 26.3,
  },
  footer: {
    position: "relative",
    paddingRight: 12.7,
    paddingLeft: 12.7,
    height: "30%",
  },
  formArea: {
    alignSelf: "center",
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 5,
    borderWidth: 1,
    top: "10%",
    paddingBottom: 40,
  },
  signin: {
    top: 0,
    color: "#2D3057",
    marginTop: 15,
  },
});
