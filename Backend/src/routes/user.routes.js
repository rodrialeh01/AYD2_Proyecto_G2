import { Router } from "express";
import { getAllUsers, deleteUser } from "../controllers/user.controller.js";

const router = Router();

router.get("/all", getAllUsers);
router.delete("/delete/:id", deleteUser);

export default router;