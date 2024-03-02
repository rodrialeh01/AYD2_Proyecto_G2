import { Outlet } from 'react-router-dom';
import Sidebar from '../Navigation/Sidebar';
import { SidebarDataVendor } from '../Navigation/SidebarData';

const LayoutPrivateVendor = () => {
    console.log(SidebarDataVendor);
    return (
        <div className='flex'>
            <Sidebar data={SidebarDataVendor}/>
            <Outlet/>
        </div>
    );
}

export default LayoutPrivateVendor;