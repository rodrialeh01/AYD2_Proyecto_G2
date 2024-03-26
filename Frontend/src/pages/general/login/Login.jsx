import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Service from "../../../Service/Service";
import { useUser } from "../../../userCtx/User";
import "./Login.css";

export default function Login() {
  const { logged, setLogged } = useUser();
  const [input, setInput] = useState({
    email_user: "",
    pass_user: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    console.log(logged)
    if (logged) {
      if (JSON.parse(localStorage.getItem("data_user")).rol === 2){
        navigate("/vendor/myproducts");
      }else if(JSON.parse(localStorage.getItem("data_user")).rol === 1){
      navigate("/client/home");
      }else if(JSON.parse(localStorage.getItem("data_user")).rol === 3){
      navigate("/admin/users");
      }
    }
  }, [logged]);

  const handleInputChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const handleRecuperarPassword = async (event) => {
    if (input.email_user === "") {
      toast.error("El campo de correo es obligatorio");
      return;
    }
    try {
      const res = await Service.recuperarPassword(input.email_user);
      if (res.status === 200) {
        toast.success("Se ha enviado un correo para recuperar tu contraseña", {
          position: "bottom-right",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error al recuperar contraseña");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // validacion de campos vacios
    if (input.email_user === "" || input.pass_user === "") {
      toast.error("Todos los campos son obligatorios");
      return;
    }

    try {
      let data = {
        email: input.email_user,
        password: input.pass_user,
      }
      const res = await Service.login(data);
      console.log(res);
      if (res.status === 200) {
        const savedData = {
          id: res.data.data.id,
          rol: res.data.data.rol,
        };
        console.log(savedData)
        localStorage.setItem("data_user", JSON.stringify(savedData));
        localStorage.setItem("carrito_user", JSON.stringify([]));
        setLogged(true);
        toast.success("Inicio de sesión exitoso", {
          position: "bottom-right",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
       setTimeout(() => {
          if (res.data.data.role === 2) {
            navigate("/vendor/myproducts");
          } else if(res.data.data.role === 1) {
            navigate("/client/home");
          } else if(res.data.data.role === 3){
            navigate("/admin/users");
          }
        }, 500);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error al iniciar sesión");
    }
  };

  return (
    <>
  {/* <Toaster  /> */}
  {/* toaster en la parte inferior derecha */}
  <Toaster
    position="bottom-right"
    reverseOrder={false}
    gutter={8}
  />
  <div className="h-full bg-gradient-to-t from-[#17124a] to-[#281e96]">
    <div className="min-h-screen text-black loginbg flex items-center justify-center p-6 lg:p-12">
      <div className="max-w-screen w-full lg:max-w-[1000px] bg-[#E9ECEE] shadow-2xl rounded-lg flex flex-1">
        <div
          className="hidden lg:flex lg:w-1/2 bg-contain bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://i.postimg.cc/prcbCp12/Red-Modern-Market-Logo-1.png')",
            backgroundSize: "cover",
            backgroundPosition: "upper",
            
          }}
        ></div>

        <div className="lg:w-1/2 p-6 sm:p-12">
          <form className="w-full max-w-md">
            <div className="flex items-center justify-center">
              <div style={{ width: "150px", height: "150px" }}>
                <img
                  src="https://i.postimg.cc/wxbtt34T/Copia-de-Red-Modern-Market-Logo-1.png"
                  alt="animal-care"
                  className=" animate-bounce"
                  border="0"
                />
              </div>
            </div>
            <div className="mt-8 flex flex-col items-center">
              <h1 className="text-2xl xl:text-3xl font-bold" data-test-id="cypress-header-login">
                Inicia Sesión
              </h1>
              <div className="w-full mt-8">
                <input
                  data-test-id="cypress-email-login"
                  className="w-full px-4 py-3 rounded-lg font-medium text-black bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="Email"
                  id="email_user"
                  name="email_user"
                  onChange={handleInputChange}
                />
                <input
                  className="w-full mt-5 px-4 py-3 rounded-lg font-medium text-black bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  data-test-id="cypress-password-login"
                  type="password"
                  placeholder="Contraseña"
                  id="pass_user"
                  name="pass_user"
                  onChange={handleInputChange}
                />
                <button
                  className="mt-5 tracking-wide font-semibold bg-purple text-black w-full py-3 rounded-lg hover:bg-hoverPurple transition-all duration-300 ease-in-out focus:shadow-outline focus:outline-none"
                  type="button"
                  data-test-id="cypress-button-login"
                  onClick={(e) => handleSubmit(e)}
                >
                  <span className="ml-3">Iniciar Sesión</span>
                </button>
                <p className="mt-6 text-xs text-black text-center">
                  Si no tienes una cuenta,{" "}
                  <Link
                    to="/signup"
                    className="border-b border-azul4 border-dotted text-blue-500 hover:text-blue-800 transition-all duration-300 ease-in-out"
                  >
                    Registrate Aqui
                  </Link>
                </p>
                {/*Recuperar password, ejecutando handle para mandar un correo*/}
                <p className="mt-6 text-xs text-black text-center">
                  <Link
                    className="border-b border-azul4 border-dotted text-blue-500 hover:text-blue-800 transition-all duration-300 ease-in-out"
                    onClick={(e) => handleRecuperarPassword(e)}
                  >
                    Recuperar contraseña
                  </Link>
                </p>
                


              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</>

  );
}
