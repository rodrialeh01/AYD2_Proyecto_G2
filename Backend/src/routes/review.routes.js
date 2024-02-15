import { Router } from "express";
import { createReview } from "../controllers/review.controller.js";

const router = Router();

router.post("/create", createReview);

export default router;