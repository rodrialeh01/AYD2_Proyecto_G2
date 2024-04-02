import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import Service from "../../Service/Service";

const SignUp = () => {
  const [rolSelect, setRolSelect] = useState(0);
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    cui: "",
    verified: 1,
    birthday: "",
    role: 1,
    pathImage: "",
  });

  const handleFormData = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);

      const response = await Service.uploadProfileImage(formData);
      console.log(response);
      setInput((prev) => {
        return {
          ...prev,
          pathImage: response.data.data.image,
        };
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleInputChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const handleSelect = (value) => {
    setRolSelect(value);
  };

  const parseDate = (inputDate) => {
    const date = new Date(inputDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    return `${day}/${month}/${year}`;
  };

  const options = [
    { value: 1, label: "Cliente" },
    { value: 2, label: "Vendedor" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input.birthday);
    input.birthday = new Date(input.birthday);
    input.role = rolSelect;
    console.log(input);
    Service.registrarUsuario(input)
      .then((response) => {
        console.log(response);
        toast.success("Registro exitoso, verifique su correo", {
          position: "upper-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setTimeout(() => {
          navigate("/");
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error al registrar usuario", {
          position: "upper-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <>
      <Toaster />
      <div className="h-screen md:flex font bg-lightPurple">
        <div
          className="fuente3 relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-verde1 to-verde4 i justify-around items-center hidden"
          style={{
            backgroundImage:
              "url('https://i.postimg.cc/L67f8cF5/negocio-linea-internet-concepto-compras-entrega-linea.jpg')",
            backgroundColor: "rgba(127, 63, 191, 0.7)",
            backgroundSize: "cover",
            backgroundPosition: "center right",
          }}
        >
          <div style={{ width: "400px", height: "400px" }}>
            <div className="flex items-center justify-center">
              <img
                src="https://i.postimg.cc/26qSf7dp/Copia-de-Red-Modern-Market-Logo-2.png"
                alt="logo"
                border="0"
                className="object-cover items-center flex justify-center opacity-70 animate-bounce"
              />
            </div>
          </div>
        </div>
        <div className="flex md:w-1/2 justify-center py-10 items-center bg-transparent">
          <form className="">
            <h1 className="text-yellow-400 font-bold text-4xl mb-1 ">
              <span>Bienvenido!</span>, Regístrate
            </h1>
            <p className="text-s font-semibold text-white mb-7">
              TodoCompras, el mejor lugar para comprar y vender
            </p>
            <div className="flex bg-white items-center border-2 py-2 px-3 rounded-2xl mb-4 border-purple">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                />
              </svg>

              <input
                className="pl-2 outline-none border-none bg-transparent text-gray-700 placeholder-black placeholder-opacity-50"
                type="file"
                name="pathImage"
                accept="image/*"
                id="pathImage"
                onChange={handleFormData}
                placeholder="Foto de Perfil"
                required
              />
            </div>

            <div className="flex bg-white items-center border-2 py-2 px-3 rounded-2xl mb-4 border-purple">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-verde1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>

              <input
                className="pl-2 outline-none border-none bg-transparent text-gray-700 placeholder-black placeholder-opacity-50"
                type="text"
                name="name"
                id="name"
                placeholder="Nombre"
                onChange={handleInputChange}
                required
                style={{ width: "100%" }}
              />
            </div>
            <div className="flex bg-white items-center border-2 py-2 px-3 rounded-2xl mb-4 border-purple">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-verde1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
              <input
                className="pl-2 outline-none border-none bg-transparent text-gray-700 placeholder-black placeholder-opacity-50"
                type="email"
                name="email"
                id="email"
                onChange={handleInputChange}
                placeholder="Correo Electrónico"
                required
                style={{ width: "100%" }}
              />
            </div>
            <div className="flex bg-white items-center border-2 py-2 px-3 rounded-2xl mb-4 border-purple">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-verde1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>

              <input
                className="pl-2 outline-none border-none bg-transparent text-gray-700 placeholder-black placeholder-opacity-50"
                type="password"
                name="password"
                id="password"
                onChange={handleInputChange}
                placeholder="Contraseña"
                required
              />
            </div>
            <div className="flex bg-white items-center border-2 py-2 px-3 rounded-2xl mb-4 border-purple">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-verde1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
              <input
                className="pl-2 outline-none border-none bg-transparent text-gray-700 placeholder-black placeholder-opacity-50"
                type="text"
                name="cui"
                id="cui"
                onChange={handleInputChange}
                placeholder="CUI"
                required
              />
            </div>
            <div className="flex bg-white items-center border-2 py-2 px-3  rounded-2xl mb-4 border-purple">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-verde1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                />
              </svg>

              <input
                className="pl-2 outline-none border-none bg-transparent text-gray-700 "
                type="date"
                name="birthday"
                id="birthday"
                onChange={handleInputChange}
                placeholder="fecha_nacimiento"
                required
              />
            </div>

            <div className="flex bg-white items-center border-purple border-2 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-verde1 ml-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>

              <Select
                className="py-2 px-3 rounded-2xl w-full"
                classNamePrefix="select"
                defaultValue={options[0]}
                name="rol"
                id="rol"
                options={options}
                onChange={(e) => handleSelect(e.value)}
              />
            </div>

            <button
              type="submit"
              className="block w-full bg-yellow-400 mt-4 py-2 rounded-2xl text-purple font-semibold mb-2 hover:bg-purple hover:text-yellow-400 transition duration-300 ease-in-out"
              onClick={(e) => handleSubmit(e)}
            >
              Registrar
            </button>
            <p className="mt-6 text-xs text-white text-center">
              También puedes{" "}
              <Link
                to="/"
                className="border-b border-white-500 border-dotted text-white-500 hover:text-gray-800 transition-all duration-300 ease-in-out"
              >
                Iniciar Sesion
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};
export default SignUp;
