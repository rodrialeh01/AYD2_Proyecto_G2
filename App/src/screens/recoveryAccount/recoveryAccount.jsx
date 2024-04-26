import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { Link, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Service from "../../service/Service"

export default function RecoveryAccount() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [stateCode, setStateCode] = useState(false);

  const handleRecovery = async () => {
      if (!email) {
        alert('El campo de correo es obligatorio');
        return;
      }

      const res = await Service.recuperarPassword(email);
      console.log(res);
      if(res.status === 200){
        alert('Se ha enviado un correo con el código de recuperación');
        setStateCode(true);

      }else{
        alert('Correo no encontrado');
      }
      return;
  }

  const handleSignIn = async () => {

    if (!email || !code) {
      alert('Los campos de correo y codigo son obligatorios');
      return;
    }

    let user = {
      email,
      password: code
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
      alert('Correo o codigo incorrectos');
    }
  }

  return (
    <View style={styles.container}>
      {/* <Image
        source={require('../../../assets/Logo2.png')}
        style={{ width: 200, height: 200, marginBottom: 20 }}
      /> */}

      <Text className="text-2xl font-bold text-gray-800">¿Olvidaste tu contraseña?</Text>

      <Text className="text-lg font-bold text-gray-500 mb-16">¡Recuperala!</Text>

      <StatusBar style="auto" />

      <TextInput
        placeholder="Correo electrónico"
        className="h-12 w-80  rounded-full mb-4 px-3 bg-white pl-5 hover:border-gray-500 shadow-inner"
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
      />
    
      {stateCode && (
        <TextInput
        placeholder="Codigo de recuperación"
        className="h-12 w-80 border-gray-300 rounded-full mb-3 px-3 bg-white pl-5"
        onChangeText={(text) => setCode(text)}
      />
      )}

      <TouchableOpacity
        className="bg-purple hover:bg-blue-700 py-2 px-4 rounded-full mt-10 mb-14 p-3 w-48 h-12 flex items-center justify-center"
        // onPress={() => navigation.navigate('Prueba')}
        onPress={handleRecovery}
      >
        {stateCode ? (
          <Text className="text-white font-bold text-center" onPress={() => handleSignIn()}>RECUPERAR</Text>
        ) : (
          <Text className="text-white font-bold text-center" onPress={() => handleRecovery()}>ENVIAR CODIGO</Text>
        )}
      </TouchableOpacity>
      

      <Link to="/SignIn" className="text-blue-500 mt-2"> 
        <Text className="text-gray-500 font-bold">¿Deseas volver?</Text>
        <Text className="font-bold"> Iniciar Sesión</Text>
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