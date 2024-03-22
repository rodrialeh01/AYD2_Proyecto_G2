import React, { useEffect, useState } from "react";
import Service from "../../Service/Service";
import { useNavigate } from "react-router";
import Report1 from "../../pages/admin/Report1";

const Report1Container = () => {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("data_user"));
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fechaInicial, setFechaInicial] = useState("");
  const [fechaFinal, setFechaFinal] = useState("");

  useEffect(() => {}, []);

  const handleSearch = async () => {
    if (fechaInicial === "" || fechaFinal === "") {
      setLoading(true);
      alert("Por favor, llene todos los campos");
      return;
    }

    const data = await Service.getReport1(fechaInicial, fechaFinal);
    setProducts(data.data);
    setTimeout(() => {
        setLoading(false);
      }, 1000);

    
  };

  return (
    <>
      <div className="w-full flex h-screen flex bg-gray-100 ">
        <div className="flex flex-col border-l-2 border-white w-full">
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <div className="mt-5 flex flex-col items-center justify-center">
              <div className="flex items-center">
                <h1 className="text-4xl font-bold text-black">
                  REPORTES DE VENTAS EN UN RANGO DETERMINADO &nbsp;
                </h1>
              </div>
            </div>

            <div className="mt-5 flex flex-col items-center justify-center">
              <div className="flex items-center justify-between w-full px-5">
                <h1 className="text-xl text-black px-8">
                  Fecha Inicial
                  <input
                    type="date"
                    className="border-2 border-gray-300 rounded-lg p-2 m-2"
                    onChange={(e) => {
                      setFechaInicial(e.target.value);
                    }}
                  />
                </h1>
                <button
                  className="text-black bg-green-500 hover:bg-green-900 transition duration-300 ease-in-out rounded font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="submit"
                  onClick={handleSearch}
                >
                  Buscar Ventas
                </button>
                <h1 className="text-xl text-black px-8">
                  Fecha Final
                  <input
                    type="date"
                    className="border-2 border-gray-300 rounded-lg p-2 m-2"
                    onChange={(e) => {
                      setFechaFinal(e.target.value);
                    }}
                  />
                </h1>
              </div>
            </div>

            <div className="w-full height-100 flex flex-wrap overflow-y-auto scrollbar-hide  justify-center mt-8 px-8">
              <table class="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead class="text-xs text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      Cliente
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Producto
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Precio Unitario
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Cantidad
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Vendedor
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Fecha
                    </th>
                  </tr>
                </thead>

                {loading ? (null) : 

                  (
                    products.map((product) => (
                      <Report1 product={product} />
                    ))
                  )

                }
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Report1Container;
