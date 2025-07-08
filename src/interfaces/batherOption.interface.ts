export interface IBatherOption {
    adminId: string;
    startDate: Date;
    endDate: Date;
    status: 'active' | 'inactive' | 'pending' | 'canceled';
    paymentId: string;
}