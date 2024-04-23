import request from "supertest";
import app from "../src/app.js";

// ---------------------------- PRUEBAS UNITARIAS ----------------------------
//PRODUCTO TEST
// REVIEW TEST
// Crear un producto
let idProduct = "";
let idReview = "";
let idTest = "660b49dc346e9f4f99ba34b2";
describe("Post de algún producto", () => {
    test("Debería de crear un producto y devolver un mensaje específico", async () => {
        const response = await request(app)
            .post("/products/create")
            .send({
                "pathImage": "https://www.floristeriasguatemala.com/media/catalog/product/cache/9e8f7fb7c4789ff7af581d9bcc93d7a8/o/s/oso_peluche.jpg",
                "name": "Osito de Peluche",
                "description": "Oso de peluche, ideal para acompañar tus flores y sorprender a esa persona tan especial.",
                "price": 22.00,
                "stock": 2,
                "idUser": idTest
            });


        idProduct = response.body.data._id;

        expect(response.body.message).toBe("Product created successfully");

    }
    );
}
);

// addImage
describe("Post de una imagen a S3", () => {
    test("Debería de subir una imagen a S3 y devolver un status 200", async () => {
        const response = await request(app)
            .post("/products/addImage")
            // formData
            .attach("image", "tests/oso_peluche.jpg");
        expect(response.statusCode).toBe(200);
    }
    );
}
);


// Listar todos los productos
describe("Get de todos los productos", () => {
    test("Debería de devolver un status 200", async () => {
        const response = await request(app)
            .get("/products/all");
        expect(response.statusCode).toBe(200);
    }
    );
}
);

// Listar un producto por su id
describe("Get de un producto por su id", () => {
    test("Debería de devolver un status 200", async () => {
        const response = await request(app)
            .get("/products/see/"+idProduct);
        expect(response.statusCode).toBe(200);
    }
    );
}
);

// Actualizar un producto
describe("Patch de un producto", () => {
    test("Debería de actualizar un producto y devolver un status 200", async () => {
        const response = await request(app)
            .patch("/products/update/"+idProduct)
            .send({
                "pathImage": "https://www.floristeriasguatemala.com/media/catalog/product/cache/9e8f7fb7c4789ff7af581d9bcc93d7a8/o/s/oso_peluche.jpg",
                "name": "Osito de Peluche",
                "description": "Oso de peluche, ideal para acompañar tus flores y sorprender a esa persona tan especial.",
                "price": 22.00,
                "stock": 1, // Se cambia el stock
                "idUser": idTest
            });
        expect(response.statusCode).toBe(200);
    }
    );
}
);

// Creamos una review al producto
describe("Post de una review", () => {
    test("Debería de crear una review y devolver el mensaje Review created", async () => {
        const response = await request(app)
            .post("/review/create")
            .send({
                "idUser": idTest,
                "idProduct": idProduct,
                "rating": 1,
                "comment": "Muy malo, me llegó roto"
            });


        idReview = response.body.data._id;

        expect(response.body.message).toBe("Review created");
    }
    );
}
);

// Editar una review
describe("Put de una review", () => {
    test("Debería de editar una review y devolver un status 200", async () => {
        const response = await request(app)
            .put("/review/update/" + idReview)
            .send({
                "rating": 2,
                "comment": "Muy malo, me llegó roto. No lo recomiendo"
            });
        expect(response.statusCode).toBe(200);
    }
    );
}
);

// Eliminar una review
describe("Delete de una review", () => {
    test("Debería de eliminar una review y devolver un mensaje Review deleted", async () => {
        const response = await request(app)
            .delete("/review/delete/" + idReview);
        expect(response.body.message).toBe("Review deleted");
    }
    );
}
);

//Obtener todas las reviews
describe("Get de todas las reviews", () => {
    test("Debería de devolver reviews o un array vacio", async () => {
        const response = await request(app)
            .get("/review/all");
            expect(response.body.data).not.toBeNull();
    }
    );
}
);

// Eliminar un producto
describe("Delete de un producto", () => {
    test("Debería de eliminar un producto y devolver un status 200", async () => {
        const response = await request(app)
            .delete("/products/delete/" + idProduct);
        expect(response.statusCode).toBe(200);
    }
    );
}
);

// Get by id Vendor
describe("Get de productos por id de vendedor", () => {
    test("Debería de devolver productos", async () => {
        const response = await request(app)
            .get("/products/get/"+idTest);
            expect(response.body.data).not.toBeNull();
    }
    );
}
);

//Obtener todos los productos
describe("Get de todos los productos", () => {
    test("Debería de devolver productos o un array vacio", async () => {
        const response = await request(app)
            .get("/products/all");
            expect(response.body.data).not.toBeNull();
    }
    );
}
);

// ---------------------------- PRUEBAS DE INTEGRACIÓN ----------------------------
describe("Prueba de Integración de Productos", () => {
    let createdProductId;

    test("CREAR PRODUCTO", async () => {
        const response = await request(app)
            .post("/products/create")
            .send({
                "pathImage": "https://www.floristeriasguatemala.com/media/catalog/product/cache/9e8f7fb7c4789ff7af581d9bcc93d7a8/o/s/oso_peluche.jpg",
                "name": "Osito de Peluche",
                "description": "Oso de peluche, ideal para acompañar tus flores y sorprender a esa persona tan especial.",
                "price": 22.00,
                "stock": 2,
                "idUser": idTest
            });

        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe("Product created successfully");
        createdProductId = response.body.data._id;
    });

    test("CREAMOS UNA REVIEW PARA EL PRODUCTO", async () => {
        const response = await request(app)
            .post("/review/create")
            .send({
                "idUser": idTest,
                "idProduct": createdProductId,
                "rating": 2,
                "comment": "Muy malo, me llegó roto"
            });
        
        idReview = response.body.data._id;
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Review created");
    });

    test("ACTUALIZAMOS LA REVIEW CREADA", async () => {
        const response = await request(app)
            .put("/review/update/" + idReview)
            .send({
                "rating": 1,
                "comment": "Muy malo, me llegó roto. No lo recomiendo"
            });

        expect(response.statusCode).toBe(200);
    });

    test("OBTENEMOS EL PRODUCTO CREADO POR ID", async () => {
        const response = await request(app)
            .get("/products/see/" + createdProductId);

        expect(response.statusCode).toBe(200);
        expect(response.body.data._id).toBe(createdProductId);
    });

    test("ELIMINAMOS LA REVIEW CREADA", async () => {
        const response = await request(app)
            .delete("/review/delete/" + idReview);

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Review deleted");
    });

    test("UNA VEZ VERIFICADA SU EXISTENCIA, SE ELIMINA", async () => {
        const response = await request(app)
            .delete("/products/delete/" + createdProductId);

        expect(response.statusCode).toBe(200);
    });
});