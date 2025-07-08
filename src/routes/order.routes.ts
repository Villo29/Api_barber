import express from 'express';
import {
    createOrder,
    getOrder,
    updateOrderStatus
} from '../controllers/order.controller';
import { auth, adminAuth, checkSubscription } from '../middlewares';

const router = express.Router();

router.post('/', createOrder);

router.get('/:id', auth, getOrder);
router.put('/:id/status', auth, adminAuth, updateOrderStatus);

export default router;