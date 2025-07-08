import mongoose, { Document, Schema } from 'mongoose';
import { IBather } from '../interfaces/bather.interface';

const BatherSchema: Schema = new Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    bio: { type: String, required: false },
    experienceYears: { type: Number, required: true },
    photoUrl: { type: String, required: false },
    batherShopsId: { type: String, required: true },
    active: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model<IBather & Document>('Bather', BatherSchema);