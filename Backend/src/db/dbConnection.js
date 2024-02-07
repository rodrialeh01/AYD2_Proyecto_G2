import mongoose from 'mongoose';
import { MDBConfig } from '../config/credentials.js';

export const connect = () => {

    let url = `mongodb://${MDBConfig.host}:${MDBConfig.port}/${MDBConfig.database}`;

    if (MDBConfig.user && MDBConfig.password) {
        // mongodb://root:root@localhost:27017/?authMechanism=DEFAULT
        url = `mongodb://${MDBConfig.user}:${MDBConfig.password}@${MDBConfig.host}:${MDBConfig.port}/${MDBConfig.database}?authSource=admin`;
    }

    try {
        mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connected');
    } catch (error) {
        console.log('Database connection failed');
        console.log(error);
    }
};