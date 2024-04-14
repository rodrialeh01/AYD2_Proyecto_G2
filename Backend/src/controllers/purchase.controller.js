import validator from "validator";
import { LogBack } from '../log/bitacora.js';
import PayRepository from "../repositories/payRepository.js";
import ProductRepository from "../repositories/productRepository.js";
import PurchaseRepository from "../repositories/PurchaseRepository.js";
import UserRepository from "../repositories/userRepository.js";
import BitacoraBDRepository from '../repositories/bitacorabdRepository.js';

const purchaseRepository = new PurchaseRepository();
const productRepository = new ProductRepository();
const userRepository = new UserRepository();
const payRepository = new PayRepository();
const logB = LogBack.getInstance();
const bdb = new BitacoraBDRepository();

export const createPurchase = async (req, res) => {
    try {
        const { idUser, idProduct, quantity } = req.body;
        if (!idUser || !idProduct || !quantity) {
            logB.addBitacora("ENDPOINT: /purchase/create - Faltan campos.");
            res.response(null, "All fields are required", 400);
        }

        if (!validator.isMongoId(String(idUser)) || !validator.isMongoId(String(idProduct))) {
            logB.addBitacora("ENDPOINT: /purchase/create - ID inválido.");
            bdb.crearBitacoraBD("ID inválido para crear una compra", 'INSERT', new Date());
            res.response(null, "Invalid idUser or product", 400);
        }

        if (!validator.isNumeric(String(quantity))) {
            logB.addBitacora("ENDPOINT: /purchase/create - Cantidad no es un número.");
            res.response(null, "Quantity must be a number", 400);
        }

        const product = await productRepository.getProductById(idProduct);

        const r = await purchaseRepository.createPurchase(idUser, product, quantity);
        if (!r) {
            throw new Error("Purchase not created");
        }
        logB.addBitacora("ENDPOINT: /purchase/create - Se ha creado una compra.");
        bdb.crearBitacoraBD("Se ha creado una compra", 'INSERT', new Date());
        
        res.response(r, "Purchase created successfully", 201);
    } catch (error) {
        console.error(error);
        logB.addBitacora("ENDPOINT: /purchase/create - Hubo un error: " + error.message.replace("\n", " "));
        bdb.crearBitacoraBD("Hubo un error en la tabla PURCHASE", 'ERROR', new Date());
        res.response(null, error.message, 500);
    }
}

