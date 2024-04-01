import validator from "validator";
import { saveObj } from '../config/objectHandler.js';
import { LogBack } from '../log/bitacora.js';
import ProductRepository from "../repositories/productRepository.js";

const productRepository = new ProductRepository();
const logB = LogBack.getInstance();

export const createProduct = async (req, res) => {
    try {
        const { pathImage, name, description, price, stock, idUser } = req.body;
        
        if (!pathImage || !name || !description || !price || !stock || !idUser) {
            res.response(null, "All fields are required", 400);
        }

        if (!validator.isNumeric(String(price)) || !validator.isNumeric(String(stock))) {
            res.response(null, "Price and stock must be numbers", 400);
        }

        if (price <= 0) {
            res.response(null, "Price must be greater than 0", 400);
        }

        if (!validator.isMongoId(String(idUser))) {
            res.response(null, "Invalid idUser", 400);
        }

        const producto = {
            pathImage,
            name,
            description,
            price,
            stock,
            idUser
        }

        const p = await productRepository.crearProducto(producto);
        logB.addBitacora(`ENDPOINT: /product/create - Se añadió el nuevo producto con ID: ${p._id}`);
        res.response(p, "Product created successfully", 201);
    } catch (error) {
        console.error(error);
        logB.addBitacora(`ENDPOINT: /product/create - Hubo un error: ${error.message.replace("\n", " ")}`);
        res.response(null, error.message, 500);
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { pathImage, name, description, price, stock, idUser } = req.body;

        if (!id || !pathImage || !name || !description || !price || !stock || !idUser) {
            res.response(null, "All fields are required", 400);
        }

        if (!validator.isNumeric(String(price)) || !validator.isNumeric(String(stock))) {
            res.response(null, "Price and stock must be numbers", 400);
        }

        if (price <= 0) {
            res.response(null, "Price must be greater than 0", 400);
        }

        if (!validator.isMongoId(String(idUser))) {
            res.response(null, "Invalid idUser", 400);
        }

        if (!validator.isMongoId(String(id))) {
            res.response(null, "Invalid product id", 400);
        }


        const producto = {
            pathImage,
            name,
            description,
            price,
            stock,
            idUser
        }
        logB.addBitacora(`ENDPOINT: /product/update/:id -El producto: ${id} se ha actualizado.`);
        productRepository.updateProduct(id, producto);
        res.response(null, "Product updated successfully", 200);
    } catch (error) {
        console.error(error);
        logB.addBitacora(`ENDPOINT: /product/update/:id - Hubo un error: ${error.message.replace("\n", " ")}`);
        res.response(null, error.message, 500);
    }
}

export const seeAllProducts = async (req, res) => {
    try {
        const products = await productRepository.obtenerTodos();
        logB.addBitacora(`ENDPOINT: /product/all - Se han encontrado ${products.length} productos.`);
        res.response(products, "Products found", 200);
    } catch (error) {
        console.error(error);
        logB.addBitacora(`ENDPOINT: /product/all - Hubo un error: ${error.message.replace("\n", " ")}`);
        res.response(null, error.message, 500);
    }
}

export const seeProductById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!validator.isMongoId(String(id))) {
            res.response(null, "Invalid product id", 400);
        }

        logB.addBitacora(`ENDPOINT: /product/see/:id - Se ha buscado el producto con ID: ${id}`);
        const product = await productRepository.getProductById(id);
        res.response(product, "Product found", 200);
    } catch (error) {
        console.error(error);
        logB.addBitacora(`ENDPOINT: /product/see/:id - Hubo un error: ${error.message.replace("\n", " ")}`);
        res.response(null, error.message, 500);
    }
}

export const getProductsByVendor = async (req, res) => {
    try {
        const { id } = req.params;
        if (!validator.isMongoId(String(id))) {
            res.response(null, "Invalid idUser", 400);
        }

        logB.addBitacora(`ENDPOINT: /product/get/:id - Se han buscado los productos del vendedor con ID: ${id}`);
        const products = await productRepository.getProductsByVendor(id);
        res.response(products, "Products found", 200);
    } catch (error) {
        console.error(error);
        logB.addBitacora(`ENDPOINT: /product/get/:id - Hubo un error: ${error.message.replace("\n", " ")}`);
        res.response(null, error.message, 500);
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if (!validator.isMongoId(String(id))) {
            res.response(null, "Invalid product id", 400);
        }

        const r = await productRepository.deleteProduct(id);
        if (!r) {
            throw new Error("Product not deleted");
        }

        logB.addBitacora(`ENDPOINT: /product/delete/:id - Se ha eliminado el producto con ID: ${id}`);
        res.response(null, "Product deleted", 200);
    } catch (error) {
        console.error(error);
        logB.addBitacora(`ENDPOINT: /product/delete/:id - Hubo un error: ${error.message.replace("\n", " ")}`);
        res.response(null, error.message, 500);
    }
}

export const uploadImage = async (req, res) => {
    
    try {
        const { buffer, originalname } = req.file;
        const fileExtension = originalname.split('.').pop();

        const { Key, Location } = await saveObj(buffer, fileExtension);
        logB.addBitacora(`ENDPOINT: /product/addImage - Se ha subido la imagen con nombre: ${Key}`);
        res.response({ Key, Location }, "Imagen subida correctamente")

    } catch (error) {
        console.log(error);
        logB.addBitacora(`ENDPOINT: /product/addImage - Hubo un error: ${error.message.replace("\n", " ")}`);
        res.response(null, error.message, 500);
    }

};