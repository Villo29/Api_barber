import express from 'express';
import {
    createSubscription,
    getActiveSubscription,
    updateSubscription,
    cancelSubscription
} from '../controllers/bather-options.controller';
import { auth, adminAuth } from '../middlewares';

const router = express.Router();

router.use(auth, adminAuth);

router.post('/', createSubscription);

router.get('/active', getActiveSubscription);

router.put('/:id', updateSubscription);

router.patch('/:id/cancel', cancelSubscription);

export default router;