import React, { useEffect, useState } from "react";
import Service from "../../Service/Service";
import FormEditP from "../../pages/vendor/FormEditP";
import ListP from "../../pages/vendor/ListP";

const ListPContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentProduct, setCurrentProduct] = useState({
    currentProduct: {},
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await Service.getProducts("65cbf0042efb66288c71e1b2");
        console.log(res.data);
        console.log(res.data[0].pathImage);
        setProducts(res.data);

        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [loading]);

  const changeShowModal = (product) => {
    setCurrentProduct(product);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  }

  const handleFormData = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);

      const response = await Service.uploadImage(formData);
      setCurrentProduct((prev) => {
        return {
          ...prev,
          pathImage: response.data.data.Location,
        };
      });
    } catch (error) {
      console.log(error);
    }
    
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct({ ...currentProduct, [name]: value });

    console.log(currentProduct);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(currentProduct);
    try {
      let res = await Service.editProduct(currentProduct._id, currentProduct);

      setShowModal(false);
      setLoading(true);
    } catch (error) {
      console.log(error);
    }
  }

  

  return (
    <>
      <div className="flex-1 h-screen  bg-gray-100 ">

        {loading ? (
          <div className="flex justify-center items-center w-full">
            <h1 className="text-3xl font-bold text-black">Cargando...</h1>
          </div>
        ) : (
          <div className="flex flex-col border-l-2 border-white w-full">
            <div className="flex-1 overflow-y-auto scrollbar-hide">
              <div className="mt-5 flex flex-col items-center justify-center">
                <div className="flex items-center">
                  {/*Busqueda y esas cosas*/}

                  <h1 className="text-3xl font-bold text-black">
                    MIS PRODUCTOS
                  </h1>
                </div>
              </div>

              <div className="flex justify-center mt-5">
                <h1 className="text-xl font-bold text-black">
                  VENDEDOR: Nombre del vendedor
                </h1>
              </div>
              <div className="w-full height-100 flex flex-wrap overflow-y-auto scrollbar-hide  justify-center mt-8">
                {products.map((product) => (
                  <ListP
                    product={product}
                    key={product._id}
                    changeShowModal={changeShowModal}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {showModal ? (
          < FormEditP product={currentProduct} handleClose={handleClose} handleChange={handleChange} handleSubmit={handleSubmit} handleFormData={handleFormData} />
        ) : null}
      </div>
    </>
  );
};
export default ListPContainer;
