import React from "react";
import { useState, useEffect } from "react";
import Sidebar from "../../Navigation/Sidebar";
import ViewP from "../../pages/general/ViewP";
<<<<<<< HEAD
import Service from "../../Service/Service";

=======
import FormEditP from "../../pages/general/FormEditP";
>>>>>>> feature#ABCO
const ViewPContainer = () => {
  
  const [loading, setLoading] = useState(true);
  const usuario = JSON.parse(localStorage.getItem("data_user"));
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    password: "",
    cui: 0,
    role: 0,
    verified: "",
    birthday: "2021-10-10",
    pathImage: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await Service.getUser(usuario.id);
        console.log(res.data);

        //parse date:
        const fecha = new Date(res.data.birthday);
        let formattedDate = fecha.toLocaleDateString("es-ES", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
        
        const tempDate = formattedDate.split("/");
        formattedDate = tempDate[2] + "-" + tempDate[0] + "-" + tempDate[1];



        res.data.birthday = formattedDate;

        console.log(res.data.birthday);

        setProfile(res.data)

        
        setLoading(false);
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [loading]);


  return (
    <>


      <div className="h-screen w-full overflow-y-auto bg-gray-100 ">
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto outline-none focus:outline-none ">
          <div className="flex justify-center items-center w-full border-white border-l-2 ">
            <div className=" relative w-7/12 my-6 mx-auto ">
              {/*content*/}
              <div className="border-2 rounded-r-lg shadow-lg relative flex flex-col w-full bg-gray-200 outline-silver border-black/75">
                {/*header*/}
                <div className=" flex text-black items-start justify-between p-5 border-b border-solid border-white rounded-t">
                  <h3 className="text-2xl font-semibold inline-flex items-center">
                    PERFIL
                  </h3>
                </div>
                {/*body*/}

                {
                  loading ?(null) : (<ViewP perfil={profile} />)
                }
                <div className="flex items-center justify-end p-1 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-black bg-green-500 hover:bg-green-900 transition duration-300 ease-in-out rounded font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                  >
                    Editar
                  </button>
                </div>
                {/*footer*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ViewPContainer;
