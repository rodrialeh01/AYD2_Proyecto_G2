import validator from "validator";
import PurchaseRepository from "../repositories/PurchaseRepository.js";
import ProductRepository from "../repositories/productRepository.js";
import UserRepository from "../repositories/UserRepository.js";

const purchaseRepository = new PurchaseRepository();
const productRepository = new ProductRepository();
const userRepository = new UserRepository();

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

export const getPurchases = async (req, res) => {
    try {
        const { idVendor } = req.params;
        if (!validator.isMongoId(String(idVendor))) {
            res.response(null, "Invalid idUser", 400);
        }

        const purchases = await purchaseRepository.getPurchasesByIDVendor(idVendor);
        res.response(purchases, "Purchases found", 200);
    } catch (error) {
        console.error(error);
        res.response(null, error.message, 500);
    }
};

export const getDetailedPurchase = async (req, res) => {
    try {
        const { idVendor } = req.params;
        if (!validator.isMongoId(String(idVendor))) {
            res.response(null, "Invalid idUser", 400);
        }


        const purchases = await purchaseRepository.getPurchasesByIDVendor(idVendor);
        const detailedPurchases = [];
        //mix purchases with products:
        for (const purchase of purchases) {
            const product = await productRepository.getProductById(purchase.product);
            const user = await userRepository.getUserByID(purchase.user);
            detailedPurchases.push({
                purchase: purchase,
                userName: user.name,
                productName: product.name,
                total: purchase.price * purchase.quantity
            });
        }

        res.response(detailedPurchases, "Purchases found", 200);

    } catch (error) {
        console.error(error);
        res.response(null, error.message, 500);
    }
};
