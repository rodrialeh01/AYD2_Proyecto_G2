import { Router } from "express";
import { getAllUsers, deleteUser } from "../controllers/user.controller.js";

const router = Router();

router.get("/all", getAllUsers);
router.delete("/delete/:id", deleteUser);
router.patch('/update/:id', updateInfoUser);
router.post('/addImage', fileHandler.single('image'), uploadImage);
router.get('/get/:id', getUser);

export default router;