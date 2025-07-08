import mongoose, { Document, Schema } from 'mongoose';
import { IAdminDashboard } from '../interfaces/adminDashboard.interface';

const AdminDashboardSchema: Schema = new Schema({
    adminId: { type: String, required: true },
    totalAppointments: { type: Number, default: 0 },
    totalCustomers: { type: Number, default: 0 },
    lastUpdated: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model<IAdminDashboard & Document>('AdminDashboard', AdminDashboardSchema);