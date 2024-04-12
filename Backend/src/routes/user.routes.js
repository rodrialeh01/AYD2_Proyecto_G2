import { Router } from "express";
import { deleteUser, getAllUsers, getUser, updateInfoUser, uploadImage, getReportUserTypes } from "../controllers/user.controller.js";
import fileHandler from '../middlewares/file.js';

const router = Router();

router.get("/get/:id", getUser);
router.get("/all", getAllUsers);
router.delete("/delete/:id", deleteUser);
router.patch('/update/:id', updateInfoUser);
router.post('/addImage', fileHandler.single('image'), uploadImage);
router.get('/get/:id', getUser);
router.get('/getReportUserTypes', getReportUserTypes);

export default router;