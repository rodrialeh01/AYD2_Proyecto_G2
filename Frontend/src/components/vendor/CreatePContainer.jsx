import React, { useState } from "react";
import CreateP from "../../pages/vendor/CreateP";
import Sidebar from "../../Navigation/Sidebar";
const CreatePContainer = () => {
  const [product, setProduct] = useState({
    pathImage: "",
    name: "",
    description: "",
    price: "",
    stock: "",
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
    const formData = new FormData();
    formData.append("pathImage", product.pathImage);
    
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(product);
  };

  return (
    <>
      <div className="h-5/6 w-full overflow-y-auto bg-gray-100 ">
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto outline-none focus:outline-none ">
          <Sidebar />
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
