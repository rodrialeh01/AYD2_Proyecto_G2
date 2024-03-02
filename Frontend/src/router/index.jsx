import { createBrowserRouter } from 'react-router-dom';
import LayoutPrivateClient from '../Layout/LayoutPrivateClient';
import LayoutPrivateVendor from '../Layout/LayoutPrivateVendor';
import CreatePContainer from '../components/vendor/CreatePContainer';
import ListPContainer from '../components/vendor/ListPContainer';
import HomeProducts from '../pages/client/HomeProducts';
export const router = createBrowserRouter([
    {
        path: '/',
        element: null
    },
    {
        path:'/client',
        element: <LayoutPrivateClient/>,
        children:[
            {
                path: 'home',
                element: <HomeProducts/>
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
    }
]);