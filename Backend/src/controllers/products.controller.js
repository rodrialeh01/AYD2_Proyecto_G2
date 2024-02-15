import ProductRepository from "../repositories/productRepository.js";

const productRepository = new ProductRepository();

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

        if (validator.isMongoId(String(idUser))) {
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

        productRepository.crearProducto(producto);
        res.response(r, "Product created successfully", 201);
    } catch (error) {
        console.error(error);
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

        if (validator.isMongoId(String(idUser))) {
            res.response(null, "Invalid idUser", 400);
        }

        if (validator.isMongoId(String(id))) {
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

        productRepository.updateProduct(id, producto);
        res.response(null, "Product updated successfully", 200);
    } catch (error) {
        console.error(error);
        res.response(null, error.message, 500);
    }
}

export const seeAllProducts = async (req, res) => {
    try {
        const products = await productRepository.obtenerTodos();
        res.response(products, "Products found", 200);
    } catch (error) {
        console.error(error);
        res.response(null, error.message, 500);
    }
}