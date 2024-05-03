import React, { useEffect, useState } from "react";
import Service from "../../Service/Service";
import ProductCard from "./ProductCard";

const HomeProducts = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        Service.getAllProducts()
        .then((res) => {
            setProducts(res.data);
        })
    }, []);

    return (
        <div className="p-7 flex-1 h-screen overflow-y-scroll scrollbar-hide bg-silver">
            <div className="pb-4">
                <h1 className="text-black text-3xl font-semibold">
                Explora Productos
                </h1>
                <div className="flex flex-wrap gap-4">
                    {products.map((product, index) => (
                        <ProductCard key={index} product={product} index={index}/>))}
                </div>
            </div>
        </div>
    );
}

export default HomeProducts;