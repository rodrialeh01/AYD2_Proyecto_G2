import React from "react";

const FormEditP = ({ product, handleChange, handleSubmit }) => {
  return (
    <>
      <form>
        <div className="flex items-center justify-center p-5 rounded-t bg-silver">
          <img
            className="object-contain w-32 h-32 border border-8 border-dashed "
            src={product.pathImage}
            alt="preview"
          ></img>
        </div>

        <div className="relative p-6 flex-auto">
          <div className="w-full ">
            <div className="md:flex md:items-center mb-6">
              <div className="">
                <label
                  className="block text-black font-bold md:text-left mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-name"
                >
                  Carga la imagen:
                </label>
              </div>
              <div className="w-full mr-[250px]">
                <input
                  data-test-id="cypress-input-petName"
                  className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-full-name"
                  type="file"
                  name="pathImage"
                  onChange={handleChange}
                  required
                ></input>
              </div>
            </div>

            <div className="md:flex md:items-center mb-6">
              <div className="">
                <label
                  className="block text-black font-bold md:text-left mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-name"
                >
                  Nombre:
                </label>
              </div>
              <div className="w-full mr-[250px]">
                <input
                  data-test-id="cypress-input-petName"
                  className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-full-name"
                  type="text"
                  name="name"
                  onChange={handleChange}
                  required
                ></input>
              </div>
            </div>

            <div className="columns-2 gap-1">
              <div className="md:flex md:items-center mb-6">
                <div className="">
                  <label
                    className="block text-black font-bold md:text-left mb-1 md:mb-0 pr-4"
                    htmlFor="inline-full-name"
                  >
                    Precio (Q):
                  </label>
                </div>
                <div className="w-full mr-[50px]">
                  <input
                    className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="inline-full-name"
                    type="number"
                    name="price"
                    onChange={handleChange}
                    required
                  ></input>
                </div>
              </div>
              <div className="md:flex md:items-center mb-6">
                <div className="">
                  <label
                    className="block text-black font-bold md:text-left mb-1 md:mb-0 pr-4"
                    htmlFor="inline-full-name"
                  >
                    Cantidad Disponible:
                  </label>
                </div>
                <div className="w-full mr-[50px]">
                  <input
                    className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="inline-full-name"
                    type="number"
                    name="stock"
                    onChange={handleChange}
                    required
                  ></input>
                </div>
              </div>
            </div>
            <label
              className="block text-black font-bold md:text-left mb-1 md:mb-2 pr-4"
              htmlFor="inline-full-name"
            >
              Descripción:
            </label>
            <div className="md:flex md:items-center mb-6">
              <div className=""></div>
              <div className="w-full ">
                <textarea
                  data-test-id="cypress-input-extraComments"
                  className="bg-white appearance-none h-20 overflow-y-auto border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-full-name"
                  type="text"
                  name="description"
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        {/*footer*/}

        <div className="flex items-center justify-end p-1 border-t border-solid border-slate-200 rounded-b">
          <button
            className="text-black bg-green-500 hover:bg-green-900 transition duration-300 ease-in-out rounded font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="submit"
            onClick={handleSubmit}
          >
            Guardar
          </button>
        </div>
      </form>
    </>
  );
};

export default FormEditP;
