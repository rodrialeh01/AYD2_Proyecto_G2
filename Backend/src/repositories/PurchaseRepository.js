import Purchase from '../db/models/purchase.model.js';

class PurchaseRepository {
    async createPurchase(idUser, product, quantity) {
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
                    vendorId: product.idUser
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
            return purchases;
        } catch (error) {
            console.error(error);
            
        }
    }

    async getPurchasesByDate(fechaI, fechaF) {
        try {
            const purchases = await Purchase.find({ createdAt: { $gte: fechaI, $lte: fechaF } });
            return purchases;
        } catch (error) {
            console.error(error);
            
        }
    }
    
}

export default PurchaseRepository;