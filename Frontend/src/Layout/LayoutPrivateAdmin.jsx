import { Outlet } from 'react-router-dom';
import Sidebar from '../Navigation/Sidebar';
import { SidebarDataAdmin } from '../Navigation/SidebarData';

const LayoutPrivateAdmin = () => {
    return (
        <div className='flex'>
            <Sidebar data={SidebarDataAdmin}/>
            <Outlet/>
        </div>
    );
}

export default LayoutPrivateAdmin;