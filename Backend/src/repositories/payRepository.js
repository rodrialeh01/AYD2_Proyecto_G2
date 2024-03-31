import Pay from '../db/models/pay.model.js';

class PayRepository {
    async crearPago(idPurchase, method, amount, address,nit,name, card_number=null, card_name=null, month= null, year=null, cvv=null) {
        try{
            if(method === 1){
                const pay = new Pay({
                    purchase: idPurchase,
                    method: method,
                    amount: amount,
                    address: address,
                    nit: nit,
                    name: name,
                    card_number: card_number,
                    card_name: card_name,
                    month: month,
                    year: year,
                    cvv: cvv
                })
                pay.card_number = await pay.encryptCard(card_number);
                await pay.save();
                return pay;
            }else if(method === 2){
                const pay = new Pay({
                    purchase: idPurchase,
                    method: method,
                    amount: amount
                })
                await pay.save();
                return pay;
            }
        } catch (error) {
            console.error(error);
            return res.response(null, error.message, 500);
        }
    }

    async getPays(){
        return Pay.find({})
    }
}

export default PayRepository;