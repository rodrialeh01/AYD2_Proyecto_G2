import { Router } from "express";
import { createReview, getReviewsByProductId } from "../controllers/review.controller.js";

const router = Router();

router.post("/create", createReview);
router.get("/get/:idProduct", getReviewsByProductId);

export default router;