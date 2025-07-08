import express from 'express';
import {
    createAppointment,
    getAppointments,
    updateAppointmentStatus,
    cancelAppointment,
    getAppointmentsByBather,
    getBatherAvailability
} from '../controllers/appointment.controller';
import { auth, adminAuth } from '../middlewares/auth.middleware';

const router = express.Router();

// Cualquiera puede crear una cita
router.post('/', createAppointment);

// Obtener citas por barbero (pública)
router.get('/bather/:batherId', getAppointmentsByBather);
router.get('/bather/:batherId/availability', getBatherAvailability);

// Para ver/modificar citas se necesita autenticación
router.get('/', auth, getAppointments);
router.put('/:id/status', auth, adminAuth, updateAppointmentStatus);
router.patch('/:id/cancel', auth, cancelAppointment);

export default router;