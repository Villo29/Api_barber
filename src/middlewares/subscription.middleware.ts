import { Request, Response, NextFunction } from 'express';
import BatherOption from '../models/batherOption.model';

export const checkSubscription = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const currentDate = new Date();

        const activeSubscription = await BatherOption.findOne({
            adminId: req.user?.id,
            startDate: { $lte: currentDate },
            endDate: { $gte: currentDate },
            status: 'active'
        });

        if (!activeSubscription) {
            return res.status(403).json({
                msg: 'Se requiere suscripción activa para esta acción',
                code: 'SUBSCRIPTION_REQUIRED'
            });
        }

        req.subscription = activeSubscription;
        next();
    } catch (err) {
        console.error('Error en verificación de suscripción:', err);
        res.status(500).json({
            msg: 'Error del servidor al verificar suscripción',
            code: 'SUBSCRIPTION_CHECK_ERROR'
        });
    }
};

declare global {
    namespace Express {
        interface Request {
            subscription?: any;
        }
    }
}