import React, { useEffect, useState } from 'react';
import Service from "../../Service/Service";
const Auditoria = () => {
    const [auditoria, setAuditoria] = useState([]);

    useEffect(() => {
        Service.getAuditoria()
            .then((res) => {
                setAuditoria(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className='m-3 h-screen overflow-y-scroll scrollbar-hide flex-1'>
            <h1 className='text-3xl font-bold mb-2'>Bitácora de Base de Datos</h1>
            <table className='w-full'>
                <thead className='bg-gray-50 border-b-2 border-gray-200'>
                    <tr>
                        <th className='p-3 text-sm font-semibold tracking-wide text-center'>No.</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-center'>Descripción</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-center'>Tipo de Operación</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-center'>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {auditoria.map((a, index) => (
                        <tr key={index} className='bg-gray-100 text-center border-b-2 border-gray-200'>
                            <td className='p-3 text-sm text-gray-700'>{index + 1}</td>
                            <td className='p-3 text-sm text-gray-700'>{a.descripcion}</td>
                            <td className='p-3 text-sm text-gray-700'>{a.tipo}</td>
                            <td className='p-3 text-sm text-gray-700'>{a.fecha}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Auditoria;