import express from 'express';
import {
    getServices,
    createService,
    updateService,
    deactivateService
} from '../controllers/service.controller';
import { auth, adminAuth, checkSubscription } from '../middlewares';

const router = express.Router();

router.get('/', getServices);

router.use(auth, adminAuth, checkSubscription);

router.post('/', createService);
router.put('/:id', updateService);
router.patch('/:id/deactivate', deactivateService);

export default router;