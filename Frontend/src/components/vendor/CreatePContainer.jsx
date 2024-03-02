import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Service from "../../Service/Service";
import CreateP from "../../pages/vendor/CreateP";

const CreatePContainer = () => {
  const [product, setProduct] = useState({
    pathImage: "",
    name: "",
    description: "",
    price: "",
    stock: "",
    idUser: "65cbf0042efb66288c71e1b2",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleFormData = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);

      const response = await Service.uploadImage(formData);
      setProduct((prev) => {
        return {
          ...prev,
          pathImage: response.data.data.Location,
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response = await Service.createProduct(product);
      console.log(response);
      if (response.message === "Product created successfully") {
        toast.success("Producto Guardado Correctamente", {
          position: "upper-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

      setProduct({
        pathImage: "",
        name: "",
        description: "",
        price: "",
        stock: "",
        idUser: "65cbf0042efb66288c71e1b2",
      });

      setTimeout(() => {
        window.location.reload();
      }
      , 1000);


    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="h-5/6 w-full overflow-y-auto bg-gray-100 ">
      <Toaster />
        <div className="justify-center items-center flex-1 overflow-x-hidden overflow-y-auto outline-none focus:outline-none ">
          <div className="flex justify-center items-center w-full border-white border-l-2 ">
            <div className=" relative w-7/12 my-6 mx-auto ">
              {/*content*/}
              <div className="border-2 rounded-r-lg shadow-lg relative flex flex-col w-full bg-gray-200 outline-silver border-black/75">
                {/*header*/}
                <div className=" flex text-black items-start justify-between p-5 border-b border-solid border-white rounded-t">
                  <h3 className="text-2xl font-semibold inline-flex items-center">
                    Registrar un nuevo producto
                  </h3>
                </div>
                {/*body*/}
                <CreateP
                  product={product}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  handleFormData={handleFormData}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePContainer;
