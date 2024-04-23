import { Schema, model } from 'mongoose';

const bitacoraBDSchema = new Schema(
    {
        descripcion: String,
        tipo: String,
        fecha: Date
    }
);

const BitacoraBD = model('bitacora', bitacoraBDSchema);

export default BitacoraBD;