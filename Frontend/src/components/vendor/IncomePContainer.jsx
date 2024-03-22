import React, { useEffect, useState } from "react";
import Service from "../../Service/Service";

const IncomeContainer = () => {
  const usuario = JSON.parse(localStorage.getItem("data_user"));

  useEffect(() => {
    
  }, []);

  return (
    <>
      <div className="flex-1 h-screen  bg-gray-100 ">
          <div className="flex flex-col border-l-2 border-white w-full">
            <div className="flex-1 overflow-y-auto scrollbar-hide">
              <div className="mt-5 flex flex-col items-center justify-center">
                <div className="flex items-center">
                  {/*Busqueda y esas cosas*/}

                  <h1 className="text-3xl font-bold text-black">
                    INGRESOS TOTALES
                  </h1>


                </div>
              </div>

              <div className="flex justify-center mt-5">
                <h1 className="text-xl font-bold text-black">
                  
                </h1>
              </div>
              <div className="w-full height-100 flex flex-wrap overflow-y-auto scrollbar-hide  justify-center mt-8">
            
              </div>
            </div>
          </div>
      </div>
    </>
  );
};
export default IncomeContainer;
