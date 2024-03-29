import { createBrowserRouter } from 'react-router-dom';
import LayoutPrivateAdmin from '../Layout/LayoutPrivateAdmin';
import LayoutPrivateClient from '../Layout/LayoutPrivateClient';
import LayoutPrivateVendor from '../Layout/LayoutPrivateVendor';
import Report1Container from '../components/admin/Report1Container';
import ReportContainer from '../components/admin/ReportsContainer';
import ViewPContainer from '../components/general/ViewPContainer';
import CreatePContainer from '../components/vendor/CreatePContainer';
import IncomeContainer from '../components/vendor/IncomePContainer';
import InfoContainer from '../components/vendor/InfoContainer';
import ListPContainer from '../components/vendor/ListPContainer';
import SellsContainer from '../components/vendor/SellsContainer';
import HomeReviews from '../pages/admin/HomeReviews';
import ProductAdmin from '../pages/admin/ProductAdmin';
import Report2 from '../pages/admin/Report2';
import Users from '../pages/admin/Users';
import Checkout from '../pages/client/Checkout';
import HomeProducts from '../pages/client/HomeProducts';
import Product from '../pages/client/Product';
import ShoppingCart from '../pages/client/ShoppingCart';
import SignUp from '../pages/general/SignUp';
import Login from '../pages/general/login/Login';
import Report3 from '../pages/admin/Report3';

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
            },
            {
                path: 'shoppingcart',
                element: <ShoppingCart />
            },
            {
                path: 'checkout/:cost',
                element: <Checkout/>
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
            },{
                path: 'info',
                element: <InfoContainer/>
            },{
                path: 'ingresos',
                element: <IncomeContainer/>
            },
            {
                path: 'ventas',
                element: <SellsContainer/>
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
            },
            {
                path: 'reports',
                element: <ReportContainer/>
            },
            {
                path: 'report1',
                element: <Report1Container/>
            },
            {
                path: 'report2',
                element: <Report2/>
            },
            {
                path: 'report3',
                element: <Report3/>
            }
        ]
    }
]);