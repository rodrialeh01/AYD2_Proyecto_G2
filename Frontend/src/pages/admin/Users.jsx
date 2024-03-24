import { useEffect, useState } from "react";
import Service from "../../Service/Service";
import UserCard from "./UserCard";

const HomeUsers = () => {


    const [users, setUsers] = useState([]);

    useEffect(() => {
        Service.getAllUsers()
        .then((res) => {
            setUsers(res.data);
            console.log(res.data);
        })
    }, []);

    return (
        <div className="p-7 flex-1 h-screen overflow-y-scroll scrollbar-hide bg-silver">
            <div className="pb-4">
                <h1 className="text-black text-3xl font-semibold">
                Usuarios Registrados
                </h1>
                <div className="flex flex-wrap gap-4">
                    {users.map((user, index) => (
                        <UserCard key={index} user={user}/>))}
                </div>
            </div>
        </div>
    );
}

export default HomeUsers;