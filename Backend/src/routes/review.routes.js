import { Router } from "express";
import { createReview, deleteReview, getReviewsByProductId, updateComment, updateRating, updateReview,getAllReviews } from "../controllers/review.controller.js";

const router = Router();

router.post("/create", createReview);
router.get("/get/:idProduct", getReviewsByProductId);
router.put("/update/:idReview", updateReview);
router.patch("/update/comment/:idReview", updateComment);
router.patch("/update/rating/:idReview", updateRating);
router.delete("/delete/:idReview", deleteReview);
router.get("/all", getAllReviews);
router.delete("/delete/:id", deleteReview);

export default router;