import { Router } from 'express';
import { createProduct, seeAllProducts } from '../controllers/products.controller.js';

const router = Router();

router.post('/create', createProduct);
router.get('/all', seeAllProducts)

export default router;