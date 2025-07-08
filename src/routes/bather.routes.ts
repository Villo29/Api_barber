import express from 'express';
import {
    getBathersByShop,
    createBather,
    updateBather,
    deactivateBather
} from '../controllers/bather.controller';
import { auth, adminAuth, checkSubscription } from '../middlewares';

const router = express.Router();

router.get('/shop/:shopId', getBathersByShop);

router.use(auth, adminAuth, checkSubscription);

router.post('/', createBather);
router.put('/:id', updateBather);
router.patch('/:id/deactivate', deactivateBather);

export default router;