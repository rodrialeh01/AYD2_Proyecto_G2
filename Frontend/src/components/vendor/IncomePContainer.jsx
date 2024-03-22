import React, { useEffect, useState } from "react";
import Service from "../../Service/Service";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

import Income from "../../pages/vendor/Income";

const IncomeContainer = () => {
  const usuario = JSON.parse(localStorage.getItem("data_user"));
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState({
    labels: [],
    datasets: [],
  });

  const [productos, setProductos] = useState([]);

  const [total, setTotal] = useState(0.0);
  useEffect(() => {
    const getIncome = async () => {
      let response = await Service.getIngresos(usuario.id);
      console.log(response.data);
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

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };
    getIncome();
  }, []);

  return (
    <>
      <div className="flex-1 h-screen bg-gray-100">
        <div className="flex flex-col border-l-2 border-white w-full">
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <div className="mt-5 flex flex-col items-center justify-center">
              <div className="flex items-center justify-between w-full px-5">
                <h1 className="text-4xl font-bold text-black px-8">
                  INGRESOS TOTALES
                </h1>
                <h1 className="text-4xl font-bold text-black px-8">
                  Q {total}
                </h1>
              </div>
            </div>

            <div className="flex justify-center mt-5">
              <h1 className="text-xl font-bold text-black"></h1>
            </div>
            <div className="w-full min-h-1/2 xl:max-h-[600px] flex flex-wrap overflow-y-auto scrollbar-hide justify-center mt-8">
              {loading ? null : <Income data={data} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default IncomeContainer;
