import { Request, Response } from 'express';
import Service from '../models/service.model';

export const getServices = async (req: Request, res: Response) => {
    try {
        const services = await Service.find({ active: true });
        res.json(services);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
};

export const createService = async (req: Request, res: Response) => {
    try {
        const { name, description, price, durationMinutes } = req.body;

        const newService = new Service({
            name,
            description,
            price,
            durationMinutes,
            active: true
        });

        await newService.save();
        res.status(201).json(newService);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
};

export const updateService = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const service = await Service.findByIdAndUpdate(id, req.body, { new: true });
        res.json(service);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
};

export const deactivateService = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const service = await Service.findByIdAndUpdate(
            id,
            { active: false },
            { new: true }
        );
        res.json(service);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
};