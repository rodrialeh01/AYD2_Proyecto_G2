import { Outlet } from 'react-router-dom';
import Sidebar from '../Navigation/Sidebar';
import { SidebarDataClient } from '../Navigation/SidebarData';

const LayoutPrivateClient = () => {
    return (
        <div className='flex'>
            <Sidebar data={SidebarDataClient}/>
            <Outlet/>
        </div>
    );
}

export default LayoutPrivateClient;