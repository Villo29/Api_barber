import { Request, Response } from 'express';
import AdminDashboard from '../models/adminDashboard.model';
import Appointment from '../models/appointment.model';

export const getDashboardStats = async (req: Request, res: Response) => {
    try {
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ msg: 'Se requiere acceso de administrador' });
        }

        const adminId = req.user.id;

        let dashboard = await AdminDashboard.findOne({ adminId });

        if (!dashboard) {
            dashboard = new AdminDashboard({ adminId });
            await dashboard.save();
        }

        const totalAppointments = await Appointment.countDocuments({
            batherShopsId: req.user.shopId
        });

        const uniqueCustomers = await Appointment.distinct('userId', {
            batherShopsId: req.user.shopId
        });

        dashboard.totalAppointments = totalAppointments;
        dashboard.totalCustomers = uniqueCustomers.length;
        dashboard.lastUpdated = new Date();

        await dashboard.save();

        res.json(dashboard);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error del servidor' });
    }
};