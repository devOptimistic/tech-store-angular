import { Component, computed, inject } from '@angular/core';
import { TechShopStore } from '../../tech-shop-store';

@Component({
  selector: 'app-summarize-order',
  imports: [],
  templateUrl: './summarize-order.html',
  styleUrl: './summarize-order.scss',
})
export class SummarizeOrder {
  store = inject(TechShopStore);
  subtotal = computed(() =>
    this.store.cartItems().reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  );
  tax = computed(() => 0.05 * this.subtotal());
  shipping = computed(() => this.subtotal() >= 1000 ? 0 : 30);
  discount = computed(() =>
    this.store.cartItems().reduce((acc, item) => acc + (item.product.discount / 100) * (item.product.price * item.quantity), 0)
  );

  total = computed(() =>
    this.subtotal() + this.tax() + this.shipping() - this.discount()
  )

  toFixed(num: number) {
    return num.toFixed(2);
  }
}
