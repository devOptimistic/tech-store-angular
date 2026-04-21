import { Component, inject } from '@angular/core';
import { TechShopStore } from '../../tech-shop-store';
import { ProductCard } from "../../components/product-card/product-card";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-wishlist',
  imports: [ProductCard, RouterLink],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.scss',
})
export default class Wishlist {
  store = inject(TechShopStore);
}
