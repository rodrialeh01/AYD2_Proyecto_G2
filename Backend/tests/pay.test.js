import request from "supertest";
import app from "../src/app.js";

// ---------------------------- PRUEBAS UNITARIAS ----------------------------

// Obtener todos los pagos

describe("Get de todos los pagos", () => {
    test("Debería de devolver pagos o un array vacio", async () => {
        const response = await request(app)
            .get("/pay/");
        expect(response.body.data).not.toBeNull();
    });
});