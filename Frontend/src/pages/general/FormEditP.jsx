import React from "react";

const FormEditP = ({ perfil, handleChange, handleSubmit, handleClose, handleFormData }) => {
  return (
    <>
      <>
        <div className="shadow-[0_2px_15px_-3px_rgba(255,255,255.07),0_10px_20px_-2px_rgba(255,255,255,0.04)] justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
          <div className=" relative w-7/12 my-6 mx-auto">
            {/*content*/}
            <div className="border-2 rounded-r-lg shadow-lg relative flex flex-col w-full bg-gray-200 outline-silver border-black/75">
              {/*header*/}
              <div className=" flex text-black items-start justify-between p-5 border-b border-solid border-purple rounded-t">
                <h3 className="text-2xl font-semibold"></h3>
                <button
                  className="p-1 ml-auto text-dark  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => {
                    handleClose();
                  }}
                >
                  <span className=" text-red-500  h-6 w-6 text-2xl block outline-none focus:outline-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 22 22"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                </button>
              </div>
              {/*body*/}
              <form 
                onSubmit={handleSubmit}
              >
                <div className="relative p-6 flex-auto">
                  <div class="w-full ">
                    <div class="md:flex md:items-center mb-6">
                      <div class="">
                        <label
                          class="block text-black font-bold md:text-left mb-1 md:mb-0 pr-4"
                          for="inline-full-name"
                        >
                          Nombre:
                        </label>
                      </div>
                      <div class="w-full mr-[250px]">
                        <input
                          class="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="inline-full-name"
                          type="text"
                          required
                          name="name"
                          defaultValue={{ perfil }.perfil.name}
                          onChange={handleChange}
                        ></input>
                      </div>
                    </div>

                    <div class="md:flex md:items-center mb-6">
                      <div class="">
                        <label
                          class="block text-black font-bold md:text-left mb-1 md:mb-0 pr-4"
                          for="inline-full-name"
                        >
                          Correo:
                        </label>
                      </div>
                      <div class="w-full mr-[50px]">
                        <input
                          class="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="inline-full-name"
                          type="text"
                          name="email"
                          defaultValue={{ perfil }.perfil.email}
                          onChange={handleChange}
                        ></input>
                      </div>
                    </div>

                    <div class="md:flex md:items-center mb-6">
                      <div class="">
                        <label
                          class="block text-black font-bold md:text-left mb-1 md:mb-0 pr-4"
                          for="inline-full-name"
                        >
                          CUI:
                        </label>
                      </div>
                      <div class="w-full mr-[220px]">
                        <input
                          class="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="inline-full-name"
                          type="number"
                          name="cui"
                          defaultValue={{ perfil }.perfil.cui}
                          disabled
                        ></input>
                      </div>
                      <div class="">
                        <label
                          class="block text-black font-bold md:text-left mb-1 md:mb-0 pr-4"
                          for="inline-full-name"
                        >
                          Fecha nacimiento:
                        </label>
                      </div>
                      <div class="w-full mr-[50px]">
                        <input
                          class="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="inline-full-name"
                          type="date"
                          name="birthday"
                          defaultValue={{ perfil }.perfil.birthday}
                          onChange={handleChange}
                        ></input>
                      </div>
                    </div>
                    <div className="w-full bg-gray-400 items-center justify-center">
                    <div class=" w-full p-5 rounded-xl z-10">
                        <div class="grid grid-cols-1 space-y-2">
                        <label class="text-sm font-bold text-gray-500 tracking-wide">
                            Actualiza la imagen
                        </label>
                        <input
                            className="mt-6 text-black rounded-lg bg-purple"
                            type="file"
                            name="pathImage"
                            onChange={handleFormData}
                            accept="image/*" // Accept only image files
                        />
                        </div>
                    </div>
                    </div>
                    <button
                      type="submit"
                      class="text-black bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                      Guardar
                    </button>
                  </div>
                </div>
              </form>
              {/*footer*/}
              <div className="flex items-center justify-end p-1 border-t border-solid border-slate-500 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => {
                    handleClose();
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    </>
  );
};

export default FormEditP;