import React, { useEffect, useState } from "react";
import Service from "../../Service/Service";
import { useNavigate } from "react-router";

const InfoContainer = () => {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("data_user"));

  useEffect(() => {

  }, []);

  return (
    <>
      <div className="w-full flex h-screen flex bg-gray-100 ">
        <div className="flex flex-col border-l-2 border-white w-full">
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <div className="mt-5 flex flex-col items-center justify-center">
              <div className="flex items-center">
                {/*Busqueda y esas cosas*/}

                <h1 className="text-3xl font-bold text-black">
                  INFORMACIÓN &nbsp;
                </h1>
              </div>
            </div>

            <div className="flex justify-center mt-5">
              <h1 className="text-xl font-semibold text-[#040e5f] italic">
                {" "}
                Seleccione la consulta a realizar:{" "}
              </h1>
            </div>

            <div className="w-full height-100  flex  flex-wrap gap-4 justify-center mt-8">
              <div className="h-auto max-w-xs bg-white shadow-lg shadow-gray-500/50 rounded-lg overflow-hidden transition-all ease-out duration-300 hover:scale-105 p-2 m-3 flex flex-col items-center">
                <div className="flex items-center justify-center">
                  <img
                    src="https://media.istockphoto.com/id/1316693862/photo/view-at-financial-details-in-table-thru-magnifying-glass.jpg?s=612x612&w=0&k=20&c=4JhUiM5vnV3UaBigm186FbVD3PLptA8INRyxltHaKCQ="
                    alt="Imagen de Perfil"
                    className="w-64 h-64 rounded-lg object-contain object-center border-2 border-gray-300 bg-gray-200"
                  />
                </div>
                <div className="flex items-center justify-center py-4">
                  <h1 className="text-xl font-semibold text-gray-800 text-center">
                    Vista de Ingresos
                  </h1>
                </div>

                <div className="flex items-center justify-center">
                  <div className=" flex w-[500px] justify-center items-center text-white font-bold py-2 px-4 rounded-full mx-1">
                    <button className="m-2 bg-[#007ac2] hover:bg-blue-800 transition duration-300 ease-in-out text-white font-bold py-2 px-4 rounded"
                    onClick={() => navigate("/vendor/ingresos")}
                    >
                      Ver
                    </button>
                  </div>
                </div>
              </div>
              <div className="h-auto max-w-xs bg-white shadow-lg shadow-gray-500/50 rounded-lg overflow-hidden transition-all ease-out duration-300 hover:scale-105 p-2 m-3 flex flex-col items-center">
                <div className="flex items-center justify-center">
                  <img
                    src="https://media.istockphoto.com/id/1385092602/photo/business-team-meeting-and-discussing-to-audit-financial-planning-sales-financial-advisor.jpg?s=612x612&w=0&k=20&c=RXe5tg_7RHHnDFThWDTd6_0IYFflqg5qG30cklyKDcQ="
                    alt="Imagen de Perfil"
                    className="w-64 h-64 rounded-lg object-contain object-center border-2 border-gray-300 bg-gray-200"
                  />
                </div>
                <div className="flex items-center justify-center py-4">
                  <h1 className="text-xl font-semibold text-gray-800 text-center">
                    Vista de Ventas
                  </h1>
                </div>

                <div className="flex items-center justify-center">
                  <div className=" flex w-[500px] justify-center items-center text-white font-bold py-2 px-4 rounded-full mx-1">
                    <button className="m-2 bg-[#007ac2] hover:bg-blue-800 transition duration-300 ease-in-out text-white font-bold py-2 px-4 rounded"
                    onClick={() => navigate("/vendor/ventas")}
                    >
                      Ver
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default InfoContainer;
