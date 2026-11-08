import { Component, inject, signal } from '@angular/core';
import { TechShopStore } from '../../../tech-shop-store';
import { PROMO_CODES } from '../../../data/promo-codes';

@Component({
  selector: 'app-promo-code',
  imports: [],
  templateUrl: './promo-code.html',
  styleUrl: './promo-code.scss',
})
export class PromoCode {
  store = inject(TechShopStore);
  codes = PROMO_CODES;
  value = signal('');

  apply() {
    const code = this.value().trim();
    if (!code) return;
    if (this.store.applyPromo(code)) {
      this.value.set('');
    }
  }
}
