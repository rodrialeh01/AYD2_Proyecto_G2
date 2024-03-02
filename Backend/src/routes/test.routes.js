import { Router } from "express";
import { getInfoConnection, ping, pong, uploadImage } from "../controllers/test.controller.js";
import fileHandler from '../middlewares/file.js';

const router = Router();

router.get("/ping", ping);
router.post("/pong", pong);
router.get("/connection", getInfoConnection);
router.post("/upload/image", fileHandler.single('image'), uploadImage);

export default router;