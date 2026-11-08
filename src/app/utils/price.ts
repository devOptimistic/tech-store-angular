import { Product } from '../models/product';

/** Price after the product's own percentage discount. */
export const finalPrice = (p: Pick<Product, 'price' | 'discount'>) => p.price - (p.discount / 100) * p.price;
