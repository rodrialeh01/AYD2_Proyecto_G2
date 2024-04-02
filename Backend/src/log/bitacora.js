import fs from 'fs';   

export class LogBack {
    constructor() {
        this.bitacora = [];
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new LogBack();
        }
        return this.instance;
    }

    addBitacora(description) {
        const now = new Date();
        const timestamp = now.toISOString();
        this.bitacora.push({ timestamp, description});

        // Write to file
        try {
            fs.writeFileSync('logsBack.txt', JSON.stringify(this.bitacora));
            console.log(JSON.stringify(this.bitacora))
        } catch (error) {
            console.error('Error writing to file:', error);
        }
    }

}