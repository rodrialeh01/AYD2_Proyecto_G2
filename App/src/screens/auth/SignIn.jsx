import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SignIn() {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text className="text-3xl">Login</Text>
      <StatusBar style="auto" />
      <TouchableOpacity
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2  mb-6 px-4 rounded"
        onPress={() => navigation.navigate('Prueba')}
      >
        <Text>Iniciar Sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onPress={() => navigation.navigate('SignUp')}
      >
        <Text>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});