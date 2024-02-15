import { Router } from 'express';
import { createProduct, seeAllProducts, updateProduct } from '../controllers/products.controller.js';

const router = Router();

router.post('/create', createProduct);
router.get('/all', seeAllProducts)
router.patch('/update/:id', updateProduct);

export default router;