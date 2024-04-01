import { LogBack } from '../log/bitacora.js';
import BitacoraBDRepository from '../repositories/bitacorabdRepository.js';
import PayRepository from "../repositories/payRepository.js";
const payRepository = new PayRepository();

const logB = LogBack.getInstance();
const bdb = new BitacoraBDRepository();

export const getPays = async (req, res) => {
    const pagos = await payRepository.getPays();
    logB.addBitacora('ENDPOINT: /pay/ - Se obtuvieron todos los pagos');
    bdb.crearBitacoraBD('Se obtuvieron todos los pagos de la tabla Producto','SELECT',new Date());
    return res.response(pagos, "Pagos encontrados", 200);
}