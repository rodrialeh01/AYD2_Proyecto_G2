import React, { useEffect, useState } from "react";
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
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

import * as ImagePicker from "expo-image-picker";
import Service from "../../service/Service";

export default function ReporteVendor({ route, nav }) {
  const [total, setTotal] = useState(0);
  const [dataChart, setDataChart] = useState([
    {
      color: "#98b1ca",
      legendFontColor: "#7F7F7F",
      population: 0,
      name: "temp",
      legendFontSize: 8,
    },
  ]);
  const [productos, setProductos] = useState([]);
  const [data, setData] = useState({
    labels: [],
    datasets: [],
  });

  const [loading, setLoading] = useState(false);

  const { onGoBack } = route.params;

  const handleGoBack = () => {
    if (onGoBack) {
      onGoBack();
    }
    navigation.goBack();
  };

  const navigation = useNavigation();
  let user;

  useEffect(() => {
    const checkUser = async () => {
      user = await AsyncStorage.getItem("data_user");
      user = JSON.parse(user);
      if (!user) {
        navigation.navigate("SignIn");
      }

      try {
        const response = await Service.getIngresos(user.id);
        setProductos(response.data.productos);
        setTotal(response.data.total);

        let labels = [];
        let datasets = [];

        response.data.productos.forEach((element) => {
          labels.push(element.producto);
          datasets.push(element.totalProducto);
        });

        setData({
          labels: labels,
          datasets: datasets,
        });

        const randomColor = () => {
          return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        };

        const randomColorRGB = () => {
            return `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
                Math.random() * 255
            )}, ${Math.floor(Math.random() * 255)})`;
        };



        let dataTemp = [];
        response.data.productos.forEach((element) => {
          dataTemp.push({
            population: element.totalProducto,
            color: randomColorRGB(),
            legendFontColor: "#7F7F7F",
            name: element.producto,
            legendFontSize: 8,
          });
        });

        setDataChart(dataTemp);
        console.log(dataChart);
        setLoading(true);
      } catch (error) {
        console.log(error);
      }
    };

    checkUser();
  }, [loading]);

  return (
    <View className="bg-gray-100" style={styles.container}>
      <View style={styles.top}></View>

      <View style={styles.container2}>
        <Text style={styles.textContainer} className="font-bold">
          Reporte de Ingresos
        </Text>

        <Text style={styles.textContainer2} className="font-bold">
          Q {total}
        </Text>

        
          {loading ? (
            <PieChart
              data={dataChart}
              width={screenWidth}
              height={400}
              chartConfig={{
                backgroundGradientFrom: "#1E2923",
                backgroundGradientFromOpacity: 0,
                backgroundGradientTo: "#08130D",
                backgroundGradientToOpacity: 0.5,
                color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                strokeWidth: 2, // optional, default 3
                barPercentage: 0.5,
                useShadowColorFromDataset: false, // optional
              }}
              accessor={"population"}
              backgroundColor={"transparent"}
              paddingLeft={"15"}
              center={[50, 40]}
              absolute
            />
          ) : null}
        
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
    marginBottom: 20,
    position: "relative",
    top: "10%",
    alignSelf: "center",
  },
  textContainer2: {
    fontSize: 24,
    marginBottom: 60,
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
    height: "50%",
    paddingBottom: 0,
  },
  signin: {
    top: 0,
    color: "#2D3057",
    marginTop: 15,
  },
});
