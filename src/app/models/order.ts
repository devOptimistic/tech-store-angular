import { CartItem } from "./cart"

export type Order = {
    id: string;
    number: string;
    userId: string;
    createdAt: string;
    subtotal: number;
    tax: number;
    discount: number;
    promoCode?: string;
    promoDiscount?: number;
    shippingCost: number;
    total: number;
    shippingType: number;
    items: CartItem[];
    paymentStatus: 'success' | 'failure';
}
