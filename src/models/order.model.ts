import mongoose, { Document, Schema } from 'mongoose';
import { IOrder } from '../interfaces/order.interface';

const OrderSchema: Schema = new Schema({
    paymentId: { type: String, required: true },
    userId: { type: String, required: true },
    productIds: { type: [String], required: true },
    totalAmount: { type: Number, required: true },
    status: {
        type: String,
        enum: ['pending', 'completed', 'canceled'],
        default: 'pending'
    },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model<IOrder & Document>('Order', OrderSchema);