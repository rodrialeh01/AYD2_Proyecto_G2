import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { Link, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";

import Service from "../../service/Service";

export default function SignUp() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cui, setCui] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pathImage, setPathImage] = useState("");
  const [nameFile, setNameFile] = useState("Seleccionar Foto");

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
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
      setPathImage(res.data.data.Location);
      setNameFile(result.fileName);

    } catch (error) {
      console.log(error);
    }
  }

  const handleSignUp = async () => {
    if (!name || !email || !password || !cui || !selectedRole) {
      alert("Los campos de nombre, correo, contraseña, cui y rol son obligatorios");
      return;
    }

    let user = {
      name,
      email,
      password,
      cui,
      birthday: date,
      role: selectedRole,
      verified: 1,
      pathImage: pathImage,
    };

    console.log(user);

    const res = await Service.registrarUsuario(JSON.stringify(user));
    if (res.message === "User created successfully") {
      console.log(res.data);
      
      alert("Cuenta creada exitosamente");
      navigation.navigate("SignIn");
    } else {
      alert("Error al crear la cuenta");
    }
  };

  return (
    <View style={styles.container}>
      {/* <Image
        source={require('../../../assets/Logo2.png')}
        style={{ width: 200, height: 200, marginBottom: 20 }}
      /> */}

      <Text className="text-5xl font-bold text-gray-800">Registrarse</Text>

      <Text className="text-lg font-bold text-gray-500 mb-10">
        Crea tu cuenta
      </Text>

      <StatusBar style="auto" />

      <TextInput
        placeholder="Nombre"
        className="h-12 w-80  rounded-full mb-4 px-3 bg-white pl-5 hover:border-gray-500 shadow-inner"
        onChangeText={(text) => setName(text)}
      />

      <TextInput
        placeholder="Correo electrónico"
        className="h-12 w-80  rounded-full mb-4 px-3 bg-white pl-5 hover:border-gray-500 shadow-inner"
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        placeholder="Contraseña"
        className="h-12 w-80 border-gray-300 rounded-full mb-3 px-3 bg-white pl-5"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />

      <TextInput
        placeholder="CUI"
        className="h-12 w-80  rounded-full mb-4 px-3 bg-white pl-5 hover:border-gray-500 shadow-inner"
        onChangeText={(text) => setCui(text)}
      />

      <TouchableOpacity
          onPress={chooseImage}
          className="h-12 w-80  rounded-full mb-4 px-3 bg-white pl-5 hover:border-gray-500 flex items-start justify-center"
        >
          <Text className="text-gray-500">
            {nameFile}
          </Text>
      </TouchableOpacity>

      <View>
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          className="h-12 w-80  rounded-full mb-4 px-3 bg-white pl-5 hover:border-gray-500 flex items-start justify-center"
        >
          <Text className="text-gray-500">
            {date.getDate() != new Date().getDate()
              ? date.toISOString().slice(0, 10)
              : "Fecha Nacimiento"}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="spinner"
            onChange={handleDateChange}
          />
        )}
      </View>

      <Picker
        selectedValue={selectedRole}
        style={{ height: 40, width: 300, marginBottom: 10, borderRadius: 100 }}
        onValueChange={(itemValue, itemIndex) => setSelectedRole(itemValue)}
      >
        <Picker.Item label="Seleccione un rol" value="1" />
        <Picker.Item label="Cliente" value="1" />
        <Picker.Item label="Vendedor" value="2" />
      </Picker>

      <TouchableOpacity
        className="bg-purple hover:bg-blue-700 py-2 px-4 rounded-full mt-8 mb-14 p-3 w-48 h-12 flex items-center justify-center"
        // onPress={() => navigation.navigate('Prueba')}
        onPress={handleSignUp}
      >
        <Text className="text-white font-bold text-center">REGISTRAR</Text>
      </TouchableOpacity>

      <Link to="/SignIn" className="text-blue-500 mt-2">
        <Text className="text-gray-500 font-bold">Tambien puedes</Text>
        <Text className="font-bold"> Iniciar Sesión</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginEnd: 30,
  },
});
