import React, { useEffect, useState } from "react";
import { Link, useNavigation } from "@react-navigation/native";
import Service from "../../service/Service";

import FormData from 'form-data'

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function FormEditP({ route, nav }) {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const { product, onGoBack } = route.params;

  const handleGoBack = () => {
    if (onGoBack) {
      onGoBack();
    }
    navigation.goBack();
  };

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
            type: 'image/png', // Adjust the MIME type accordingly
            name: 'filename.png' // Adjust the filename accordingly
        };

        formData.append('image', file);

        const res = await Service.uploadImage(formData);
        console.log(res.data.data.Location);

        setCurrentProduct((prev) => {
            return {
                ...prev,
                pathImage: res.data.data.Location,
            };
        });

    } catch (error) {
      console.log(error);
    }
  };

  const [currentProduct, setCurrentProduct] = useState({
    currentProduct: {},
  });

  useEffect(() => {
    setCurrentProduct(product);
  }, []);

  const handleEdit = (value, fieldName) => {
    setCurrentProduct({
      ...currentProduct,
      [fieldName]: value,
    });
  };

  const handleSave = async () => {
    let producto = {
      pathImage: currentProduct.pathImage,
      name: currentProduct.name,
      description: currentProduct.description,
      price: currentProduct.price,
      stock: currentProduct.stock,
      idUser: currentProduct.idUser,
    };
    const res = await Service.editProduct(currentProduct._id, producto);
    if (res.message === "Product updated successfully") {
      alert("Producto actualizado");

      handleGoBack();
    } else {
      alert("Error al actualizar el producto");
    }
  };

  return (
    <View className="bg-gray-100" style={styles.container}>
      <View style={styles.top}></View>

      <View style={styles.container2}>
        <Text style={styles.textContainer} className="font-bold">
          Editar un Producto
        </Text>

        <View style={styles.formArea} className="border-b-8 border-gray-400">
          <View className="bg-gray-200 p-3 border-b-2">
            <Image
              className="object-contain w-32 h-32"
              source={{ uri: currentProduct.pathImage }}
              name="pathImage"
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
              <Text className="text-white font-bold text-center">
                Subir imagen
              </Text>
            </TouchableOpacity>

            <TextInput
              className="h-12 w-80 border-b-2 border-black-900 rounded-full mb-3 px-3 bg-white pl-5"
              placeholder="Nombre del producto"
              defaultValue={product.name}
              onChangeText={(text) => handleEdit(text, "name")}
              name="name"
            />
            <TextInput
              className="h-12 w-80 border-b-2 border-black-900 rounded-full mb-3 px-3 bg-white pl-5"
              placeholder="Precio (Q)"
              keyboardType="numeric"
              onChangeText={(text) => handleEdit(text, "price")}
              name="price"
              defaultValue={product.price.toString()}
            />
            <TextInput
              className="h-12 w-80 border-b-2 border-black-900 rounded-full mb-3 px-3 bg-white pl-5"
              placeholder="Cantidad Disponible"
              keyboardType="numeric"
              onChangeText={(text) => handleEdit(text, "stock")}
              name="stock"
              defaultValue={product.stock.toString()}
            />
            <TextInput
              multiline={true}
              numberOfLines={4}
              className="h-32 w-80 border border-black-900 mb-3 mt-5 px-3 bg-white pl-5"
              placeholder="Descripción del producto..."
              onChangeText={(text) => handleEdit(text, "description")}
              name="description"
              defaultValue={product.description}
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
