import { Router } from "express";
import { signIn, signUp,recuperarPassword } from "../controllers/auth.controller.js";
import Upload from "../middlewares/file.js";

const router = Router();

router.post("/forgot/password/:email", recuperarPassword);
router.post("/sign/up", Upload.single('photo'), signUp);
router.post("/sign/in", signIn);

export default router;