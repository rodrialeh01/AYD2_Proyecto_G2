import Product from "../db/models/product.model.js";

class ProductRepository {
    async obtenerTodos() {
        return await Product.find({});
    }

    async crearProducto(producto) {
        try {
            const newP = await Product.create(producto);
            return newP;
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
        return await Product.find( {idUser: String(idUser)} );
    }

    async deleteProduct(id) {
        return await Product.findByIdAndDelete(id);
    }

    async uploadImage(image) {
        console.log(image);
    }
        
}

export default ProductRepository;