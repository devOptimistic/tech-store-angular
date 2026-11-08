import { Component, inject } from '@angular/core';
import { TechShopStore } from '../../tech-shop-store';

@Component({
  selector: 'app-summarize-order',
  imports: [],
  templateUrl: './summarize-order.html',
  styleUrl: './summarize-order.scss',
})
export class SummarizeOrder {
  store = inject(TechShopStore);
  totals = this.store.totals;

  toFixed(num: number) {
    return num.toFixed(2);
  }
}
