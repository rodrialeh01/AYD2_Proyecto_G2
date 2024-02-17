import Product from "../db/models/product.model.js";

class ProductRepository {
    async obtenerTodos() {
        return await Product.find({});
    }

    async crearProducto(producto) {
        try {
            return await Product.create(producto);
        } catch (error) {
            console.error(error);
            return res.response(null, error.message, 500);
        }
    }

    async updateProduct(id, producto) {
    
        return await Product.findByIdAndUpdate(id, producto, { new: true });

    }

    async getProductById(id) {
        return await Product.findById(id);
    }
}

export default ProductRepository;