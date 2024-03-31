import Product from "../db/models/product.model.js";
import { Bitacora } from '../bitacora/bitacora.js';

const bitacora = Bitacora.getInstance();

class ProductRepository {
    async obtenerTodos() {
        bitacora.addBitacora("GET",'Obtener todos los productos');
        return await Product.find({});
    }

    async crearProducto(producto) {
        try {
            const newP = await Product.create(producto);
            bitacora.addBitacora("POST",'Creación de un nuevo producto con ID: ' + newP._id );
            return newP;
        } catch (error) {
            console.error(error);
            return res.response(null, error.message, 500);
        }
    }

    async updateProduct(id, producto) {
        bitacora.addBitacora("PATCH",'Actualización del producto con ID: ' + id );
        return await Product.findByIdAndUpdate(id, producto, { new: true });

    }

    async getProductById(id) {
        bitacora.addBitacora("GET",'Obtener producto con ID: ' + id );
        return await Product.findById(id);
    }

    async getProductsByVendor(idUser) {
        bitacora.addBitacora("GET",'Obtener productos del vendedor con ID: ' + idUser );
        return await Product.find( {idUser: String(idUser)} );
    }

    async deleteProduct(id) {
        bitacora.addBitacora("DELETE",'Eliminar producto con ID: ' + id );
        return await Product.findByIdAndDelete(id);
    }

    async uploadImage(image) {
        bitacora.addBitacora("POST",'Subir imagen del producto');
        console.log(image);
    }
        
}

export default ProductRepository;