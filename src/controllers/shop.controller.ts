import { Request, Response } from 'express';
import BatherShop from '../models/shop.model';
import Bather from '../models/bather.model';

export const getShops = async (req: Request, res: Response) => {
    try {
        const shops = await BatherShop.find({ active: true });
        res.json(shops);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error del servidor al obtener barberías' });
    }
};

export const getShopById = async (req: Request, res: Response) => {
    try {
        const shop = await BatherShop.findById(req.params.id);

        if (!shop) {
            return res.status(404).json({ msg: 'Barbería no encontrada' });
        }

        const bathers = await Bather.find({
            batherShopsId: req.params.id,
            active: true
        });

        res.json({
            ...shop.toObject(),
            bathers
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error del servidor al obtener barbería' });
    }
};

export const createShop = async (req: Request, res: Response) => {
    try {
        const { name, address, phone, email, openingHours, description } = req.body;

        const newShop = new BatherShop({
            name,
            address,
            phone,
            email,
            openingHours,
            description,
            active: true
        });

        await newShop.save();
        res.status(201).json(newShop);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error del servidor al crear barbería' });
    }
};

export const updateShop = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, address, phone, email, openingHours, description } = req.body;

        const updatedShop = await BatherShop.findByIdAndUpdate(
            id,
            { name, address, phone, email, openingHours, description },
            { new: true }
        );

        if (!updatedShop) {
            return res.status(404).json({ msg: 'Barbería no encontrada' });
        }

        res.json(updatedShop);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error del servidor al actualizar barbería' });
    }
};

export const deactivateShop = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const shop = await BatherShop.findByIdAndUpdate(
            id,
            { active: false },
            { new: true }
        );

        if (!shop) {
            return res.status(404).json({ msg: 'Barbería no encontrada' });
        }

        await Bather.updateMany(
            { batherShopsId: id },
            { active: false }
        );

        res.json({
            shop,
            message: 'Barbería y sus barberos desactivados correctamente'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error del servidor al desactivar barbería' });
    }
};