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

export const getIngresos = async (req, res) => {
    try {
        const { idVendor } = req.params;
        if (!validator.isMongoId(String(idVendor))) {
            res.response(null, "Invalid idUser", 400);
        }

        const purchases = await purchaseRepository.getPurchasesByIDVendor(idVendor);
        let total = 0;
        let repEnviar = [];

        for (const purchase of purchases) {
            const product = await productRepository.getProductById(purchase.product);
            
            repEnviar.push({
                producto: product.name,
                totalProducto: product.price * purchase.quantity,
            });

            total += product.price * purchase.quantity;
        }

        
        res.response({productos: repEnviar, total}, "Ingresos found", 200);
        
        
    } catch (error) {
        console.error(error);
        res.response(null, error.message, 500);
    }
}

export const getVentasRango = async (req, res) => {
    try {
        const { fechaI, fechaF } = req.query;
        
        if (!fechaI || !fechaF) {
            res.response(null, "All fields are required", 400);
        }
        //turn string to date
        const [yearI, monthI, dayI] = fechaI.split("-");
        const fechaIs = new Date(yearI, monthI - 1, dayI);

        const [yearF, monthF, dayF] = fechaF.split("-");
        const fechaFs = new Date(yearF, monthF - 1, dayF);

        console.log(fechaIs, fechaFs);
        let enviarRespuesta = [];

        const purchases = await purchaseRepository.getPurchasesByDate(fechaIs, fechaFs);
        for (const purchase of purchases) {
            const product = await productRepository.getProductById(purchase.product);
            const date = new Date(purchase.createdAt);
            //format: yyyy-mm-dd
            const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

            const user = await userRepository.getUserByID(purchase.user);
            const vendor = await userRepository.getUserByID(purchase.vendorId);
            let resp = {}
            if (vendor != null) {
                resp = {
                    userName: user.name,
                    vendorName: vendor.name,
                    productName: product.name,
                    price: purchase.price,
                    quantity: purchase.quantity,
                    total: purchase.price * purchase.quantity,
                    date: formattedDate
                }

                enviarRespuesta.push(resp);
            }


        }

        res.response(enviarRespuesta, "Ventas found", 200);
        
    } catch (error) {
        console.error(error);
        res.response(null, error.message, 500);
    }
}

