import { Request, Response } from 'express';
import BatherShop from '../models/shop.model';
import Bather from '../models/bather.model';
import Appointment from '../models/appointment.model';
import BatherOption from '../models/batherOption.model';

export const getShopDetails = async (req: Request, res: Response) => {
    try {
        if (!req.user?.shopId) {
            return res.status(400).json({ msg: 'Admin no tiene barbería asignada' });
        }

        const shop = await BatherShop.findById(req.user.shopId);
        if (!shop) {
            return res.status(404).json({ msg: 'Barbería no encontrada' });
        }

        res.json(shop);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error del servidor' });
    }
};

export const updateShopDetails = async (req: Request, res: Response) => {
    try {
        const { name, address, phone, email, openingHours, description } = req.body;

        if (!req.user?.shopId) {
            return res.status(400).json({ msg: 'Admin no tiene barbería asignada' });
        }

        const updatedShop = await BatherShop.findByIdAndUpdate(
            req.user.shopId,
            { name, address, phone, email, openingHours, description },
            { new: true }
        );

        if (!updatedShop) {
            return res.status(404).json({ msg: 'Barbería no encontrada' });
        }

        res.json(updatedShop);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error del servidor' });
    }
};

export const getBathers = async (req: Request, res: Response) => {
    try {
        if (!req.user?.shopId) {
            return res.status(400).json({ msg: 'Admin no tiene barbería asignada' });
        }

        const bathers = await Bather.find({ batherShopsId: req.user.shopId });
        res.json(bathers);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error del servidor' });
    }
};

export const addBather = async (req: Request, res: Response) => {
    try {
        const { name, bio, experienceYears, photoUrl } = req.body;

        if (!req.user?.shopId) {
            return res.status(400).json({ msg: 'Admin no tiene barbería asignada' });
        }

        const newBather = new Bather({
            userId: req.user.id,
            name,
            bio,
            experienceYears,
            photoUrl,
            batherShopsId: req.user.shopId,
            active: true
        });

        await newBather.save();
        res.status(201).json(newBather);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error del servidor' });
    }
};

export const getAppointments = async (req: Request, res: Response) => {
    try {
        if (!req.user?.shopId) {
            return res.status(400).json({ msg: 'Admin no tiene barbería asignada' });
        }

        const appointments = await Appointment.find({ batherShopsId: req.user.shopId })
            .populate('batherId', 'name photoUrl')
            .populate('service', 'name price')
            .populate('packaged', 'name price');

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

export const getSubscriptionStatus = async (req: Request, res: Response) => {
    try {
        const currentDate = new Date();

        const subscription = await BatherOption.findOne({
            adminId: req.user?.id,
            startDate: { $lte: currentDate },
            endDate: { $gte: currentDate },
            status: 'active'
        });

        res.json({
            hasActiveSubscription: !!subscription,
            subscription
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error del servidor' });
    }
};