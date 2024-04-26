import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { BarChart } from "react-native-chart-kit";
import Service from "../../service/Service";

  
const ReporteAdmin = () => {
    const [data, setData] = useState({});

    useEffect(() => {
        Service.getTop10Sellers()
            .then((res) => {
                const dt = res.data;
                const labels = dt.map((obj) => obj.vendorName);
                const quantities = dt.map((obj) => obj.quantity);

                const chartData = {
                    labels: labels,
                    datasets: [{
                        data: quantities,
                    }]
                };

                setData(chartData);
            })
            .catch((err) => {
                console.error('Error al obtener los datos:', err);
            });
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.top}></View>
            <View style={styles.container2}>
                <Text style={styles.textContainer} className="font-bold">
                Top 10 vendedores
                </Text>
            </View>
            {data.labels && (
                <BarChart
                    data={{
                        labels: data.labels,
                        datasets: [{
                            data: data.datasets[0].data,
                        }]
                    }}
                    width={400}
                    height={400}
                    yAxisLabel=""
                    chartConfig={{
                        backgroundGradientFrom: "#FFF",
                        backgroundGradientTo: "#FFF",
                        color: (opacity = 1) => `rgba(54, 162, 235, ${opacity})`,
                        strokeWidth: 2,
                    }}
                    verticalLabelRotation={30}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      position: "relative",
    },
    container2: {
      width: "100%",
      paddingTop: 50,
      paddingBottom: 0,
      alignItems: "center",
    },
    textContainer: {
      fontSize: 24,
      marginBottom: 5,
      position: "relative",
      top: "10%",
      alignSelf: "center",
    }
  });
  


export default ReporteAdmin;
