import React, { useEffect } from "react";
import { useNavigate } from "react-router";

const ReportContainer = () => {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("data_user"));

  useEffect(() => {}, []);

  return (
    <>
      <div className="w-full flex h-screen flex bg-gray-100 ">
        <div className="flex flex-col border-l-2 border-white w-full">
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <div className="mt-5 flex flex-col items-center justify-center">
              <div className="flex items-center">
                <h1 className="text-3xl font-bold text-black">
                  REPORTES DISPONIBLES &nbsp;
                </h1>
              </div>
            </div>

            <div className="w-full height-100 flex  flex-wrap gap-4 justify-center mt-8">
              {/*INICIO CARD*/}
              <div className="h-auto max-w-xs bg-white shadow-lg shadow-gray-500/50 rounded-lg overflow-hidden transition-all ease-out duration-300 hover:scale-105 p-2 m-3 flex flex-col items-center">
                <div className="flex items-center justify-center">
                  <img
                    src="https://static8.depositphotos.com/1283676/851/i/950/depositphotos_8515005-stock-photo-money-calendar.jpg"
                    alt="Imagen de Perfil"
                    className="w-64 h-64 rounded-lg object-contain object-center border-2 border-gray-300 bg-gray-200"
                  />
                </div>
                <div className="flex items-center justify-center py-4">
                  <h1 className="text-xl font-semibold text-gray-800 text-center">
                    Reporte de Ventas en un rango determinado
                  </h1>
                </div>

                <div className="flex items-center justify-center">
                  <div className=" flex w-[500px] justify-center items-center text-white font-bold py-2 px-4 rounded-full mx-1">
                    <button
                      className="m-2 bg-[#007ac2] hover:bg-blue-800 transition duration-300 ease-in-out text-white font-bold py-2 px-4 rounded"
                      onClick={() => navigate("/admin/report1")}
                    >
                      Ver
                    </button>
                  </div>
                </div>
              </div>
              {/*FIN CARD*/}
              {/*INICIO CARD*/}
              <div className="h-auto max-w-xs bg-white shadow-lg shadow-gray-500/50 rounded-lg overflow-hidden transition-all ease-out duration-300 hover:scale-105 p-2 m-3 flex flex-col items-center">
                <div className="flex items-center justify-center">
                  <img
                    src="https://www.kulander.net/my-images/blog/cover/full/meodosdepa-31e530b5be69f5ebe02b.jpg"
                    alt="Imagen de Perfil"
                    className="w-64 h-64 rounded-lg object-contain object-center border-2 border-gray-300 bg-gray-200"
                  />
                </div>
                <div className="flex items-center justify-center py-4">
                  <h1 className="text-xl font-semibold text-gray-800 text-center">
                    Reporte de Métodos de Pago
                  </h1>
                </div>

                <div className="flex items-center justify-center">
                  <div className=" flex w-[500px] justify-center items-center text-white font-bold py-2 px-4 rounded-full mx-1">
                    <button
                      className="m-2 bg-[#007ac2] hover:bg-blue-800 transition duration-300 ease-in-out text-white font-bold py-2 px-4 rounded"
                      onClick={() => navigate("/admin/report2")}
                    >
                      Ver
                    </button>
                  </div>
                </div>
              </div>
              {/*FIN CARD*/}
              {/*INICIO CARD*/}
              <div className="h-auto max-w-xs bg-white shadow-lg shadow-gray-500/50 rounded-lg overflow-hidden transition-all ease-out duration-300 hover:scale-105 p-2 m-3 flex flex-col items-center">
                <div className="flex items-center justify-center">
                  <img
                    src="https://media.istockphoto.com/id/1367691681/vector/five-star-rating-vector-in-paper-cut-style-design-isolated-on-grey-background-feedback.jpg?s=612x612&w=0&k=20&c=G9InAZmZqq7_rpmPyCkVqngtTix5N2AZpjmxvhrtrbc="
                    alt="Imagen de Perfil"
                    className="w-64 h-64 rounded-lg object-contain object-center border-2 border-gray-300 bg-gray-200"
                  />
                </div>
                <div className="flex items-center justify-center py-4">
                  <h1 className="text-xl font-semibold text-gray-800 text-center">
                    Reporte de Calidad de Productos
                  </h1>
                </div>

                <div className="flex items-center justify-center">
                  <div className=" flex w-[500px] justify-center items-center text-white font-bold py-2 px-4 rounded-full mx-1">
                    <button
                      className="m-2 bg-[#007ac2] hover:bg-blue-800 transition duration-300 ease-in-out text-white font-bold py-2 px-4 rounded"
                      onClick={() => navigate("/admin/report3")}
                    >
                      Ver
                    </button>
                  </div>
                </div>
              </div>
              {/*FIN CARD*/}
              {/*INICIO CARD*/}
              <div className="h-auto max-w-xs bg-white shadow-lg shadow-gray-500/50 rounded-lg overflow-hidden transition-all ease-out duration-300 hover:scale-105 p-2 m-3 flex flex-col items-center">
                <div className="flex items-center justify-center">
                  <img
                    src="https://chuchesllami.com/cdn/shop/collections/top_ventas_420x.png?v=1657465467"
                    alt="Imagen de Perfil"
                    className="w-64 h-64 rounded-lg object-contain object-center border-2 border-gray-300 bg-gray-200"
                  />
                </div>
                <div className="flex items-center justify-center py-4">
                  <h1 className="text-xl font-semibold text-gray-800 text-center">
                    Reporte de Top 10 Vendedores
                  </h1>
                </div>

                <div className="flex items-center justify-center">
                  <div className=" flex w-[500px] justify-center items-center text-white font-bold py-2 px-4 rounded-full mx-1">
                    <button
                      className="m-2 bg-[#007ac2] hover:bg-blue-800 transition duration-300 ease-in-out text-white font-bold py-2 px-4 rounded"
                      onClick={() => navigate("/admin/report5")}
                    >
                      Ver
                    </button>
                  </div>
                </div>
              </div>
              {/*FIN CARD*/}




            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ReportContainer;
