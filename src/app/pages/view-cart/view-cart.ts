import { Component, inject } from '@angular/core';
import { ListCartItems } from "./list-cart-items/list-cart-items";
import { TechShopStore } from '../../tech-shop-store';
import { RouterLink } from "@angular/router";
import { SummarizeOrder } from "../../components/summarize-order/summarize-order";
import { EmptyCart } from "./empty-cart/empty-cart";
import { RecommendedProducts } from "../../components/recommended-products/recommended-products";
import { PromoCode } from "./promo-code/promo-code";

@Component({
  selector: 'app-view-cart',
  imports: [ListCartItems, RouterLink, SummarizeOrder, EmptyCart, RecommendedProducts, PromoCode],
  templateUrl: './view-cart.html',
  styleUrl: './view-cart.scss',
})
export default class ViewCart {
  store = inject(TechShopStore);
}
