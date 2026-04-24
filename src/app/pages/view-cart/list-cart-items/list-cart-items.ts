import { Component, inject } from '@angular/core';
import { TechShopStore } from '../../../tech-shop-store';
import { ShowCartItem } from "../show-cart-item/show-cart-item";

@Component({
  selector: 'app-list-cart-items',
  imports: [ShowCartItem],
  templateUrl: './list-cart-items.html',
  styleUrl: './list-cart-items.scss',
})
export class ListCartItems {
  store = inject(TechShopStore);
}
