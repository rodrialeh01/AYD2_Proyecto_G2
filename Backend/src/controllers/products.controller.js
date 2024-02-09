import productModel from "../db/models/product.model";

export const createProduct = async (req, res) => {
    try {
        const {pathImage, name, description, price, stock, idUser} = req.body;
        
    } catch (error) {
        console.error(error);
        res.response(null, error.message, 500);
    }
}