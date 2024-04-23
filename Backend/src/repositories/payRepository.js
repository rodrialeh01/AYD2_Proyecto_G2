import Pay from '../db/models/pay.model.js';
import BitacoraBDRepository from './bitacorabdRepository.js';

const bdb = new BitacoraBDRepository();
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
                bdb.crearBitacoraBD(`Se añadió el nuevo registro en la tabla PAY`, 'INSERT', new Date());
                return pay;
            }else if(method === 2){
                const pay = new Pay({
                    purchase: idPurchase,
                    method: method,
                    amount: amount,
                    address: address,
                    nit: nit,
                    name: name
                })
                await pay.save();
                bdb.crearBitacoraBD(`Se añadió el nuevo registro en la tabla PAY`, 'INSERT', new Date());
                return pay;
            }
        } catch (error) {
            console.error(error);
            bdb.crearBitacoraBD(`Hubo un error en la tabla PAY`, 'ERROR', new Date());
            return res.response(null, error.message, 500);
        }
    }

    async getPays(){
        bdb.crearBitacoraBD('Se obtuvieron los pagos de la tabla PAY','SELECT',new Date());
        return Pay.find({})
    }
}

export default PayRepository;