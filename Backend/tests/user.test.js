import request from "supertest";
import app from "../src/app.js";

// ---------------------------- PRUEBAS UNITARIAS ----------------------------



//obtener todos los usuarios
describe("Get de todos los usuarios", () => {
    test("Debería de devolver un status 200", async () => {
        const response = await request(app)
            .get("/users/all");
        expect(response.statusCode).toBe(200);
    }
    );
}
);

// addImage
describe("Post de una imagen a S3", () => {
    test("Debería de subir una imagen a S3 y devolver un status 200", async () => {
        const response = await request(app)
            .post("/users/addImage")
            // formData
            .attach("image", "tests/fotografia.jpg");
        expect(response.statusCode).toBe(200);
    }
    );
}
);

// Listar todos los usuarios
describe("Get de todos los usuarios", () => {
    test("Debería de devolver un status 200", async () => {
        const response = await request(app)
            .get("/users/all");
        expect(response.statusCode).toBe(200);
    }
    );
}
);

