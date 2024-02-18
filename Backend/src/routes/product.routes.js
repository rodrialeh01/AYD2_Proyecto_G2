import { Router } from 'express';
import { createProduct, seeAllProducts, seeProductById, updateProduct, getProductsByVendor } from '../controllers/products.controller.js';

const router = Router();

router.post('/create', createProduct);
router.get('/all', seeAllProducts)
router.patch('/update/:id', updateProduct);
router.get('/see/:id', seeProductById);
router.get('/get/:id', getProductsByVendor);

export default router;