import React, { createContext, useContext, useState } from "react";

const CarritoContext = createContext();

export const useCarrito = () => useContext(CarritoContext);

export const CarritoProvider = ({ children }) => {
    const [carrito, setCarrito] = useState(JSON.parse(localStorage.getItem("carrito_user")) || []);
    
    const actualizarCarrito = (nuevoCarrito) => {
        setCarrito(nuevoCarrito);
        localStorage.setItem("carrito_user", JSON.stringify(nuevoCarrito));
    }
    

    return (
        <CarritoContext.Provider value={{ carrito, actualizarCarrito }}>
            {children}
        </CarritoContext.Provider>
    );
}