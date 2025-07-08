import express from 'express';
import { getDashboardStats } from '../controllers/dashboard.controller';
import { auth, adminAuth, checkSubscription } from '../middlewares';

const router = express.Router();

router.use(auth, adminAuth, checkSubscription);
router.get('/', getDashboardStats);

export default router;