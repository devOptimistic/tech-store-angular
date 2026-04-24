import { Component, computed, inject, input } from '@angular/core';
import { CartItem } from '../../../models/cart';
import { TechShopStore } from '../../../tech-shop-store';
import { QtySelector } from "../../../components/qty-selector/qty-selector";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-show-cart-item',
  imports: [QtySelector, RouterLink],
  templateUrl: './show-cart-item.html',
  styleUrl: './show-cart-item.scss',
})
export class ShowCartItem {
  item = input.required<CartItem>();
  store = inject(TechShopStore);
  finalPrice = computed(() => this.item().product.price! - (this.item().product.discount! / 100 * this.item().product.price!))
  totalPrice = computed(()=> (this.item().quantity * this.finalPrice()).toFixed(2))

}
