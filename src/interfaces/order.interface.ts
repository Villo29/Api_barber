export interface IOrder {
    paymentId: string;
    userId: string;
    productIds: string[];
    totalAmount: number;
    status: 'pending' | 'completed' | 'canceled';
}