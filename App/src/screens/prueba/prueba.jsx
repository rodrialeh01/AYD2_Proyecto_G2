import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from '@expo/vector-icons';

import SignIn2 from "./SignIn2";
import SignUp from "../../screens/auth/SignUp";

const Tab = createBottomTabNavigator();

export default function Prueba() {
  return (
    <Tab.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "purple",
      }}
    >
      <Tab.Screen
        name="SignIn2"
        component={SignIn2}
        options={{
          tabBarLabel: "Iniciar Sesión",
          tabBarIcon: () => <FontAwesome5 name="sign-in-alt" size={24} color="purple" />,
          tabBarVisible: false,
        }}
      />
      <Tab.Screen
        name="SignUp"
        component={SignUp}
        options={{
          tabBarLabel: "Registrarse",
          tabBarIcon: () => <FontAwesome5 name="user-plus" size={24} color="purple" />,
        }}
      />
    </Tab.Navigator>
  );
}
