import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js';
import React, { useEffect, useState } from "react";
import { Pie } from 'react-chartjs-2';
import Service from "../../Service/Service";
const Report2 = () => {
    const [pagoTarjeta, setPagoTajeta] = useState(0);
    const [pagoPayPal, setPagoPayPal] = useState(0);
    ChartJS.register(ArcElement,Tooltip, Legend);
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
      );
    useEffect(() => {
        Service.getPays()
        .then((res) => {
            const arreglo = res.data;
            const [tarjeta, paypal] = arreglo.reduce((total, obj) => {
                if (obj.method === 1) {
                    total[0]++;
                } else {
                    total[1]++;
                }
                return total;
            }, [0, 0]);
            const porcentajetar = Math.round((tarjeta/arreglo.length)*100)
            const porcentajepp = 100-porcentajetar
            setPagoPayPal(porcentajepp);
            setPagoTajeta(porcentajetar);
        })
        .catch((err) => {
            console.log(err)
        });
    }, []);


    return (
        <>
            <div className="w-full flex h-screen flex bg-gray-100 ">
                <div className="flex flex-col border-l-2 border-white w-full">
                    <div className="flex-1 overflow-y-auto scrollbar-hide">
                        <div className="mt-5 flex flex-col items-center justify-center">
                            <div className="flex items-center">
                                <h1 className="text-4xl font-bold text-black">
                                REPORTES DE METODOS DE PAGO POR PRODUCTO &nbsp;
                                </h1>
                            </div>
                            <div className='w-500 h-500'>
                                <Pie 
                                    data={{
                                        labels: ['Productos pagados con Tarjeta', 'Productos Pagados con Paypal'],
                                        datasets: [{
                                            label: 'Porcentaje',
                                            data: [pagoTarjeta, pagoPayPal],
                                            backgroundColor: [
                                                'rgb(5, 128, 38)',
                                                'rgb(52, 110, 235)'
                                            ],
                                            hoverOffset: 7
                                        }]
                                    }}
                                    options={{
                                        responsive: true,
                                        plugins: {
                                            legend: {
                                                position: 'top',
                                            }
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Report2;