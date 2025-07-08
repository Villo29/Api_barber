import express from 'express';
import {
    getShops,
    getShopById,
    createShop,
    updateShop,
    deactivateShop
} from '../controllers/shop.controller';
import { auth, adminAuth, checkSubscription } from '../middlewares';

const router = express.Router();

router.get('/', getShops);

router.get('/:id', getShopById);

router.use(auth, adminAuth, checkSubscription);

router.post('/', createShop);

router.put('/:id', updateShop);

router.patch('/:id/deactivate', deactivateShop);

export default router;