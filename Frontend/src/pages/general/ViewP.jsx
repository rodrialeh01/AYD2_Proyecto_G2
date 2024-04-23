import react from "react";

const ViewP = ({ perfil }) => {
  return (
    <>
      <form>
        <div className="relative flex-auto">
          <div className="w-full ">
            <div className="md:flex md:items-center mb-6">
              <div className="w-full">
                <div className="flex items-center justify-center bg-gray-300 py-6">
                  <img
                    src={{ perfil }.perfil.pathImage}
                    alt="Imagen del usuario"
                    className="object-contain w-48 h-48 rounded-lg"
                  />
                </div>
              </div>
            </div>
            <div className="md:flex md:items-center mb-6 px-6">
              <div className="">
                <label
                  className="block text-black font-bold md:text-left mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-name"
                >
                  Nombre:
                </label>
              </div>
              <div className="w-full mr-[150px]">
                <input
                  className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-full-name"
                  type="text"
                  name="name"
                  defaultValue={perfil.name}
                  disabled
                ></input>
              </div>
            </div>

            <div className="md:flex md:items-center mb-6 px-6">
              <div className="">
                <label
                  className="block text-black font-bold md:text-left mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-name"
                >
                  Correo:
                </label>
              </div>
              <div className="w-full mr-[150px]">
                <input
                  className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-full-name"
                  type="text"
                  name="email"
                  defaultValue={perfil.email}
                  disabled
                ></input>
              </div>
            </div>
            <div className="md:flex md:items-center mb-6 px-6">
              <div className="">
                <label
                  className="block text-black font-bold md:text-left mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-name"
                >
                  CUI:
                </label>
              </div>
              <div className="w-full mr-[150px]">
                <input
                  className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-full-name"
                  type="number"
                  name="cui"
                  defaultValue={perfil.cui}
                  disabled
                ></input>
              </div>
            </div>

            <div className="md:flex md:items-center mb-6 px-6">
              <div className="">
                <label
                  className="block text-black font-bold md:text-left mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-name"
                >
                  Fecha de nacimiento:
                </label>
              </div>
              <div className="w-full mr-[150px]">
                <input
                  className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-full-name"
                  type="date"
                  name="birthday"
                  defaultValue={perfil.birthday}
                  disabled
                ></input>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ViewP;
