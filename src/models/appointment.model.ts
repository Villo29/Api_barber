import mongoose, { Document, Schema } from 'mongoose';

interface ICustomerInfo {
    name: string;
    phone: string;
    email: string;
}

interface IAppointment extends Document {
    paymentId: string;
    userId?: mongoose.Types.ObjectId;
    customerInfo?: ICustomerInfo;
    batherId: mongoose.Types.ObjectId;
    batherShopsId: mongoose.Types.ObjectId;
    service?: mongoose.Types.ObjectId;
    packaged?: mongoose.Types.ObjectId;
    appointmentDate: Date;
    status: string;
}

const customerInfoSchema = new Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true }
});

const AppointmentSchema: Schema = new Schema({
    paymentId: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    customerInfo: { type: customerInfoSchema, required: false },
    batherId: { type: Schema.Types.ObjectId, ref: 'Bather', required: true },
    batherShopsId: { type: Schema.Types.ObjectId, ref: 'BatherShop', required: true },
    service: { type: Schema.Types.ObjectId, ref: 'Service', required: false },
    packaged: { type: Schema.Types.ObjectId, ref: 'Package', required: false },
    appointmentDate: { type: Date, required: true },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed', 'canceled'],
        default: 'pending'
    }
}, { timestamps: true });

export default mongoose.model<IAppointment>('Appointment', AppointmentSchema);