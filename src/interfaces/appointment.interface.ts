export interface IAppointment {
    paymentId: string;
    userId: string;
    batherId: string;
    batherShopsId: string;
    service: string;
    packaged: string;
    appointmentDate: Date;
    status: 'pending' | 'confirmed' | 'completed' | 'canceled';
}