import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js';

import React, { useEffect, useState } from "react";
import { Bar } from 'react-chartjs-2';
import Service from "../../Service/Service";

const Report5 = () => {
    const [data, setData] = useState({}); // Estado para almacenar los datos del gráfico

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    useEffect(() => {
        Service.getTop10Sellers()
            .then((res) => {
                console.log(res.data); // Imprimimos los datos obtenidos de la respuesta
                //Pasar a array de strings 

                const dt = res.data;

                const labels = dt.map((obj) => {
                    return obj.vendorName;
                });
                console.log(labels);

                const quantities = dt.map((obj) => {
                    return obj.quantity;
                });
                console.log(quantities);

                // Creamos un objeto con los datos obtenidos
                const data = {
                    labels: labels, // Obtenemos el nombre de los vendedores
                    datasets: [
                        {
                            label: 'Ventas',
                            data: quantities, // Obtenemos las ventas de los vendedores
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1,
                        },
                    ],
                };

                setData(data); // Actualizamos el estado con los datos obtenidos

            })
            .catch((err) => {
                console.error('Error al obtener los datos:', err);
            });
    }, []);

    return (
        <>
            <div className="w-full flex h-screen bg-gray-100 ">
                <div className="flex flex-col border-l-2 border-white w-full">
                    <div className="flex-1 overflow-y-auto scrollbar-hide">
                        <div className="p-8 bg-white">
                            <h1 className="text-2xl font-bold text-gray-800">Top 10 Vendedores</h1>
                            <div className="mt-4">
                                {Object.keys(data).length > 0 && <Bar data={data} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
    
}

export default Report5;
