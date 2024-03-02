import { createBrowserRouter } from 'react-router-dom';
import LayoutPrivateAdmin from '../Layout/LayoutPrivateAdmin';
import LayoutPrivateClient from '../Layout/LayoutPrivateClient';
import LayoutPrivateVendor from '../Layout/LayoutPrivateVendor';
import CreatePContainer from '../components/vendor/CreatePContainer';
import ListPContainer from '../components/vendor/ListPContainer';
import HomeProducts from '../pages/client/HomeProducts';
import Product from '../pages/client/Product';
export const router = createBrowserRouter([
    {
        path: '/',
        element: null
    },
    {
        path: '/register',
        element: <div>Registrar</div>
    },
    {
        path:'/client',
        element: <LayoutPrivateClient/>,
        children:[
            {
                path: 'home',
                element: <HomeProducts/>
            },
            {
                path: 'product/:id',
                element: <Product/>
            }
        ]
    },
    {
        path:'/vendor',
        element: <LayoutPrivateVendor/>,
        children:[
            {
                path: 'addproduct',
                element: <CreatePContainer/>
            },
            {
                path: 'myproducts',
                element: <ListPContainer/>
            }
        ]
    },
    {
        path: '/admin',
        element: <LayoutPrivateAdmin/>,
        children: [
            {
                path: 'users',
                element: <div>Users</div>
            },
            {
                path: 'products',
                element: <div>Products</div>
            }
        ]
    }
]);