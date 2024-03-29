import React, { useState } from 'react';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsArrowLeftShort, BsSearch } from "react-icons/bs";
import { RiWalkFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { useUser } from '../Context/User';

const Sidebar = ({data}) => {
    const [open, setOpen] = useState(false);
    const { logged, setLogged } = useUser();
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    }

    const Logout = () => {
        localStorage.removeItem("data_user");
        localStorage.removeItem("carrito_user");
        setLogged(false);
        navigate("/");
    }

    return (
        <div className='flex'>
        <div className={`bg-purple h-screen p-5 pt-8 ${open ? 'w-72': 'w-20'} duration-300 scrollbar-hide h-screen overflow-y-auto overflow-x-hidden relative`}>
            <BsArrowLeftShort className={`bg-white text-purple text-3xl rounded-full absolute -right-3 top-9 border border-purple cursor-pointer ${!open && 'rotate-180'}`}
            onClick={() => setOpen(!open)}/>
            <div className='inline-flex'>
                <AiOutlineShoppingCart className={`bg-amber-300 text-4xl text-purple rounded cursor-pointer block float-left mr-2 duration-500 ${open && 'rotate-[360deg]'}`}/>
                <h1 className={`text-white origin-left font-medium text-2xl duration-300 ${!open && 'scale-0'}`}>Todo Compras</h1>
            </div>
            <div className={`flex items items-center rounded-md bg-lightPurple mt-6 ${!open ? 'px-2.5' : 'px-4'} py-2`}>
                <BsSearch className={`text-black text-lg block float-left cursor-pointer ${open && 'mr-2'}`}/>
                <input type={'search'} placeholder='Search' className={`bg-transparent text-black w-full focus:outline-none text-base ${!open && 'hidden'}`}/>
            </div>

            <ul className='pt-2'>
                {data.map((item, index) => {
                    return (
                        <li key={index} className='text-gray-300 text-sm flex items-center gap-x-4 cursos-pointer p-2 hover:bg-lightpurple200 hover:text-black rounded-md mt-2 hover:cursor-pointer' onClick={() => handleNavigate(item.path)}>
                            <span className='text-2xl block float-left'>
                                {item.icon}
                            </span>
                            <span className={`text-base font-medium flex-1 duration-300 ${!open && 'hidden'}`}>{item.title}</span>
                        </li>
                    );
                })}
                <li className='text-gray-300 text-sm flex items-center gap-x-4 cursos-pointer p-2 hover:bg-lightpurple200 hover:text-black rounded-md mt-2' onClick={Logout}>
                    <span className='text-2xl block float-left'>
                        <RiWalkFill/>
                    </span>
                    <span className={`text-base font-medium flex-1 duration-300 ${!open && 'hidden'}`}>Cerrar Sesión</span>
                </li>
            </ul>
        </div>
        </div>
    );
}

export default Sidebar;