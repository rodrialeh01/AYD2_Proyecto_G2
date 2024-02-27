import React, { useState } from 'react'
import Review from '../../components/client/Review'

const Product = () => {

    const [images, setImages] = useState({
        img1: 'https://hushpuppies.gt/cdn/shop/products/300540991.jpg?v=1679929617',
        img2: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Museo_del_Bicentenario_-_Zapatos_de_N%C3%A9stor_Kirchner.jpg',
        img3: 'https://paylessgu.vtexassets.com/arquivos/ids/372322/195826_1.jpg?v=638094819114070000',
        img4: 'https://arturocalle.vtexassets.com/arquivos/ids/468688/HOMBRE-ZAPATOS-10124840-NEGRO-090_2.jpg?v=637937681312030000'
    })

    const [activeImg, setActiveImg] = useState(images.img1)
    const [amount, setAmount] = useState(1)

  return (
    <div className='max-w-7xl text-white mx-auto p-8'>
        <div className='flex flex-col justify-between lg:flex-row gap-16 lg:items-center'>
            <div className='flex flex-col gap-6 lg:wl2/4'>
                <img src={activeImg} alt="" className='w-full h-full aspect-square object-cover rounded-xl'/>
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
                    <span className='text-violet-600 font-semibold'>Special Sneaker</span>
                    <h1 className='text-3xl font-bold text-black'>Nike Invencible 3</h1>
                </div>
                <p className='text-gray-700'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <h6 className='text-lg font-semibold text-black'>Q 199.00</h6>
                <div className='flex flex-row items-center gap-12'>
                    <div className='flex flex-row items-center'>
                        <button className='bg-gray-200 py-2 px-5 rounded-lg text-violet-800 text-3xl' onClick={() => setAmount((prev) => prev>1?prev -1:prev)}>-</button>
                        <span className='py-4 px-6 rounded-lg text-black'>{amount}</span>
                        <button className='bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-3xl' onClick={() => setAmount((prev) => prev + 1)}>+</button>
                    </div>
                    <button className='bg-violet-800 text-white font-semibold py-3 px-16 rounded-xl h-full'>Añadir al carrito</button>
                </div>
            </div>
        </div>

        <Review />

    </div>
  )
}

export default Product