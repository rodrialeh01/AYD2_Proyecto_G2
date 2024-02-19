import { Router } from "express";
import { createReview, getReviewsByProductId,getAllReviews,deleteReview } from "../controllers/review.controller.js";

const router = Router();

router.post("/create", createReview);
router.get("/get/:idProduct", getReviewsByProductId);
router.get("/all", getAllReviews);
router.delete("/delete/:id", deleteReview);

export default router;