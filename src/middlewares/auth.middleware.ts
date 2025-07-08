import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                role: string;
                shopId?: string;
            };
        }
    }
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('x-auth-token');

    if (!token) {
        return next();
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
            id: string;
            role: string;
            shopId?: string;
        };
        req.user = decoded;
        next();
    } catch (err) {
        console.error('Error verifying token:', err);
        res.status(401).json({ msg: 'Token no válido' });
    }
};

export const adminAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Se requiere acceso de administrador' });
    }
    next();
};