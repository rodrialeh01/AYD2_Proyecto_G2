import fs from 'fs';   

export class Bitacora {
    constructor() {
        this.bitacora = [];
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new Bitacora();
        }
        return this.instance;
    }

    addBitacora(accion, description) {
        const now = new Date();
        const timestamp = now.toISOString();
        this.bitacora.push({ timestamp, accion, description});

        // Write to file
        try {
            fs.writeFileSync('Bitacora.txt', JSON.stringify(this.bitacora));
            console.log(JSON.stringify(this.bitacora))
        } catch (error) {
            console.error('Error writing to file:', error);
        }
    }

}