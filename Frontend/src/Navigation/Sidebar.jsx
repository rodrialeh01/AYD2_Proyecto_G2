import React, { useState } from 'react';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsArrowLeftShort, BsSearch } from "react-icons/bs";
import { RiWalkFill } from "react-icons/ri";
import { SidebarDataClient } from './SidebarData';

const Sidebar = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className={`bg-purple h-screen p-5 pt-8 ${open ? 'w-72': 'w-20'} duration-300 relative `}>
            <BsArrowLeftShort className={`bg-white text-purple-900 text-3xl rounded-full absolute -right-3 top-9 border border-purple-900 cursor-pointer ${!open && 'rotate-180'}`}
            onClick={() => setOpen(!open)}/>
            <div className='inline-flex'>
                <AiOutlineShoppingCart className={`bg-amber-300 text-4xl text-purple-900 rounded cursor-pointer block float-left mr-2 duration-500 ${open && 'rotate-[360deg]'}`}/>
                <h1 className={`text-white origin-left font-medium text-2xl duration-300 ${!open && 'scale-0'}`}>Todo Compras</h1>
            </div>
            <div className={`flex items items-center rounded-md bg-purple-400 mt-6 ${!open ? 'px-2.5' : 'px-4'} py-2`}>
                <BsSearch className={`text-black text-lg block float-left cursor-pointer ${open && 'mr-2'}`}/>
                <input type={'search'} placeholder='Search' className={`bg-transparent text-black w-full focus:outline-none text-base ${!open && 'hidden'}`}/>
            </div>

            <ul className='pt-2'>
                {SidebarDataClient.map((item, index) => {
                    return (
                        <li key={index} className='text-gray-300 text-sm flex items-center gap-x-4 cursos-pointer p-2 hover:bg-purple-300 hover:text-black rounded-md mt-2'>
                            <span className='text-2xl block float-left'>
                                {item.icon}
                            </span>
                            <span className={`text-base font-medium flex-1 duration-300 ${!open && 'hidden'}`}>{item.title}</span>
                        </li>
                    );
                })}
                <li className='text-gray-300 text-sm flex items-center gap-x-4 cursos-pointer p-2 hover:bg-purple-300 hover:text-black rounded-md mt-2'>
                    <span className='text-2xl block float-left'>
                        <RiWalkFill/>
                    </span>
                    <span className={`text-base font-medium flex-1 duration-300 ${!open && 'hidden'}`}>Cerrar Sesión</span>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;