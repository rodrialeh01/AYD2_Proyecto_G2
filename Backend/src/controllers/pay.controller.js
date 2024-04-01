import { LogBack } from '../log/bitacora.js';
import PayRepository from "../repositories/payRepository.js";
const payRepository = new PayRepository();

const logB = LogBack.getInstance();

export const getPays = async (req, res) => {
    const pagos = await payRepository.getPays();
    logB.addBitacora('ENDPOINT: /pay/ - Se obtuvieron todos los pagos');
    return res.response(pagos, "Pagos encontrados", 200);
}