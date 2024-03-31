import { Router } from 'express';
import { createPurchase, createPurchasesWithPay, getDetailedPurchase, getIngresos, getPurchases, getVentasRango, getTop10Sellers} from '../controllers/purchase.controller.js';

const router = Router();

router.post('/create', createPurchase);
router.get('/getPurchase/:idVendor', getPurchases);
router.get('/getDetailedPurchase/:idVendor', getDetailedPurchase);
router.get('/getIngresos/:idVendor', getIngresos);
router.get('/getVentas', getVentasRango);
router.get('/getTop10Sellers', getTop10Sellers);
router.post('/pay', createPurchasesWithPay);

export default router;