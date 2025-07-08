import { Request, Response } from 'express';
import BatherOption from '../models/batherOption.model';

export const createSubscription = async (req: Request, res: Response) => {
    try {
        const { startDate, endDate, paymentId } = req.body;

        const existingActive = await BatherOption.findOne({
            adminId: req.user?.id,
            status: 'active',
            endDate: { $gte: new Date() }
        });

        if (existingActive) {
            return res.status(400).json({
                msg: 'Ya tienes una suscripción activa'
            });
        }

        const newSubscription = new BatherOption({
            adminId: req.user?.id,
            startDate,
            endDate,
            paymentId,
            status: 'active'
        });

        await newSubscription.save();
        res.status(201).json(newSubscription);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error del servidor al crear suscripción' });
    }
};

export const getActiveSubscription = async (req: Request, res: Response) => {
    try {
        const currentDate = new Date();

        const subscription = await BatherOption.findOne({
            adminId: req.user?.id,
            startDate: { $lte: currentDate },
            endDate: { $gte: currentDate },
            status: 'active'
        });

        if (!subscription) {
            return res.status(404).json({
                msg: 'No se encontró suscripción activa'
            });
        }

        res.json(subscription);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error del servidor al obtener suscripción' });
    }
};

export const updateSubscription = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { startDate, endDate, status } = req.body;

        const subscription = await BatherOption.findOneAndUpdate(
            { _id: id, adminId: req.user?.id },
            { startDate, endDate, status },
            { new: true }
        );

        if (!subscription) {
            return res.status(404).json({ msg: 'Suscripción no encontrada' });
        }

        res.json(subscription);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error del servidor al actualizar suscripción' });
    }
};

export const cancelSubscription = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const subscription = await BatherOption.findOneAndUpdate(
            { _id: id, adminId: req.user?.id },
            { status: 'canceled' },
            { new: true }
        );

        if (!subscription) {
            return res.status(404).json({ msg: 'Suscripción no encontrada' });
        }

        res.json({
            ...subscription.toObject(),
            message: 'Suscripción cancelada correctamente'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error del servidor al cancelar suscripción' });
    }
};