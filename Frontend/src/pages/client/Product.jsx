import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useCarrito } from '../../Context/Carrito';
import Service from '../../Service/Service';
import Review from '../../components/client/Review';
import { ProductShopping } from '../../models/productShopping';

const Product = () => {

    /*const [images, setImages] = useState({
        img1: 'https://hushpuppies.gt/cdn/shop/products/300540991.jpg?v=1679929617',
        img2: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Museo_del_Bicentenario_-_Zapatos_de_N%C3%A9stor_Kirchner.jpg',
        img3: 'https://paylessgu.vtexassets.com/arquivos/ids/372322/195826_1.jpg?v=638094819114070000',
        img4: 'https://arturocalle.vtexassets.com/arquivos/ids/468688/HOMBRE-ZAPATOS-10124840-NEGRO-090_2.jpg?v=637937681312030000'
    })*/

    const { id } = useParams()
    const [pathImage, setPathImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('')
    const [precio, setPrecio] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [vendedor, setVendedor] = useState('')
    const [idVendedor, setIdVendedor] = useState('');
    const { carrito, actualizarCarrito } = useCarrito();
    
    useEffect(() => {
        Service.getProduct(id)
        .then((res) => {
            setPathImage(res.data.pathImage)
            setName(res.data.name)
            setDescription(res.data.description)
            setPrecio(res.data.price)
            setCantidad(res.data.stock)
            setIdVendedor(res.data.idUser)
            Service.getUser(res.data.idUser)
            .then((res2) => {
                setVendedor(res2.data.name)
            })
        })
        .catch((error) =>{
            console.log(error)
        })
    }, []);

    const [amount, setAmount] = useState(1)
    const navigate = useNavigate();
    const comprar = () => {
        if(existeProductoenCarrito){
            if(!validarNoPasaStock(carrito, id, amount)){
                Swal.fire({
                    title: "No se puede agregar al carrito",
                    text: "No hay suficiente stock",
                    icon: "error"
                });
                return;
            }

            for(let i = 0; i < carrito.length; i++){
                if(carrito[i].id_producto === id){
                    carrito[i].cantidad_producto += amount;
                    actualizarCarrito(carrito);
                    Swal.fire({
                        title: "Producto Agregado a tu Carrito!",
                        text: "Sigue comprando!",
                        icon: "success"
                    });
                    setTimeout(() => {
                        navigate('/client/shoppingcart');
                    }, 1000);
                    return;
                }
            }
        }
        const productoAgregado = new ProductShopping(id, name, description, amount, precio, pathImage, idVendedor)
        carrito.push(productoAgregado);
        actualizarCarrito(carrito);
        Swal.fire({
            title: "Gracias por tu compra!",
            text: "Sigue comprando!",
            icon: "success"
            });
        setTimeout(() => {
        navigate('/client/shoppingcart');
        }, 1000);
    }

    const existeProductoenCarrito = () => {
        for(let i = 0; i < carrito.length; i++){
            if(carrito[i].id_producto === id){
                return true;
            }
        }
        return false;
    }

    const validarNoPasaStock = (carrito,idProducto, cantidad_nueva) =>{
        for(let i = 0; i < carrito.length; i++){
            if(carrito[i].id_producto === idProducto){
                const total_cantidad = carrito[i].cantidad_producto + cantidad_nueva;
                if(total_cantidad > cantidad){
                    return false;
                }
                return true;
            }
        }
        return true;
    }

  return (
    <div className='max-w-7xl text-white mx-auto p-8 overflow-y-scroll scrollbar-hide h-screen'>
        <div className='flex flex-col justify-between lg:flex-row gap-16 lg:items-center'>
            <div className='flex flex-col gap-6 lg:wl2/4'>
                <img src={pathImage} alt="" className='w-full h-auto lg:h-120 object-cover rounded-xl'/>
                {/*<div className='flex flex-row justify-between h-24'>
                    <img src={images.img1} alt="" className='w-24 h-24 roinded-md cursor-pointer' onClick={() => setActiveImg(images.img1)}/>
                    <img src={images.img2} alt="" className='w-24 h-24 roinded-md cursor-pointer' onClick={() => setActiveImg(images.img2)}/>
                    <img src={images.img3} alt="" className='w-24 h-24 roinded-md cursor-pointer' onClick={() => setActiveImg(images.img3)}/>
                    <img src={images.img4} alt="" className='w-24 h-24 roinded-md cursor-pointer' onClick={() => setActiveImg(images.img4)}/>
                </div>*/}
            </div>
            {/* ABOUT */}
            <div className='flex flex-col gap-4'>
                <div>
                    <span className='text-violet-600 font-semibold'>TodoCompras</span>
                    <h1 className='text-3xl font-bold text-black'>{name}</h1>
                </div>
                <p className='font-semibold text-black'>Vendedor: <span className={`font-normal`}>{vendedor}</span></p>
                <p className='text-gray-700'>
                    {description}
                </p>
                <p className='font-semibold text-black'>Cantidad Disponible: <span className={`font-normal ${cantidad > 0 ? 'text-black' : 'text-red-700'}`}>{cantidad > 0 ? cantidad : 'NO HAY STOCK'}</span></p>
                <h6 className='text-lg font-semibold text-black'>Q {precio}</h6>
                <div className='flex flex-row items-center gap-12'>
                    <div className='flex flex-row items-center'>
                        <button className={`bg-gray-200 py-2 px-5 rounded-lg text-violet-800 text-3xl`} disabled={cantidad === 0} onClick={() => setAmount((prev) => prev>1?prev -1:prev)}>-</button>
                        <span className='py-4 px-6 rounded-lg text-black'>{amount}</span>
                        <button className='bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-3xl' disabled={cantidad === 0} onClick={() => setAmount((prev) => prev<cantidad?prev + 1:prev)}>+</button>
                    </div>
                    <button className='bg-violet-800 text-white font-semibold py-3 px-16 rounded-xl h-full flex items-center' onClick={comprar} disabled={cantidad===0} data-test-id="cypress-button-add">
                        
                        <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span>Agregar al Carrito</span>
                    </button>
                </div>
            </div>
        </div>

        <Review id={id}/>

    </div>
  )
}

export default Product