import { Router } from "express";
import { getAllUsers, deleteUser,getUser } from "../controllers/user.controller.js";

const router = Router();

router.get("/get/:id", getUser);
router.get("/all", getAllUsers);
router.delete("/delete/:id", deleteUser);

export default router;