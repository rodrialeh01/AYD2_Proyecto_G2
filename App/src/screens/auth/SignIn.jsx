import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { Link, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Service from "../../service/Service"

export default function SignIn() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {

    if (!email || !password) {
      alert('Los campos de correo y contraseña son obligatorios');
      return;
    }

    let user = {
      email,
      password,
    };

    console.log(user);

    const res = await Service.login(JSON.stringify(user));
    if(res.status === 200){
      console.log(res.data);
      const savedData = {
        id: res.data.data.id,
        rol: res.data.data.rol
      }
      await AsyncStorage.setItem('data_user', JSON.stringify(savedData));
      alert('Bienvenido');
      navigation.navigate('Prueba');
    }else{
      alert('Correo o contraseña incorrectos');
    }

    // fetch('http://192.168.31.150:4000/auth/sign/in', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(user),
    // }).then((response) => {
    //   if (response.status === 200) {
    //     alert('Bienvenido');
    //     navigation.navigate('Prueba');
    //   } else {
    //     alert('Correo o contraseña incorrectos');
    //   }
    // }).catch((error) => {
    //   console.error('Error:', error);
    // });


  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/Logo2.png')}
        style={{ width: 200, height: 200, marginBottom: 20 }}
      />

      <Text className="text-5xl font-bold text-gray-800">Hola</Text>

      <Text className="text-lg font-bold text-gray-500 mb-5">Accede a tu cuenta</Text>

      <StatusBar style="auto" />

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

      <View style={styles.forgotPassword}>
        <Link to="/SignUp" className="text-blue-500 mt-2">
          <Text className="mt-2 text-gray-500 font-bold">¿Olvidaste tu contraseña?</Text>
        </Link>
      </View>

      <TouchableOpacity
        className="bg-purple hover:bg-blue-700 py-2 px-4 rounded-full mt-16 mb-14 p-3 w-48 h-12 flex items-center justify-center"
        // onPress={() => navigation.navigate('Prueba')}
        onPress={handleSignIn}
      >
        <Text className="text-white font-bold text-center">INICIAR SESION</Text>
      </TouchableOpacity>
      

      <Link to="/SignUp" className="text-blue-500 mt-2"> 
        <Text className="text-gray-500 font-bold">¿No tienes una cuenta?</Text>
        <Text className="font-bold"> Registrate</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginEnd: 30,
  },
});