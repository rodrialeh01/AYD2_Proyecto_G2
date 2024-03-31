import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { useCarrito } from "../../Context/Carrito";
import { Encriptar } from "../../utils";

const Summary = ({subtotal}) => {
    const [newSubtotal, setNewSubtotal] = useState(0);
    const [agregado, setAgregado] = useState(0);
    const [total, setTotal] = useState(0);
    const { carrito } = useCarrito();
    const navigate = useNavigate();

    useEffect(() => {
        const subtotalTruncado = subtotal.toFixed(2);
        const agregadoCalculado = (Number(subtotalTruncado) * 0.03).toFixed(2);
        const totalCalculado = (Number(subtotalTruncado) + Number(agregadoCalculado)).toFixed(2);
        
        setNewSubtotal(subtotalTruncado);
        setAgregado(agregadoCalculado);
        setTotal(totalCalculado);
    }, [subtotal]);

    const irAPagar = () => {
        if(carrito.length === 0) {
            Swal.fire({
                title: "No hay productos en el carrito",
                text: "Ve a la tienda y agrega productos al carrito para poder pagar",
                icon: "error"
            });
            return;
        }
        const data = {
            subtotal: newSubtotal,
            agregado: agregado,
            total: total
        }

        const dataEncriptada = Encriptar(JSON.stringify(data));
        navigate(`/client/checkout/${dataEncriptada}`);

    }

    return (
        <div className="flex flex-col md:h-screen px-14 py-20 justify-between overflow-y-auto">
            <div>
                <p className="text-4xl font-bold leading-9 text-white">Resumen</p>
                <div className="flex items-center justify-between pt-16">
                    <p className="text-base font-bold leading-none text-white">Subtotal</p>
                    <p className="text-base leading-none text-white">Q{newSubtotal}</p>
                </div>
                <div className="flex items-center justify-between pt-5">
                    <p className="text-base font-bold leading-none text-white">(*)Agregado de Todo Compras (3%)</p>
                    <p className="text-base leading-none text-white">Q{agregado}</p>
                </div>
                <div className="flex items-center justify-between pt-5">
                    <p className="text-base leading-none text-white">* El agregado es un seguro de envio para que tu compra llegue en buen estado.</p>
                </div>
            </div>
            <div>
                <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
                    <p className="text-2xl leading-normal text-white">Total</p>
                    <p className="text-2xl font-bold leading-normal text-right text-darkPurple">Q{total}</p>
                </div>
                <button className="font-semibold leading-none w-full py-5 bg-yellow-500 border-purple border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-purple hover:text-yellow-500 text-purple" onClick={irAPagar}>
                    Ir a Pagar
                </button>
            </div>
        </div>
    );
}

export default Summary;