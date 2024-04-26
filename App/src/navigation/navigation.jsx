import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import SignIn from "../screens/auth/SignIn";
import SignUp from "../screens/auth/SignUp";
import Home from "../screens/cliente/Home";
import Review from "../screens/cliente/Review";
import VerProducto from "../screens/cliente/VerProducto";
import Prueba from '../screens/prueba/prueba';
import CrearProducto from '../screens/vendor/crearProducto';
import FormEditP from '../screens/vendor/formEditP';
import ListadoProductos from '../screens/vendor/listadoProductos';
import ReporteVendor from '../screens/vendor/reporteVendor';

const Stack = createStackNavigator();

function MyTabs() {
  return (
    <Stack.Navigator initialRouteName="SignIn"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Prueba" component={Prueba} />
      <Stack.Screen name="CrearProducto" component={CrearProducto} />
      <Stack.Screen name="ListadoProductos" component={ListadoProductos} />
      <Stack.Screen name="FormEditP" component={FormEditP} />
      <Stack.Screen name="ReporteVendor" component={ReporteVendor} />
      <Stack.Screen name="Review" component={Review} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Producto" component={VerProducto}/>
    </Stack.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
