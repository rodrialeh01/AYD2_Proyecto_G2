import validator from "validator";
import { LogBack } from '../log/bitacora.js';
import PayRepository from "../repositories/payRepository.js";
import ProductRepository from "../repositories/productRepository.js";
import PurchaseRepository from "../repositories/PurchaseRepository.js";
import UserRepository from "../repositories/UserRepository.js";

const purchaseRepository = new PurchaseRepository();
const productRepository = new ProductRepository();
const userRepository = new UserRepository();
const payRepository = new PayRepository();
const logB = LogBack.getInstance();

export const createPurchase = async (req, res) => {
    logB.addBitacora("Se ha solicitado crear una compra.");
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

export const createPurchasesWithPay = async (req, res) => {
    logB.addBitacora("Se ha solicitado crear una compra con Pago.");
    try {
        const { purchases, email, phone, address,nit, name, method, amount, card_number, card_name, month, year, cvv } = req.body;
        // SE USARA METHOD 1 SI ES PAGO POR TARJETA Y METHOD 2 SI ES PAGO POR PAYPAL
        if(!purchases || !email || !phone || !address || !nit || !name || !method || !amount){
            res.response(null, "All fields are required", 400);
        }

        if (!validator.isNumeric(String(phone))) {
            res.response(null, "Phone must be a number", 400);
        }

        if (!validator.isNumeric(String(method))) {
            res.response(null, "Method must be a number", 400);
        }

        if (!validator.isNumeric(String(amount))) {
            res.response(null, "Amount must be a number", 400);
        }

        if(!validator.isEmail(email)){
            return res.response(null, "Invalid email", 400);
        }

        if(!Array.isArray(purchases)){
            return res.response(null, "Purchases is a invalid array", 400);
        }

        if(method === 1){
            if(!card_name || !card_number || !month || !year || !cvv){
                res.response(null, "All fields are required", 400);
            }
            if(!validator.isNumeric(String(card_number))){
                return res.response(null, "Card number is a invalid Number", 400)
            }

            if(!validator.isNumeric(String(year))) {
                return res.response(null, "Year is a invalid Number", 400)
            }

            if(!validator.isNumeric(String(month))) {
                return res.response(null, "Month is a invalid Number", 400)
            }

            if(!validator.isNumeric(String(cvv))) {
                return res.response(null, "CVV is a invalid Number", 400)
            }
        }

        await Promise.all(purchases.map(async (p, index) => {
            if (!validator.isMongoId(String(p.idUser))) {
                res.response(null, "Invalid idClient", 400);
            }

            if(!validator.isMongoId(String(p.idProduct))) {
                res.response(null, "Invalid idProduct", 400);
            }

            if (!validator.isNumeric(String(p.quantity))) {
                res.response(null, "Quantity must be a number", 400);
            }

            if (!validator.isNumeric(String(p.price))) {
                res.response(null, "Price must be a number", 400);
            }
            
            const product = await productRepository.getProductById(p.idProduct);
            const compraproducto = await purchaseRepository.createPurchase(p.idUser, product, p.quantity, email, phone)
            console.log(compraproducto._id)
            const pago = await payRepository.crearPago(compraproducto._id, method, amount,address,nit, name, card_number, card_name, month, year, cvv)
            if(!pago){
                throw new Error("Purchase and Pay not created");
            }
        }));
        res.response(null, "Compra y Pago hecho con éxito", 200)
    }catch(error){
        console.error(error.message);
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

        logB.addBitacora(`Se han encontrado ${detailedPurchases.length} compras detalladas.`);

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

        logB.addBitacora(`Se han encontrado ${repEnviar.length} ingresos.`);
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
        logB.addBitacora(`Se han encontrado ${enviarRespuesta.length} ventas en el rango de fechas.`);
        res.response(enviarRespuesta, "Ventas found", 200);
        
    } catch (error) {
        console.error(error);
        res.response(null, error.message, 500);
    }
}

export const getTop10Sellers = async (req, res) => {
    //Obtener todas las ventas
    try {
        const purchases = await purchaseRepository.getAllPurchases();
        let salesByVendor = {};


        purchases.forEach(purchase => {
            const vendorId = purchase.vendorId;
            if (salesByVendor[vendorId]) {
                salesByVendor[vendorId] +=  purchase.quantity;
            } else {
                salesByVendor[vendorId] = purchase.quantity;
            }
        });

        const salesArray = Object.entries(salesByVendor);

        salesArray.sort((a, b) => b[1] - a[1]);

        const top10 = salesArray.slice(0, 10);

        const topSellersInfo = await Promise.all(top10.map(async ([vendorId, quantity]) => {
            const vendor = await userRepository.getUserByID(vendorId);
            return {
                vendorName: vendor.name,
                quantity
            }
        }));

        res.response(topSellersInfo, "Top 10 sellers found", 200);
    } catch (error) {
        console.error(error);
        res.response(null, error.message, 500);
    }
}