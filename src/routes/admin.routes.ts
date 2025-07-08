import express from 'express';
import {
    getShopDetails,
    updateShopDetails,
    getBathers,
    addBather,
    getAppointments,
    updateAppointmentStatus,
    getSubscriptionStatus
} from '../controllers/admin.controller';
import { auth, adminAuth, checkSubscription } from '../middlewares';

const router = express.Router();

// Todas las rutas requieren autenticación de admin
router.use(auth, adminAuth);

// Rutas que requieren suscripción activa
router.get('/shop', checkSubscription, getShopDetails);
router.put('/shop', checkSubscription, updateShopDetails);
router.get('/bathers', checkSubscription, getBathers);
router.post('/bathers', checkSubscription, addBather);
router.get('/appointments', checkSubscription, getAppointments);
router.put('/appointments/:id', checkSubscription, updateAppointmentStatus);

// Ruta para ver estado de suscripción (no requiere suscripción activa)
router.get('/subscription', getSubscriptionStatus);

export default router;