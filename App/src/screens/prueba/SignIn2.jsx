import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

export default function SignIn2() {

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('data_user');
        if (value !== null) {
          console.log("Data_user_guardado", value);
        }
      } catch (e) {
        console.log(e);
      }
    }
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Text className="text-3xl">Login2</Text>
      <StatusBar style="auto" />
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