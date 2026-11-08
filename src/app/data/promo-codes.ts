export type PromoCode =
  | { code: string; label: string; type: 'percent'; value: number }
  | { code: string; label: string; type: 'freeShipping' };

/** Demo promo codes (there is no backend, so they are validated locally). */
export const PROMO_CODES: PromoCode[] = [
  { code: 'SAVE10', label: '10% off your order', type: 'percent', value: 10 },
  { code: 'TECH20', label: '20% off your order', type: 'percent', value: 20 },
  { code: 'FREESHIP', label: 'Free shipping', type: 'freeShipping' },
];

export function findPromoCode(code: string | undefined): PromoCode | undefined {
  if (!code) return undefined;
  return PROMO_CODES.find(p => p.code === code.trim().toUpperCase());
}
