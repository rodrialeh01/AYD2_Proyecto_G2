import React, { useEffect, useState } from "react";
import { useCarrito } from "../../Context/Carrito";
const ProductCart = ({producto}) => {
    const [subTotal, setSubTotal] = useState(0);
    const { carrito, actualizarCarrito } = useCarrito();

    useEffect(() => {
        const sub = producto.precio_producto * producto.cantidad_producto;
        const nuevo_sub = Number(sub).toFixed(2);
        setSubTotal(nuevo_sub);
    }, [producto]);

    const QuitarProducto = () => {
        const nuevo_carrito = carrito.filter(item => item.id_producto !== producto.id_producto);
        console.log(nuevo_carrito);
        actualizarCarrito(nuevo_carrito)
    }

    return (
        <div className="md:flex items-center mt-6 py-3 border-t border-gray-200 bg-gray-200 max-h-80 justify-center rounded-xl">
            <div class="w-1/6 aspect-w-1 aspect-h-1 flex items-center">
                <img src={producto.pathImage} alt="" class="m-3 max-w-40 max-h-40 object-cover object-center mx-auto"/>
            </div>
            <div className="md:pl-3 md:w-5/6 ml-3">
                <div className="flex items-center justify-between w-full pt-1">
                    <p className="text-xl font-bold leading-none text-gray-800">{producto.nombre_producto}</p>
                    <p className="py-2 px-1 border-gray-200 mr-6 focus:outline-none text-2xl"><span className="font-bold">Cantidad: </span>{producto.cantidad_producto}</p>
                </div>
                <p className="text-sm leading-3 text-gray-600 pt-1">{producto.descripcion_producto}</p>
                <p className="text-sm leading-3 text-gray-600 pt-1"><span className="font-bold">Precio Unitario: </span>Q{producto.precio_producto}</p>
                <div className="flex items-center justify-between pt-3 pr-6">
                    <div className="flex items-center">
                    <button class="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded" onClick={QuitarProducto}>
                        Quitar
                    </button>
                    </div>
                    <p className="text-3xl font-base leading-none text-gray-800"><span className="font-bold">SubTotal: </span>Q{subTotal}</p>
                </div>
            </div>
        </div>
    );
}

export default ProductCart;