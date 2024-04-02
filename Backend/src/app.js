import cors from "cors";
import express from "express";
import morgan from "morgan";
import databaseConnection from "./db/dbConnection.js";
import responseMiddleware from "./middlewares/response.js";
import error404Handler from "./routes/404.routes.js";
import authHandler from "./routes/auth.routes.js";
import bitacoraHandler from "./routes/bitacorabd.routes.js";
import payHandler from "./routes/pay.routes.js";
import productHandler from "./routes/product.routes.js";
import purchaseHandler from "./routes/purchase.routes.js";
import reviewHandler from "./routes/review.routes.js";
import testHandler from "./routes/test.routes.js";
import userHandler from "./routes/user.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());
app.use(responseMiddleware);

new databaseConnection();

app.use("/test", testHandler);
app.use("/auth", authHandler);
app.use("/products", productHandler);
app.use("/review", reviewHandler);
app.use("/users", userHandler);
app.use("/purchase", purchaseHandler);
app.use("/pays", payHandler);
app.use("/bitacora", bitacoraHandler);
app.use(error404Handler);


export default app;