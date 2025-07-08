import express from 'express';
import {
    getPackages,
    createPackage,
    updatePackage,
    deactivatePackage
} from '../controllers/package.controller';
import { auth, adminAuth, checkSubscription } from '../middlewares';

const router = express.Router();

router.get('/', getPackages);

router.use(auth, adminAuth, checkSubscription);

router.post('/', createPackage);
router.put('/:id', updatePackage);
router.patch('/:id/deactivate', deactivatePackage);

export default router;