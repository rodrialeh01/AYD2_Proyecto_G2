import { Router } from "express";
import { getPays } from "../controllers/pay.controller.js";

const router = Router();

router.get('/', getPays)

export default router;