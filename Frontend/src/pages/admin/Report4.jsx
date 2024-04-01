import React, { useEffect, useState } from "react";
import { Pie } from 'react-chartjs-2';
import Service from "../../Service/Service";

const Report4 = () => {
    const [data, setData] = useState([]);
    const [labels, setLabels] = useState([]);

    useEffect(() => {
        Service.getReportUserTypes()
        .then((res) => {
            console.log(res.data);

            const userData = res.data;
            const labels = Object.keys(userData);
            const data = Object.values(userData);

            setData(data);
            setLabels(labels);
        })
        .catch((err) => {
            console.log(err)
        });
    }, []);

    return (
        <>
            <div className="w-full flex h-screen bg-gray-100 ">
                <div className="flex flex-col border-l-2 border-white w-full">
                    <div className="flex-1 overflow-y-auto scrollbar-hide">
                        <div className="mt-5 flex flex-col items-center justify-center">
                            <div className="flex items-center">
                                <h1 className="text-4xl font-bold text-black ">
                                REPORTE DE USUARIOS POR TIPO &nbsp;
                                </h1>
                            </div>
                            <div className='w-800 h-800 mt-20'>
                                <Pie 
                                    data={{
                                        labels: labels,
                                        datasets: [{
                                            label: 'Cantidad',
                                            data: data,
                                            backgroundColor: ['rgba(75, 192, 192, 0.8)', 'rgba(54, 162, 235, 0.8)', 'rgba(255, 159, 64, 0.8)'],
                                            hoverOffset: 7,
                                            hoverBackgroundColor: ['rgba(75, 192, 192, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 159, 64, 1)'],
                                        }]
                                    }}
                                    width={500}
                                    height={500}
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

export default Report4;
