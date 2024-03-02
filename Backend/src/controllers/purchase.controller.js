import validator from "validator";
import PurchaseRepository from "../repositories/PurchaseRepository.js";
import ProductRepository from "../repositories/productRepository.js";
const purchaseRepository = new PurchaseRepository();
const productRepository = new ProductRepository();

export const createPurchase = async (req, res) => {
    try {
        const { idUser, idProduct, quantity } = req.body;
        if (!idUser || !idProduct || !quantity) {
            res.response(null, "All fields are required", 400);
        }

        if (!validator.isMongoId(String(idUser)) || !validator.isMongoId(String(idProduct))) {
            res.response(null, "Invalid idUser or product", 400);
        }

        if (!validator.isNumeric(String(quantity))) {
            res.response(null, "Quantity must be a number", 400);
        }

        const product = await productRepository.getProductById(idProduct);

        const r = await purchaseRepository.createPurchase(idUser, product, quantity);
        if (!r) {
            throw new Error("Purchase not created");
        }

        res.response(r, "Purchase created successfully", 201);
    } catch (error) {
        console.error(error);
        res.response(null, error.message, 500);
    }
}