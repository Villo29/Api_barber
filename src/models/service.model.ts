import mongoose, { Document, Schema } from 'mongoose';
import { IService } from '../interfaces/service.interface';

const ServiceSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    price: { type: Number, required: true },
    durationMinutes: { type: Number, required: true },
    active: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model<IService & Document>('Service', ServiceSchema);