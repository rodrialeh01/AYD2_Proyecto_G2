import React from "react";
import ProductCard from "./ProductCard";

const HomeProducts = () => {
    return (
        <div className="p-7 flex-1 h-screen overflow-y-scroll scrollbar-hide">
            <div className="pb-4">
                <h1 className="text-black text-3xl font-semibold">
                Explora Productos
                </h1>
                <div className="flex flex-wrap gap-4">
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </div>
            </div>
        </div>
    );
}

export default HomeProducts;