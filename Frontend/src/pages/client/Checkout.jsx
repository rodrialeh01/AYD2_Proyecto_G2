import React, { useEffect, useState } from "react";
import { BsPaypal } from "react-icons/bs";
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useCarrito } from '../../Context/Carrito';
import Service from "../../Service/Service";
import { Desencriptar } from "../../utils";

const Checkout = () => {
    const [total, setTotal] = useState(0)
    const [subtotal, setSubtotal] = useState(0)
    const [agregado, setAgregado] = useState(0)
    const [email, setEmail] = useState("")
    const [telefono, setTelefono] = useState("")
    const [direccion, setDireccion] = useState("")
    const [nombre, setNombre] = useState("")
    const [nit, setNit] = useState("")
    const [cardNumber, setCardNumber] = useState("")
    const [mes, setMes] = useState("")
    const [anio, setAnio] = useState("")
    const [securityCode, setSecurityCode] = useState("")
    const [cardName, setCardName] = useState("")
    const { cost } = useParams()
    const { carrito, actualizarCarrito } = useCarrito();
    const navigate = useNavigate()

    useEffect(() => {
        const dataDesencriptada = Desencriptar(cost)
        const data = JSON.parse(dataDesencriptada)
        setTotal(data.total)
        setSubtotal(data.subtotal)
        setAgregado(data.agregado)
        const user = JSON.parse(localStorage.getItem("data_user"))
        Service.getUser(user.id).then(res => {
            console.log(res.data)
            setEmail(res.data.email)
        })
    }, [cost])

    const handleSubmit = (e) =>{
		e.preventDefault();
	}

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const onChangeTelefono = (e) => {
        setTelefono(e.target.value)
    }

    const onChangeDireccion = (e) => {
        setDireccion(e.target.value)
    }

    const onChangeNombre = (e) => {
        setNombre(e.target.value)
    }

    const onChangeNit = (e) => {
        setNit(e.target.value)
    }

    const onChangeCardNumber = (e) => {
        setCardNumber(e.target.value)
    }

    const onChangeMes = (e) => {
        setMes(e.target.value)
    }

    const onChangeAnio = (e) => {
        setAnio(e.target.value)
    }

    const onChangeSecurityCode = (e) => {
        setSecurityCode(e.target.value)
    }

    const onChangeCardName = (e) => {
        setCardName(e.target.value)
    }

    const pagoPorTarjeta = () => {
        if(email === "" || telefono === "" || direccion === "" || nombre === "" || nit === "" || cardNumber === "" || mes === "" || anio === "" || securityCode === "" || cardName === ""){
            Swal.fire({
                title: "Completa todos los campos!",
                text: "En especial los datos de tu tarjeta",
                icon: "error"
            });
            return;
        }
        const purchases = [];
        const user = JSON.parse(localStorage.getItem("data_user"))
        for(let i = 0; i < carrito.length; i++){
            purchases.push({
                "idUser": user.id,
                "idProduct": carrito[i].id_producto,
                "price":carrito[i].precio_producto,
                "quantity": carrito[i].cantidad_producto,
                "idVendor": carrito[i].id_vendedor
            })
        }
        console.log(purchases)
        const data = {
            purchases,
            email: email,
            phone: telefono,
            address: direccion,
            nit: nit,
            name: nombre,
            method: 1,
            amount: Number(total),
            card_number: cardNumber,
            card_name: cardName,
            month: Number(mes),
            year: Number(anio),
            cvv: securityCode
        }
        Service.createPurchasesWithPay(data)
        .then((res) => {
            console.log(res);
            Swal.fire({
                title: "Compra realizada con éxito!",
                text: "Gracias por tu compra!, puedes seguir navegando para otra compra",
                icon: "success"
            });
            actualizarCarrito([])
            setTimeout(() => {
                navigate('/client/home');
            }, 1000);
        })
        .catch((err) => {
            console.log(err);
            Swal.fire({
                title: "Hubo un error en tu compra!",
                text: "No se pudo procesar tu compra, intenta nuevamente más tarde",
                icon: "error"
            });
            console.log(err)
        })
    }

    const pagoPorPaypal = () => {
        if(email === "" || telefono === "" || direccion === "" || nombre === "" || nit === ""){
            Swal.fire({
                title: "Completa todos los campos de facturación!",
                text: "Unicamente los datos de facturación (email, telefono, direccion, nombre, nit)",
                icon: "error"
            });
            return;
        }
        const purchases = [];
        const user = JSON.parse(localStorage.getItem("data_user"))
        for(let i = 0; i < carrito.length; i++){
            purchases.push({
                "idUser": user.id,
                "idProduct": carrito[i].id_producto,
                "price":carrito[i].precio_producto,
                "quantity": carrito[i].cantidad_producto,
                "idVendor": carrito[i].id_vendedor
            })
        }
        console.log(purchases)
        const data = {
            purchases,
            email: email,
            phone: telefono,
            address: direccion,
            nit: nit,
            name: nombre,
            method: 2,
            amount: Number(total)
        }
        Service.createPurchasesWithPay(data)
        .then((res) => {
            console.log(res);
            Swal.fire({
                title: "Compra realizada con éxito!",
                text: "Gracias por tu compra!, puedes seguir navegando para otra compra",
                icon: "success"
            });
            setTimeout(() => {
                navigate('/client/home');
            }, 1000);
        })
        .catch((err) => {
            Swal.fire({
                title: "Hubo un error en tu compra!",
                text: "No se pudo procesar tu compra, intenta nuevamente más tarde",
                icon: "error"
            });
            console.log(err)
        })
    }

    return (
        <div class="relative mx-auto w-full bg-slate-200 overflow-y-scroll scrollbar-hide h-screen">
            <div class="grid min-h-screen grid-cols-10">
                <div class="col-span-full py-6 px-4 sm:py-12 lg:col-span-6 lg:py-24">
                <div class="mx-auto w-full max-w-lg">
                    <h1 class="relative text-2xl font-medium text-black sm:text-3xl">Pago Seguro<span class="mt-2 block h-1 w-10 bg-purple sm:w-20"></span></h1>
                    <form action="" class="mt-10 flex flex-col space-y-4" onSubmit={handleSubmit}>
                    <div><label for="email" class="text-xs font-semibold text-black">Correo Electrónico</label><input type="email" id="email" name="email" placeholder="email@email.com" class="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-400 shadow-sm outline-none transition focus:ring-2 focus:ring-purple" value={email} onChange={onChangeEmail}/></div>
                    <div><label for="telefono" class="text-xs font-semibold text-black">Teléfono</label><input type="tel" id="telefono" name="telefono" placeholder="12345678" class="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-400 shadow-sm outline-none transition focus:ring-2 focus:ring-purple" value={telefono} onChange={onChangeTelefono}/></div>
                    <div><label for="direccion" class="text-xs font-semibold text-black">Dirección</label><input type="text" id="direccion" name="direccion" placeholder="1 Calle 1-58, Zona 1, Antigua Guatemala" class="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-400 shadow-sm outline-none transition focus:ring-2 focus:ring-purple" value={direccion} onChange={onChangeDireccion} /></div>
                    <div><label for="nombre" class="text-xs font-semibold text-black">Nombre (Para Facturación)</label><input type="text" id="nombre" name="nombre" placeholder="Jhon Doe" class="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-400 shadow-sm outline-none transition focus:ring-2 focus:ring-purple" value={nombre} onChange={onChangeNombre}/></div>
                    <div><label for="nit" class="text-xs font-semibold text-black">NIT (Para Facturación)</label><input type="text" id="nit" name="nit" placeholder="1234Ñ" class="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-400 shadow-sm outline-none transition focus:ring-2 focus:ring-purple" value={nit} onChange={onChangeNit}/></div>
                    <div class="relative"><label for="card-number" class="text-xs font-semibold text-black">Número de Tarjeta (Obligatorio si paga con tarjeta)</label><input type="text" id="card-number" name="card-number" placeholder="1234-5678-XXXX-XXXX" class="block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-sm placeholder-gray-400 shadow-sm outline-none transition focus:ring-2 focus:ring-purple" value={cardNumber} onChange={onChangeCardNumber} /></div>
                    <div>
                        <p class="text-xs font-semibold text-black">Fecha de expiración (Obligatorio si paga con tarjeta)</p>
                        <div class="mr-6 flex flex-wrap">
                        <div class="my-1">
                            <label for="mes" class="sr-only">Mes</label><input type="text" id="mes" name="mes" placeholder="Mes" class="block w-36 rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-400 shadow-sm outline-none transition focus:ring-2 focus:ring-purple" value={mes} onChange={onChangeMes}/>
                        </div>
                        <div class="my-1 ml-3 mr-6">
                            <label for="anio" class="sr-only">Año</label><input type="text" id="anio" name="anio" placeholder="Año" class="block w-36 rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-400 shadow-sm outline-none transition focus:ring-2 focus:ring-purple" value={anio} onChange={onChangeAnio}/>
                        </div>
                        <div class="relative my-1"><label for="security-code" class="sr-only">CVV/CVC</label><input type="text" id="security-code" name="security-code" placeholder="CVV/CVC" class="block w-36 rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-400 shadow-sm outline-none transition focus:ring-2 focus:ring-purple" value={securityCode} onChange={onChangeSecurityCode}/></div>
                        </div>
                    </div>
                    <div>
                        <p class="text-xs font-semibold text-black">Nombre del Propietario de la Tarjeta (Obligatorio si paga con tarjeta)</p>
                        <label for="card-name" class="sr-only">Nombre en la tarjeta</label><input type="text" id="card-name" name="card-name" placeholder="Nombre en la tarjeta" class="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-400 shadow-sm outline-none transition focus:ring-2 focus:ring-purple" value={cardName} onChange={onChangeCardName} />
                    </div>
                    </form>
                    <button type="submit" class="mt-4 inline-flex w-full items-center justify-center rounded bg-purple py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-purple sm:text-lg" onClick={pagoPorTarjeta}>Pagar por Tarjeta</button>
                    <button type="submit" class="mt-4 inline-flex w-full items-center justify-center rounded bg-yellow-500 py-2.5 px-4 text-base font-semibold tracking-wide text-blue-950 text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-yellow-500 sm:text-lg" onClick={pagoPorPaypal}><BsPaypal /> Pagar por Paypal</button>
                </div>
                </div>
                <div class="relative col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24">
                <div>
                    <img src="https://i.postimg.cc/G9nHMGXT/mid-shot-woman-holding-bag-looking-phone.jpg" alt="" class="absolute inset-0 h-full w-full object-cover" />
                    <div class="absolute inset-0 h-full w-full bg-purple opacity-75"></div>
                </div>
                <div class="relative">
                    <div style={{width: "100px", height: "100px;"}} class="flex items-center justify-center">
                        <img src="https://i.postimg.cc/wxbtt34T/Copia-de-Red-Modern-Market-Logo-1.png" alt="logo" border="0" class="object-cover opacity-70" />
                    </div>
                    <div class="space-y-2">
                        <p class="flex justify-between text-sm font-base text-white"><span>Subtotal: </span><span>Q{subtotal}</span></p>
                        <p class="flex justify-between text-sm font-base text-white"><span>Agg: 3%</span><span>Q{agregado}</span></p>
                        <p class="flex justify-between text-lg font-semibold text-white"><span>Total a pagar:</span><span>Q{total}</span></p>
                    </div>
                    <div class="my-5 h-0.5 w-full bg-white bg-opacity-30"></div>
                </div>
                <div class="relative mt-10 text-white">
                    <h3 class="mb-5 text-lg font-bold">Soporte</h3>
                    <p class="text-sm font-semibold">+502 1234 5678 <span class="font-light">(International)</span></p>
                    <p class="mt-1 text-sm font-semibold">support@todocompras.com <span class="font-light">(Email)</span></p>
                    <p class="mt-2 text-xs font-medium">Llámanos por algun problema en tu compra</p>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout;