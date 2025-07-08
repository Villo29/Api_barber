import { Request, Response } from 'express';
import Package from '../models/package.model';
import Service from '../models/service.model';

export const getPackages = async (req: Request, res: Response) => {
    try {
        const packages = await Package.find({ active: true }).populate('serviceIncluded');
        res.json(packages);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
};

export const createPackage = async (req: Request, res: Response) => {
    try {
        const { name, description, price, serviceIncluded } = req.body;

        const services = await Service.find({ _id: { $in: serviceIncluded } });
        if (services.length !== serviceIncluded.length) {
            return res.status(400).json({ msg: 'One or more services not found' });
        }

        const newPackage = new Package({
            name,
            description,
            price,
            serviceIncluded,
            active: true
        });

        await newPackage.save();
        res.status(201).json(newPackage);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
};

export const updatePackage = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const packageData = await Package.findByIdAndUpdate(id, req.body, { new: true });
        res.json(packageData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
};

export const deactivatePackage = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const packageData = await Package.findByIdAndUpdate(
            id,
            { active: false },
            { new: true }
        );
        res.json(packageData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
};