export const createPurchasesWithPay = async (req, res) => {
    logB.addBitacora("Se ha solicitado crear una compra con Pago.");

    try {
        console.log(req.body)
        const { purchases, email, phone, address,nit, name, method, amount, card_number, card_name, month, year, cvv } = req.body;
        console.log(name)
        console.log(nit)
        console.log(address)
        // SE USARA METHOD 1 SI ES PAGO POR TARJETA Y METHOD 2 SI ES PAGO POR PAYPAL
        if(!purchases || !email || !phone || !address || !nit || !name || !method || !amount){
            logB.addBitacora("ENDPOINT: /purchase/pay - Faltan campos.");
            res.response(null, "All fields are required", 400);
        }

        if (!validator.isNumeric(String(phone))) {
            logB.addBitacora("ENDPOINT: /purchase/pay - Teléfono no es un número.");
            res.response(null, "Phone must be a number", 400);
        }

        if (!validator.isNumeric(String(method))) {
            logB.addBitacora("ENDPOINT: /purchase/pay - Método no es un número.");
            res.response(null, "Method must be a number", 400);
        }

        if (!validator.isNumeric(String(amount))) {
            logB.addBitacora("ENDPOINT: /purchase/pay - Monto no es un número.");
            res.response(null, "Amount must be a number", 400);
        }

        if(!validator.isEmail(email)){
            logB.addBitacora("ENDPOINT: /purchase/pay - Correo inválido.");
            return res.response(null, "Invalid email", 400);
        }

        if(!Array.isArray(purchases)){
            logB.addBitacora("ENDPOINT: /purchase/pay - Compras no es un array.");
            return res.response(null, "Purchases is a invalid array", 400);
        }

        if(method === 1){

            if(!card_name || !card_number || !month || !year || !cvv){
                logB.addBitacora("ENDPOINT: /purchase/pay - Faltan campos para tarjeta.");
                res.response(null, "All fields are required", 400);
            }

           /* 
            if(!validator.isNumeric(String(card_number))){
                return res.response(null, "Card number is a invalid Number", 400)
            }*/

            if(!validator.isNumeric(String(year))) {
                logB.addBitacora("ENDPOINT: /purchase/pay - Año no es un número.");
                return res.response(null, "Year is a invalid Number", 400)
            }

            if(!validator.isNumeric(String(month))) {
                logB.addBitacora("ENDPOINT: /purchase/pay - Mes no es un número.");
                return res.response(null, "Month is a invalid Number", 400)
            }

            /*if(!validator.isNumeric(String(cvv))) {
                return res.response(null, "CVV is a invalid Number", 400)
            }*/
        }

        await Promise.all(purchases.map(async (p, index) => {
            if (!validator.isMongoId(String(p.idUser))) {
                logB.addBitacora("ENDPOINT: /purchase/pay - ID de usuario inválido.");
                res.response(null, "Invalid idClient", 400);
            }

            if(!validator.isMongoId(String(p.idProduct))) {
                logB.addBitacora("ENDPOINT: /purchase/pay - ID de producto inválido.");
                res.response(null, "Invalid idProduct", 400);
            }

            if (!validator.isNumeric(String(p.quantity))) {
                logB.addBitacora("ENDPOINT: /purchase/pay - Cantidad no es un número.");
                res.response(null, "Quantity must be a number", 400);
            }

            if (!validator.isNumeric(String(p.price))) {
                logB.addBitacora("ENDPOINT: /purchase/pay - Precio no es un número.");
                bdb.crearBitacoraBD("Precio no es un número para crear una compra con pago", 'INSERT', new Date());
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
        logB.addBitacora("ENDPOINT: /purchase/pay - Se ha creado una compra y un pago.");
        bdb.crearBitacoraBD("Se ha creado una compra y un pago", 'INSERT', new Date());
        res.response(null, "Compra y Pago hecho con éxito", 200)
    }catch(error){
        console.error(error.message);
        logB.addBitacora("ENDPOINT: /purchase/pay - Hubo un error: " + error.message.replace("\n", " "));
        bdb.crearBitacoraBD("Hubo un error en la tabla PURCHASE", 'ERROR', new Date());
        res.response(null, error.message, 500);
    }
}

export const getPurchases = async (req, res) => {
    try {
        const { idVendor } = req.params;
        if (!validator.isMongoId(String(idVendor))) {
            logB.addBitacora("ENDPOINT: /purchase/getPurchase/:idVendor - ID inválido.");
            bdb.crearBitacoraBD("ID inválido para obtener compras", 'SELECT', new Date());
            res.response(null, "Invalid idUser", 400);
        }

        const purchases = await purchaseRepository.getPurchasesByIDVendor(idVendor);
        logB.addBitacora(`ENDPOINT: /purchase/getPurchase/:idVendor - Se han encontrado ${purchases.length} compras.`);
        bdb.crearBitacoraBD(`Se han encontrado ${purchases.length} compras`, 'SELECT', new Date());
        res.response(purchases, "Purchases found", 200);
    } catch (error) {
        console.error(error);
        logB.addBitacora(`ENDPOINT: /purchase/getPurchase/:idVendor - Hubo un error: ${error.message.replace("\n", " ")}`);
        bdb.crearBitacoraBD("Hubo un error en la tabla PURCHASE", 'ERROR', new Date());
        res.response(null, error.message, 500);
    }
};

export const getDetailedPurchase = async (req, res) => {
    try {
        const { idVendor } = req.params;
        if (!validator.isMongoId(String(idVendor))) {
            logB.addBitacora("ENDPOINT: /purchase/getDetailPurchase/:idVendor - ID inválido.");
            bdb.crearBitacoraBD("ID inválido para obtener compras detalladas", 'SELECT', new Date());
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

        logB.addBitacora(`ENDPOINT: /purchase/getDetailPurchase/:idVendor - Se han encontrado ${detailedPurchases.length} compras detalladas.`);
        bdb.crearBitacoraBD(`Se han encontrado ${detailedPurchases.length} compras detalladas`, 'SELECT', new Date());
        res.response(detailedPurchases, "Purchases found", 200);

    } catch (error) {
        console.error(error);
        logB.addBitacora(`ENDPOINT: /purchase/getDetailPurchase/:idVendor - Hubo un error: ${error.message.replace("\n", " ")}`);
        bdb.crearBitacoraBD("Hubo un error en la tabla PURCHASE", 'ERROR', new Date());
        res.response(null, error.message, 500);
    }
};

export const getIngresos = async (req, res) => {
    try {
        const { idVendor } = req.params;
        if (!validator.isMongoId(String(idVendor))) {
            logB.addBitacora("ENDPOINT: /purchase/getIngresos/:idVendor - ID inválido.");
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

        // juntar todos los productos iguales en 1 y sumar sus totales
        repEnviar = repEnviar.reduce((acc, curr) => {
            const index = acc.findIndex(p => p.producto === curr.producto);
            if (index === -1) {
                acc.push(curr);
            } else {
                acc[index].totalProducto += curr.totalProducto;
            }
            return acc;
        }, []);



        logB.addBitacora(`Se han encontrado ${repEnviar.length} ingresos.`);
        bdb.crearBitacoraBD(`Se han encontrado ${repEnviar.length} ingresos`, 'SELECT', new Date());
        res.response({productos: repEnviar, total}, "Ingresos found", 200);
        
        
    } catch (error) {
        console.error(error);
        logB.addBitacora(`ENDPOINT: /purchase/getIngresos/:idVendor - Hubo un error`);
        bdb.crearBitacoraBD("Hubo un error en la tabla PURCHASE", 'ERROR', new Date());
        res.response(null, error.message, 500);
    }
}

export const getVentasRango = async (req, res) => {
    try {
        const { fechaI, fechaF } = req.query;
        
        if (!fechaI || !fechaF) {
            logB.addBitacora("ENDPOINT: /purchase/getVentasRango - Faltan campos.");
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
        bdb.crearBitacoraBD(`Se han encontrado ${enviarRespuesta.length} ventas en el rango de fechas`, 'SELECT', new Date());
        res.response(enviarRespuesta, "Ventas found", 200);
        
    } catch (error) {
        console.error(error);
        logB.addBitacora(`ENDPOINT: /purchase/getVentasRango - Hubo un error`);
        bdb.crearBitacoraBD("Hubo un error en la tabla PURCHASE", 'ERROR', new Date());
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

        logB.addBitacora(`ENDPOINT: /purchase/getTop10Sellers - Se han encontrado ${topSellersInfo.length} vendedores top.`);
        bdb.crearBitacoraBD(`Se han encontrado ${topSellersInfo.length} vendedores top`, 'SELECT', new Date());
        res.response(topSellersInfo, "Top 10 sellers found", 200);
    } catch (error) {
        console.error(error);
        logB.addBitacora(`ENDPOINT: /purchase/getTop10Sellers - Hubo un error: ${error.message.replace("\n", " ")}`);
        bdb.crearBitacoraBD("Hubo un error en la tabla PURCHASE", 'ERROR', new Date());
        res.response(null, error.message, 500);
    }
}

export const getReportUserTypes = async (req, res) => {
    //Tipos de usuarios
    try {
        // Obtener todos los usuarios de la base de datos
        const users = await userRepository.obtenerTodos();

        // Inicializar un objeto para almacenar el recuento de usuarios por tipo
        let userCounts = {
            1: 0, // Cliente
            2: 0, // Vendedor
            3: 0  // Administrador
        };

        // Contar cuántos usuarios hay de cada tipo
        users.forEach(user => {
            userCounts[user.type] += 1;
        });

        // Convertir el objeto de recuento en un array de pares [tipo de usuario, cantidad]
        const userCountsArray = Object.entries(userCounts);

        // Enviar la respuesta con el recuento de usuarios por tipo
        logB.addBitacora("ENDPOINT: /purchase/getReportUserTypes - Cantidad de usuarios por tipo encontrada");
        res.response(userCountsArray, "Cantidad de usuarios por tipo encontrada", 200);
    } catch (error) {
        console.error(error);
        logB.addBitacora(`ENDPOINT: /purchase/getReportUserTypes - Hubo un error`);
        res.response(null, error.message, 500);
    }
};
