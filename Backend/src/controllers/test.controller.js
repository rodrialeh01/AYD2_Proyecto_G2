import mongoose from 'mongoose';
import { saveObj } from '../config/objectHandler.js';

export const ping = async (req, res) => {
    res.send({ message: "pong" });
};

export const pong = async (req, res) => {
    console.log(req.body);
};

export const getInfoConnection = async (req, res) => {
    const databases = await mongoose.connection.db.admin().listDatabases();

    return res.send({ databases });
};

export const uploadImage = async (req, res) => {
    
    try {
        const { buffer, originalname } = req.file;
        const fileExtension = originalname.split('.').pop();

        const { Key, Location } = await saveObj(buffer, fileExtension);
        
        res.response({ Key, Location }, "Imagen subida correctamente")

    } catch (error) {
        console.log(error);
        res.response(null, error.message, 500);
    }

};