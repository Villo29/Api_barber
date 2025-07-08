import { Request, Response } from 'express';
import Appointment from '../models/appointment.model';
import Bather from '../models/bather.model';
import Service from '../models/service.model';
import Package from '../models/package.model';

export const createAppointment = async (req: Request, res: Response) => {
    try {
        const { batherId, service, packaged, appointmentDate, customerInfo } = req.body;

        // 1. Verificar que el barbero existe y está activo
        const bather = await Bather.findOne({ _id: batherId, active: true });
        if (!bather) {
            return res.status(404).json({ msg: 'Barbero no encontrado o no disponible' });
        }

        if (service) {
            const serviceExists = await Service.findById(service);
            if (!serviceExists) {
                return res.status(404).json({ msg: 'Servicio no encontrado' });
            }
        }

        // 3. Crear la reservación (con o sin usuario registrado)
        const newAppointment = new Appointment({
            paymentId: `temp_${Date.now()}`, // Temporal hasta el pago real
            userId: req.user?.id || null, // null para usuarios no registrados
            customerInfo: req.user?.id ? null : customerInfo, // Solo para no registrados
            batherId,
            batherShopsId: bather.batherShopsId,
            service,
            packaged,
            appointmentDate,
            status: 'pending'
        });

        await newAppointment.save();
        res.status(201).json(newAppointment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error al crear la reservación' });
    }
};

export const getAppointments = async (req: Request, res: Response) => {
    try {
        let appointments;

        if (req.user && req.user.role === 'admin') {
            // Admin ve todas las citas de su barbería
            appointments = await Appointment.find({ batherShopsId: req.user.shopId });
        } else if (req.user && req.user.id) {
            // Usuario ve sus propias citas
            appointments = await Appointment.find({ userId: req.user.id });
        } else {
            return res.status(403).json({ msg: 'No autorizado' });
        }

        res.json(appointments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error del servidor' });
    }
};

export const updateAppointmentStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Solo admins pueden actualizar el estado
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ msg: 'Se requiere acceso de administrador' });
        }

        const appointment = await Appointment.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!appointment) {
            return res.status(404).json({ msg: 'Cita no encontrada' });
        }

        res.json(appointment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error del servidor' });
    }
};

export const cancelAppointment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const appointment = await Appointment.findByIdAndUpdate(
            id,
            { status: 'canceled' },
            { new: true }
        );

        if (!appointment) {
            return res.status(404).json({ msg: 'Cita no encontrada' });
        }

        // Verificar que el usuario es el dueño de la cita o admin
        if (
            !req.user ||
            ((appointment.userId?.toString() !== req.user.id) && req.user.role !== 'admin')
        ) {
            return res.status(403).json({ msg: 'No autorizado' });
        }

        res.json(appointment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error del servidor' });
    }
};


export const getAppointmentsByBather = async (req: Request, res: Response) => {
    try {
        const { batherId } = req.params;

        const bather = await Bather.findById(batherId).select('name photoUrl');
        if (!bather) {
            return res.status(404).json({ msg: 'Barbero no encontrado' });
        }

        // 2. Obtener las citas (presentes y futuras)
        const now = new Date();
        const appointments = await Appointment.find({
            batherId,
            status: { $ne: 'canceled' },
            appointmentDate: { $gte: now }
        })
            .sort({ appointmentDate: 1 })
            .select('appointmentDate status customerInfo.name service');

        // 3. Formatear respuesta
        const response = {
            bather: {
                name: bather.name,
                photoUrl: bather.photoUrl
            },
            appointments,
            stats: {
                total: appointments.length,
                confirmed: appointments.filter(a => a.status === 'confirmed').length,
                pending: appointments.filter(a => a.status === 'pending').length
            }
        };

        res.json(response);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ msg: 'Error al obtener citas' });
    }
};

const getAvailableSlots = async (batherId: string, date: string) => {
    //  falta logica para calcular horarios disponibles
    return getAvailableSlots;
};


export const getBatherAvailability = async (req: Request, res: Response) => {
    try {
        const { batherId } = req.params;
        const { date } = req.query; // Formato YYYY-MM-DD

        // 1. Obtener horario laboral del barbero/barbería
        // 2. Obtener citas existentes para esa fecha
        // 3. Calcular horarios disponibles

        res.json({
            date,
            availableSlots: ["09:00", "11:00", "14:00"] // Ejemplo
        });
    } catch (err) {
        res.status(500).json({ msg: 'Error al calcular disponibilidad' });
    }
};