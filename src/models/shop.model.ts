import mongoose, { Document, Schema } from 'mongoose';

export interface IBatherShop extends Document {
    name: string;
    address: string;
    phone: string;
    email: string;
    openingHours: string;
    description: string;
    active: boolean;
}

const BatherShopSchema: Schema = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    openingHours: { type: String, required: true },
    description: { type: String, required: false },
    active: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model<IBatherShop>('BatherShop', BatherShopSchema);