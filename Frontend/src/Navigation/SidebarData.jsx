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
        path: '/profile',
        icon: <RiIcons.RiUserFill />
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
        path: '/profile',
        icon: <RiIcons.RiUserFill />
    },
    {
        title: 'Mis Productos',
        path: '/vendor/myproducts',
        icon: <RiIcons.RiShoppingBag2Fill />
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
    }
]