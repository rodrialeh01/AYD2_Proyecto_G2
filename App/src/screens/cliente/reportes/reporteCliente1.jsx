import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { BarChart } from "react-native-chart-kit";
import Service from "../../service/Service";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ReviewReport() {
  const [reviewData, setReviewData] = useState([]);

  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        // Obtener el ID del cliente del almacenamiento local
        const userId = await AsyncStorage.getItem("user_id");

        // Obtener los datos de las reseñas del cliente
        const response = await Service.getReviewsByMonth(userId);

        // Actualizar el estado con los datos de las reseñas
        setReviewData(response.data);
      } catch (error) {
        console.error("Error al obtener los datos de las reseñas:", error);
      }
    };

    fetchReviewData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Informe de Reseñas por Mes</Text>
      {reviewData.length > 0 ? (
        <BarChart
          data={{
            labels: reviewData.map((item) => item.month),
            datasets: [
              {
                data: reviewData.map((item) => item.reviewCount),
              },
            ],
          }}
          width={screenWidth}
          height={220}
          yAxisSuffix=""
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
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      ) : (
        <Text>No hay datos disponibles</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
