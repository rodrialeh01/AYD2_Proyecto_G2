import { Router } from 'express';
import { createProduct, seeAllProducts, seeProductById, updateProduct, getProductsByVendor, deleteProduct, uploadImage } from '../controllers/products.controller.js';
import fileHandler from '../middlewares/file.js';

const router = Router();

router.post('/create', createProduct);
router.get('/all', seeAllProducts)
router.patch('/update/:id', updateProduct);
router.get('/see/:id', seeProductById);
router.get('/get/:id', getProductsByVendor);
router.delete('/delete/:id', deleteProduct);
router.post('/addImage', fileHandler.single('image'), uploadImage);

export default router;