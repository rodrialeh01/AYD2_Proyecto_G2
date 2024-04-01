import BitacoraBD from "../db/models/bitacorabd.model.js";

class BitacoraBDRepository {
    async crearBitacoraBD(descripcion,tipo, fecha) {
        try{
            const bitacora = new BitacoraBD({
                descripcion: descripcion,
                tipo: tipo,
                fecha: fecha
            })
            await bitacora.save();
            return bitacora;
        } catch (error) {
            console.error(error);
            return res.response(null, error.message, 500);
        }
    }

    async getBitacorasBD(){
        return BitacoraBD.find({})
    }
}

export default BitacoraBDRepository;