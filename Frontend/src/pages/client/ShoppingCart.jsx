import React, { useEffect, useState } from "react";
import ProductCart from "../../components/client/ProductCart";
import Summary from "../../components/client/Summary";
import { useCarrito } from "../../Context/Carrito";

const ShoppingCart = () => {
    const { carrito } = useCarrito();
    const [subTotal, setSubTotal] = useState(0);

    useEffect(() => {
        const totalxd = (carrito.reduce((total, item) => {
            return total + (item.precio_producto * item.cantidad_producto);
        },0));

        setSubTotal(totalxd);
    }, [carrito]);

    return (
        <>
            <div className="flex justify-center w-full">
            <div className="w-full">
                <div className="w-full z-10 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700" id="checkout">
                    <div className="flex md:flex-row flex-col justify-center" id="cart">
                        {/* Contenido del carrito (3/4 del ancho) */}
                        <div className="lg:w-3/4 w-3/4 md:pl-10 pl-4 pr-10 md:pr-4 md:py-12 py-8 bg-white overflow-y-auto overflow-x-hidden h-screen" id="scroll">
                            <p className="text-5xl font-bold leading-10 text-gray-800 pt-3"
                            data-test-id="cypress-title-cart"
                            >Mi Carrito</p>
                            {/* Producto */}
                            {carrito.map((producto, index) => {
                                return(
                                    <ProductCart producto={producto} key={index}/>
                                );
                            })}
                        </div>
                        <div className="w-1/4 bg-relightPurple h-full">
                            <Summary subtotal={subTotal}/>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </>
    );
}

export default ShoppingCart;