import mongoose, { Document, Schema } from 'mongoose';

export interface IBatherOption extends Document {
    adminId: mongoose.Schema.Types.ObjectId;
    startDate: Date;
    endDate: Date;
    status: 'active' | 'inactive' | 'pending' | 'canceled';
    paymentId: string;
}

const BatherOptionSchema: Schema = new Schema({
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: {
        type: String,
        enum: ['active', 'inactive', 'pending', 'canceled'],
        default: 'pending'
    },
    paymentId: { type: String, required: true }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Índice para búsquedas frecuentes
BatherOptionSchema.index({ adminId: 1, status: 1, endDate: 1 });

export default mongoose.model<IBatherOption>('BatherOption', BatherOptionSchema);