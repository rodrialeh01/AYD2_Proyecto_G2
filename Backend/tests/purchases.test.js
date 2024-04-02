import request from "supertest";
import app from "../src/app.js";

// ---------------------------- PRUEBAS UNITARIAS ----------------------------

// Crear una compra
describe("Crear Purchase con Pago en Tarjeta de Crédito", () => {
    test("Should return status 200", async () => {
        const response = await request(app)
            .post("/purchase/pay")
            .send({
                "purchases": [
                    {
                        "idUser": "65e2eca683fa3561e9ba3e88",
                        "idProduct": "65e34ef52983c7fb1b35e588",
                        "price": 12,
                        "quantity": 0,
                        "idVendor": "65e28f386a3618633e7a7b93"
                    }
                ],
                "email": "emai@email.com",
                "phone": 12345678,
                "address":"2da Calle Zona 1",
                "nit": "12345-L",
                "name": "Usuario Prueba",
                "method": 1,
                "amount": 12,
                "card_number": "1234567812345678",
                "card_name": "USUARIO PRUEBA",
                "month": 1,
                "year": 2025,
                "cvv": 1234
            });
        expect(response.statusCode).toBe(200);
    });
});

// Crear una compra con Pago en PayPal
describe("Crear Purchase con Pago en PayPal", () => {
    test("Should return status 200", async () => {
        const response = await request(app)
            .post("/purchase/pay")
            .send({
                "purchases": [
                    {
                        "idUser": "65e2eca683fa3561e9ba3e88",
                        "idProduct": "65e34ef52983c7fb1b35e588",
                        "price": 12,
                        "quantity": 0,
                        "idVendor": "65e28f386a3618633e7a7b93"
                    }
                ],
                "email": "emai@email.com",
                "phone": 12345678,
                "address":"2da Calle Zona 1",
                "nit": "12345-L",
                "name": "Usuario Prueba",
                "method": 2,
                "amount": 12
            });
            expect(response.statusCode).toBe(200);
        });
    }
);

// Obtener todas las compras
describe("Get Purchases", () => {
    test("Should return status 200", async () => {
        const response = await request(app)
            .get("/purchase/getPurchases");
            expect(response.body.data).not.toBeNull();
    });
}
);

// Get Purchase by id Vendor
describe("Get Purchase by id Vendor", () => {
    test("Should return status 200", async () => {
        const response = await request(app)
            .get("/purchase/getPurchase/65cbf0042efb66288c71e1b2");
        expect(response.statusCode).toBe(200);
    });
});

// get ingresos
describe("Get Ingresos", () => {
    test("Debe retornar el mensaje correcto", async () => {
        const response = await request(app)
            .get("/purchase/getIngresos/65fcd17613c13d5f1b347803");
        expect(response.body.message).toBe("Ingresos found");
    });
});

// get reporte de ventas
describe("Get reporte de ventas", () => {
    test("Debe retornar el mensaje correcto", async () => {
        const response = await request(app)
            .get("/purchase/getVentas?fechaI=21-03-2024&fechaF=22-03-2024");
        expect(response.body.message).toBe("Ventas found");
    });
});


// ---------------------------- PRUEBAS DE INTEGRACIÓN ----------------------------

describe("Prueba de Integración de Compras", () => {
    test("Crea una compra", async () => {
        const response = await request(app)
            .post("/purchase/pay")
            .send({
                "purchases": [
                    {
                        "idUser": "65e2eca683fa3561e9ba3e88",
                        "idProduct": "65e34ef52983c7fb1b35e588",
                        "price": 12,
                        "quantity": 0,
                        "idVendor": "65e28f386a3618633e7a7b93"
                    }
                ],
                "email": "emai@email.com",
                "phone": 12345678,
                "address":"2da Calle Zona 1",
                "nit": "12345-L",
                "name": "Usuario Prueba",
                "method": 1,
                "amount": 12,
                "card_number": "1234567812345678",
                "card_name": "USUARIO PRUEBA",
                "month": 1,
                "year": 2025,
                "cvv": 1234
            });
            expect(response.body.message).toBe("Compra y Pago hecho con éxito");
    });
});