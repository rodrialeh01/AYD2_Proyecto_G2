import React from "react";

const ListP = ({product, key, changeShowModal} ) => {

  const handleClick = () => {
    changeShowModal(product);
  }


  return (
    <div className="h-auto w-1/3 max-w-xs bg-white shadow-lg shadow-purple/50 rounded-lg overflow-hidden transition-all ease-out duration-300 hover:scale-105 p-2 m-3">
      <div className="flex items-center justify-center">
        <img
          src={{product}.product.pathImage}
          alt="Imagen del producto"
          className="object-contain w-48 h-48 rounded-lg"
        />
      </div>
      <div className="flex items-center justify-center">
        <div className="p-4 flex">
          <h1 className="text-xl font-semibold text-gray-800"></h1>
          <h1 className="text-xl font-semibold text-gray-800">
          {{product}.product.name}
          </h1>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="p-2">
          <h1 className="text-sm text-gray-800 ">
          {{product}.product.description}
          </h1>
        </div>
      </div>
      <div className="flex">
        <div className="p-2">
          <div className="flex">
            <h1 className="text-sm text-gray-800 font-semibold">PRECIO:</h1>
            <h1 className="text-sm text-gray-800 italic">
              &nbsp; Q {{product}.product.price}
            </h1>
          </div>
          <div className="flex">
          <h1 className="text-sm text-gray-800 font-semibold">
            CANTIDAD DISPONIBLE:
          </h1>
            <h1 className="text-sm text-gray-800 italic">
              &nbsp; {{product}.product.stock}
            </h1>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className=" flex w-20 justify-center items-center text-white font-bold py-2 px-4 rounded-full mx-1">
          <button className="bg-yellow-500 hover:bg-yellow-700 transition duration-300 text-white font-bold py-2 px-4 rounded"
            
            onClick={() => handleClick()} 
          >
            Editar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListP;
