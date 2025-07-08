import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import BatherShop from '../models/shop.model';
import dotenv from 'dotenv';

dotenv.config();


const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRE = process.env.JWT_EXPIRE || '30d';

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET no está definido en las variables de entorno');
}

export const registerAdmin = async (req: Request, res: Response) => {
    try {
        const { email, password, shopName, shopAddress, shopPhone, shopEmail } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }

        const newShop = new BatherShop({
            name: shopName,
            address: shopAddress,
            phone: shopPhone,
            email: shopEmail,
            openingHours: 'Lunes a Viernes: 9:00 - 19:00',
            description: '',
            active: true
        });

        const shop = await newShop.save();

        user = new User({
            email,
            password: await bcrypt.hash(password, 10),
            role: 'admin',
            shopId: shop._id
        });

        await user.save();


        const payload = {
            id: user._id,
            role: user.role,
            shopId: shop._id
        };

        const token = jwt.sign(
            payload as object,
            JWT_SECRET,
            { expiresIn: JWT_EXPIRE } as jwt.SignOptions
        );

        res.status(201).json({
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                shopId: user.shopId
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error del servidor' });
    }
};

export const loginAdmin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Credenciales inválidas' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Credenciales inválidas' });
        }

        const payload = {
            id: user._id,
            role: user.role,
            shopId: user.shopId
        };

        const token = jwt.sign(
            payload as object,
            JWT_SECRET,
            { expiresIn: JWT_EXPIRE } as jwt.SignOptions
        );

        res.json({
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                shopId: user.shopId
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error del servidor' });
    }
};