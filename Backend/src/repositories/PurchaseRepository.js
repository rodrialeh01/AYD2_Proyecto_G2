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
                    quantity: quantity
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
}

export default PurchaseRepository;