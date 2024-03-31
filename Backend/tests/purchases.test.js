import app from "../src/app.js";
import request from "supertest";

// Crear una compra

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

