import { Request, Response } from 'express';
import Bather from '../models/bather.model';
import BatherShop from '../models/shop.model';

export const getBathersByShop = async (req: Request, res: Response) => {
    try {
        const { shopId } = req.params;
        const bathers = await Bather.find({ batherShopsId: shopId, active: true });
        res.json(bathers);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
};

export const createBather = async (req: Request, res: Response) => {
    try {

        if (!req.user || req.user.role !== 'admin' || !req.user.shopId) {
            return res.status(403).json({ msg: 'Access denied. Admin privileges required' });
        }

        const { name, bio, experienceYears, photoUrl } = req.body;

        const shop = await BatherShop.findById(req.user.shopId);
        if (!shop) {
            return res.status(404).json({
                msg: 'Admin barber shop not found',
                solution: 'Ensure admin has a valid shop assigned'
            });
        }

        const newBather = new Bather({
            userId: req.user.id,
            name,
            bio,
            experienceYears,
            photoUrl: photoUrl || '',
            batherShopsId: req.user.shopId,
            active: true
        });

        await newBather.save();
        res.status(201).json(newBather);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: 'Server error',
            error: err instanceof Error ? err.message : String(err)
        });
    }
};

export const updateBather = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const bather = await Bather.findByIdAndUpdate(id, req.body, { new: true });
        res.json(bather);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
};

export const deactivateBather = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const bather = await Bather.findByIdAndUpdate(
            id,
            { active: false },
            { new: true }
        );
        res.json(bather);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
};