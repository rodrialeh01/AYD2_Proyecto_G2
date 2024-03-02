import { Router } from 'express';
import { createPurchase } from '../controllers/purchase.controller.js';

const router = Router();

router.post('/create', createPurchase);

export default router;