import { CartItem } from "./cart"

export type Order = {
    id: string;
    userId: string;
    total: number;
    shippingType: number;
    items: CartItem[];
    paymentStatus: 'success' | 'failure';
}