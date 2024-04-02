import { Bitacora } from '../bitacora/bitacora.js';
import Product from "../db/models/product.model.js";
import BitacoraBDRepository from "./bitacorabdRepository.js";

const bitacora = Bitacora.getInstance();
const bdb = new BitacoraBDRepository();

class ProductRepository {
    async obtenerTodos() {
        bitacora.addBitacora("GET",'Obtener todos los productos');
        bdb.crearBitacoraBD('Se obtuvieron los registros de la tabla PRODUCT','SELECT',new Date());
        return await Product.find({});
    }

    async crearProducto(producto) {
        try {
            const newP = await Product.create(producto);
            bitacora.addBitacora("POST",'Creación de un nuevo producto con ID: ' + newP._id );
            bdb.crearBitacoraBD(`Se añadió un nuevo registro en la tabla PRODUCT`, 'INSERT', new Date());
            return newP;
        } catch (error) {
            console.error(error);
            return res.response(null, error.message, 500);
        }
    }

    async updateProduct(id, producto) {
        bitacora.addBitacora("PATCH",'Actualización del producto con ID: ' + id );
        bdb.crearBitacoraBD(`Se actualizó el producto en la tabla PRODUCT`, 'UPDATE', new Date());
        return await Product.findByIdAndUpdate(id, producto, { new: true });

    }

    async getProductById(id) {
        bitacora.addBitacora("GET",'Obtener producto con ID: ' + id );
        bdb.crearBitacoraBD('Se obtuvo un registro de la tabla PRODUCT','SELECT',new Date());
        return await Product.findById(id);
    }

    async getProductsByVendor(idUser) {
        bitacora.addBitacora("GET",'Obtener productos del vendedor con ID: ' + idUser );
        bdb.crearBitacoraBD('Se obtuvieron los registros de la tabla PRODUCT','SELECT',new Date());
        return await Product.find( {idUser: String(idUser)} );
    }

    async deleteProduct(id) {
        bitacora.addBitacora("DELETE",'Eliminar producto con ID: ' + id );
        bdb.crearBitacoraBD(`Se eliminó el producto en la tabla PRODUCT`, 'DELETE', new Date());
        return await Product.findByIdAndDelete(id);
    }

    async uploadImage(image) {
        bitacora.addBitacora("POST",'Subir imagen del producto');
        bdb.crearBitacoraBD(`Se añadió un nuevo registro en la tabla PRODUCT`, 'INSERT', new Date());
        console.log(image);
    }
        
}

export default ProductRepository;