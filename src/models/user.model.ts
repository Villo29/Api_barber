import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    email: string;
    password: string;
    role: 'admin' | 'user';
    shopId?: string; // Solo para admins
}

const UserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    shopId: { type: String, required: false }
}, { timestamps: true });

export default mongoose.model<IUser>('User', UserSchema);