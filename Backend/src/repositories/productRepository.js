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

    async getProductsByVendor(idUser) {
        return await Product.find( {idUser: String("65cbf0042efb66288c71e1b2")} );
    }

    async deleteProduct(id) {
        return await Product.findByIdAndDelete(id);
    }
        
}

export default ProductRepository;