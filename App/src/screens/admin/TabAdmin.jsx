import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from '@expo/vector-icons';

import DeleteClient from "./deleteClient";
import DeleteProduct from "./deleteProduct";
import DeleteReview from "./deleteReview";
import ReporteAdmin from "./reporteAdmin";

const Tab = createBottomTabNavigator();

export default function TabAdmin() {
  return (
    <Tab.Navigator
      initialRouteName="DeleteClient"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "purple",
      }}
    >
      <Tab.Screen
        name="DeleteClient"
        component={DeleteClient}
        options={{
          tabBarLabel: "Eliminar Cliente",
          tabBarIcon: () => <FontAwesome5 name="user-times" size={24} color="purple" />,
        }}
        />
        <Tab.Screen
        name="DeleteProduct"
        component={DeleteProduct}
        options={{
          tabBarLabel: "Eliminar Producto",
          tabBarIcon: () => <FontAwesome5 name="trash" size={24} color="purple" />,
        }}
        />
        <Tab.Screen
        name="DeleteReview"
        component={DeleteReview}
        options={{
          tabBarLabel: "Eliminar Review",
          tabBarIcon: () => <FontAwesome5 name="trash-alt" size={24} color="purple" />,
        }}
        />
        <Tab.Screen
        name="ReporteAdmin"
        component={ReporteAdmin}
        options={{
          tabBarLabel: "Reportes",
          tabBarIcon: () => <FontAwesome5 name="chart-bar" size={24} color="purple" />,
        }}
        />
    </Tab.Navigator>
  );
}
