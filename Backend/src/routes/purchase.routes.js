import { Router } from 'express';
import { createPurchase, getPurchases, getDetailedPurchase, getIngresos, getVentasRango } from '../controllers/purchase.controller.js';

const router = Router();

router.post('/create', createPurchase);
router.get('/getPurchase/:idVendor', getPurchases);
router.get('/getDetailedPurchase/:idVendor', getDetailedPurchase);
router.get('/getIngresos/:idVendor', getIngresos);
router.get('/getVentas', getVentasRango);

export default router;