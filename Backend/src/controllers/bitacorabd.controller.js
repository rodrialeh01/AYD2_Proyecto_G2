import BitacoraBDRepository from "../repositories/bitacorabdRepository.js";

const bdb = new BitacoraBDRepository();

export const getBitacoras = async (req, res) => {
    try {
        const bitacoras = await bdb.getBitacorasBD();
        return res.response(bitacoras, "Bitacoras found", 200);
    } catch (error) {
        console.error(error);
        return res.response(null, error.message, 500);
    }
}