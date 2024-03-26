import React from "react";
import * as RiIcons from 'react-icons/ri';

export const SidebarDataClient = [
    {
        title: 'Productos',
        path: '/client/home',
        icon: <RiIcons.RiShoppingBag2Fill />
    },
    {
        title: 'Perfil',
        path: '/client/profile',
        icon: <RiIcons.RiUserFill />
    },
    {
        title: 'Mi Carrito',
        path: '/client/shoppingcart',
        icon: <RiIcons.RiShoppingCart2Fill />
    }
]

export const SidebarDataVendor = [
    {
        title: 'Añadir Producto',
        path: '/vendor/addproduct',
        icon: <RiIcons.RiDossierFill />
    },
    {
        title: 'Perfil',
        path: '/vendor/profile',
        icon: <RiIcons.RiUserFill />
    },
    {
        title: 'Mis Productos',
        path: '/vendor/myproducts',
        icon: <RiIcons.RiShoppingBag2Fill />
    },
    {
        title: 'Información',
        path: '/vendor/info',
        icon: <RiIcons.RiMoneyDollarCircleFill />
    }
]

export const SidebarDataAdmin = [
    {
        title: 'Usuarios',
        path: '/admin/users',
        icon: <RiIcons.RiUserFill />
    },
    {
        title: 'Productos',
        path: '/admin/products',
        icon: <RiIcons.RiShoppingBag2Fill />
    },
    {
        title: 'Reviews',
        path: '/admin/reviews',
        icon: <RiIcons.RiStarFill />
    },
    {
        title: 'Reportes',
        path: '/admin/reports',
        icon: <RiIcons.RiFileList2Fill />
    }
]