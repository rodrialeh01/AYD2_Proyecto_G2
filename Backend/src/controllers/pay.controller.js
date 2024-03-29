import PayRepository from "../repositories/payRepository.js";

const payRepository = new PayRepository();

export const getPays = async (req, res) => {
    const pagos = await payRepository.getPays();
    return res.response(pagos, "Pagos encontrados", 200);
}