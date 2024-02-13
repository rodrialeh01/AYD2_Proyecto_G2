import Product from "../db/models/product.model.js";

export const createProduct = async (req, res) => {
    try {
        const { pathImage, name, description, price, stock, idUser } = req.body;
        console.log(req.body);
        if (!pathImage || !name || !description || !price || !stock || !idUser) {
            return res.response(null, "All fields are required", 400);
        }

        if (typeof price !== "number" || typeof stock !== "number") {
            return res.response(null, "Price and stock must be numbers", 400);
        }

        if (price <= 0 ) {
            return res.response(null, "Price must be greater than 0", 400);
        }

        Product.create({
            pathImage: pathImage,
            name: name,
            description: description,
            price: price,
            stock: stock,
            idUser: idUser
        })
        res.response(null, "Product created successfully", 200);


    } catch (error) {
        console.error(error);
        res.response(null, error.message, 500);
    }
}