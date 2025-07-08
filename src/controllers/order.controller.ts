import { Request, Response } from 'express';
import Order from '../models/order.model';

export const createOrder = async (req: Request, res: Response) => {
    try {
        const { productIds, totalAmount } = req.body;

        const userId = req.user?.id || `guest-${Date.now()}`;

        const newOrder = new Order({
            paymentId: `pay-${Date.now()}`,
            userId,
            productIds,
            totalAmount,
            status: 'pending'
        });

        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
};

export const getOrder = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({ msg: 'Order not found' });
        }

        if (!req.user || (order.userId !== req.user.id && req.user.role !== 'admin')) {
            return res.status(403).json({ msg: 'Unauthorized' });
        }

        res.json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ msg: 'Admin access required' });
        }

        const order = await Order.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );
        res.json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
};