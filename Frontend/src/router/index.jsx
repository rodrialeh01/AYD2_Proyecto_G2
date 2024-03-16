import { createBrowserRouter } from 'react-router-dom';
import LayoutPrivateAdmin from '../Layout/LayoutPrivateAdmin';
import LayoutPrivateClient from '../Layout/LayoutPrivateClient';
import LayoutPrivateVendor from '../Layout/LayoutPrivateVendor';
import CreatePContainer from '../components/vendor/CreatePContainer';
import ListPContainer from '../components/vendor/ListPContainer';
import HomeProducts from '../pages/client/HomeProducts';
import Product from '../pages/client/Product';
import SignUp from '../pages/general/SignUp';
import Login from '../pages/general/login/Login';
import ProductAdmin from '../pages/admin/ProductAdmin';
import Users from '../pages/admin/Users';
import HomeReviews from '../pages/admin/HomeReviews';
import ViewPContainer from '../components/general/ViewPContainer'
export const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />
    },
    {
        path: '/signup',
        element: <SignUp/>
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
            },
            {
                path: 'profile',
                element: <ViewPContainer />
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
            },
            {
                path: 'profile',
                element: <ViewPContainer />
            }
        ]
    },
    {
        path: '/admin',
        element: <LayoutPrivateAdmin/>,
        children: [
            {
                path: 'users',
                element: <Users/>
            },
            {
                path: 'products',
                element: <ProductAdmin/>
            }
            ,
            {
                path: 'reviews',
                element: <HomeReviews/>
            },
            {
                path: 'profile',
                element: <ViewPContainer />
            }
        ]
    }
]);