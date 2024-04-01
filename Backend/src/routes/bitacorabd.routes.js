import { Router } from "express";
import { getBitacoras } from "../controllers/bitacorabd.controller.js";

const router = Router();

router.get("/", getBitacoras);

export default router;