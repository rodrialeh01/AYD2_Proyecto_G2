import dotenv from 'dotenv';

dotenv.config();

export const MDBConfig = {
    host: process.env.MDB_HOST,
    user: process.env.MDB_USER,
    password: process.env.MDB_PASSWORD,
    database: process.env.MDATABASE,
    port: process.env.MDB_PORT,
    local: process.env.MDB_IS_LOCAL.toLowerCase() === 'true'
};

export const bucketConfig = {
    name: process.env.BUCKET_NAME,
    region: process.env.BUCKET_REGION,
    id: process.env.BUCKET_ID,
    key: process.env.BUCKET_ID
}

export const API_PORT = process.env.API_PORT || 4000;