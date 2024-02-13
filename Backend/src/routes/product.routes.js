import { Router } from 'express';
import { createProduct } from '../controllers/products.controller.js';

const router = Router();

router.post('/create', createProduct);

export default router;