import Product from "../db/models/product.model.js";

class ProductRepository {
    async obtenerTodos() {
        return await Product.find({});
    }
}

export default ProductRepository;