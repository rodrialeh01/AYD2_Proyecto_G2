import React from "react";
import Service from '../../Service/Service'

const UserCard = ({user}) => {
    console.log(user);


    

    //Delete a user
    const deleteUser = async (id) => {
        try {
            await Service.deleteUser(id);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    }
            


    return (
        <>
            <div class="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                <div class="mt-4 px-5 pb-5">
                    <a >
                    <h5 class="text-xl tracking-tight text-slate-900">{user.name}</h5>

                    {/*Atributos del usuario con su título en negrita y su valor*/}
                    <p><b>Correo:</b> {user.email}</p>
                    <p><b>CUI:</b> {user.cui}</p>
                    {/*Si es rol 1 es cliente sino es vendedor*/}
                    <p><b>Rol:</b> {user.role === 1 ? "Cliente" : "Vendedor"}</p>



                    </a>
                    <div class="mt-2 mb-5 flex items-center justify-between">
                    
                    
                    </div>
                    {/*Agregar botón para eliminar un usuario*/}
                    <button class="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => {deleteUser(user._id)}}>
                        Eliminar
                    </button>
                </div>
            </div>
        </>
    );
}

export default UserCard;