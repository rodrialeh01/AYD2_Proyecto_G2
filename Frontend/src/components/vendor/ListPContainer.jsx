import React, { useState, useEffect } from "react";
import ListP from "../../pages/vendor/ListP";
import Sidebar from "../../Navigation/Sidebar";
import Service from "../../Service/Service";

const ListPContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await Service.getProducts("65cbf0042efb66288c71e1b2");
        console.log(res.data);
        setProducts(res.data);

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [loading]);



  return (
    <>
      <div className="flex h-screen flex bg-gray-100 ">
        <Sidebar />

        {loading ? null : (
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
                  <ListP product={product} key={product._id} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default ListPContainer;
