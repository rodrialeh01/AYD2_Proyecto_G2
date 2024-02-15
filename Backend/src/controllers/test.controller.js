import mongoose from 'mongoose';

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