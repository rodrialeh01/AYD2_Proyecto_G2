import mongoose from 'mongoose';
import { MDBConfig } from '../config/credentials.js';

class databaseConnection {
    static instance = null;

    constructor() {
        if (!databaseConnection.instance) {
            this._connect();
            databaseConnection.instance = this;
        }
        return databaseConnection.instance;
    }

    _connect() {
        let url = `mongodb://${MDBConfig.host}:${MDBConfig.port}/${MDBConfig.databaseConnection}`;

        if (MDBConfig.user && MDBConfig.password && MDBConfig.local) {
            url = `mongodb://${MDBConfig.user}:${MDBConfig.password}@${MDBConfig.host}:${MDBConfig.port}/${MDBConfig.database}?authSource=admin`;
        } else if(!MDBConfig.local) {
            url = `mongodb+srv://${MDBConfig.user}:${MDBConfig.password}@${MDBConfig.host}/${MDBConfig.database}`;
        }

        mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log('Database connected');
        }).catch((error) => {
            console.error('Database connection failed', error);
        });
    }
}

export default databaseConnection;