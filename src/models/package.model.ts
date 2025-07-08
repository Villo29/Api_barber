import mongoose, { Document, Schema } from 'mongoose';
import { IPackage } from '../interfaces/package.interface';

const PackageSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    price: { type: Number, required: true },
    serviceIncluded: { type: [String], required: true },
    active: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model<IPackage & Document>('Package', PackageSchema);