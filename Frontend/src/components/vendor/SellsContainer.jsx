import React, { useEffect, useState } from "react";
import Service from "../../Service/Service";
import TableVentas from "../../pages/vendor/tableVentas";
const SellsContainer = () => {
  const usuario = JSON.parse(localStorage.getItem("data_user"));
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await Service.getVendorPurchases(usuario.id);
        console.log(res.data);
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

  return (
    <>
      <div className="flex-1 h-screen  bg-gray-100 ">
        <div className="flex flex-col border-l-2 border-white w-full">
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <div className="mt-5 flex flex-col px-8">
              <div className="flex ">
                <h1 className="text-4xl font-bold text-black">MIS VENTAS</h1>
              </div>
            </div>

            <div className="w-full height-100 flex flex-wrap overflow-y-auto scrollbar-hide  justify-center mt-8 px-8">
              <table class="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead class="text-xs text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      Cliente
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Producto
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Precio Unitario
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Cantidad
                    </th>
                  </tr>
                </thead>

                {loading
                  ? null
                  : products.map((product) => (
                      <TableVentas product={product} />
                    ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SellsContainer;
