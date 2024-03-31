import Purchase from '../db/models/purchase.model.js';
import { Bitacora } from '../bitacora/bitacora.js';

const bitacora = Bitacora.getInstance();

class PurchaseRepository {
    async createPurchase(idUser, product, quantity, email, phone) {
        try{
            if(product.stock > 0){
                const cantidad = product.stock - quantity;
                if(cantidad < 0){
                    console.log("No stock");
                    return res.response(null, "No stock", 400);
                }
                const purchase = new Purchase({
                    user: idUser,
                    product: product._id,
                    quantity: quantity,
                    price: product.price,
                    vendorId: product.idUser,
                    email: email,
                    phone: phone
                })
                await purchase.save();

                product.stock -= quantity;
                await product.save();

                return purchase;
            }
        } catch (error) {
            console.error(error);
            return res.response(null, error.message, 500);
        }
    }

    async getPurchasesByIDVendor(idVendor) {
        try {
            const purchases = await Purchase.find({ vendorId: String(idVendor) });
            bitacora.addBitacora("GET",'Obtener compras del vendedor con ID: ' + idVendor );
            return purchases;
        } catch (error) {
            console.error(error);
            
        }
    }

    async getPurchasesByDate(fechaI, fechaF) {
        try {
            const purchases = await Purchase.find({ createdAt: { $gte: fechaI, $lte: fechaF } });
            bitacora.addBitacora("GET",'Obtener compras por fecha');
            return purchases;
        } catch (error) {
            console.error(error);
            
        }
    }

    async getAllPurchases() {
        try {
            const purchases = await Purchase.find();
            bitacora.addBitacora("GET",'Obtener todas las compras');
            return purchases;
        } catch (error) {
            console.error(error);
            
        }
    }
    
}

export default PurchaseRepository;