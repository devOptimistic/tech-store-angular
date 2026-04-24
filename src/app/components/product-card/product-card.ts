import { Component, computed, inject, input, signal } from '@angular/core';
import { Product } from '../../models/product';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TechShopStore } from '../../tech-shop-store';
import { Rating } from "../rating/rating";

@Component({
  selector: 'app-product-card',
  imports: [DecimalPipe, RouterLink, Rating],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  product = input.required<Product>();
  store = inject(TechShopStore);
  isInWishlist = computed(()=> this.store.wishlistItems().find(p=> p.id === this.product().id));
  finalPrice = computed(() => this.product()?.price! - (this.product()?.discount! / 100 * this.product()?.price!))
  
  toggleWishlist(product: Product){
    if (this.isInWishlist()){
      this.store.removeFromWishlist(product);
    }else{
      this.store.addToWishlist(product)
      console.log(this.store.wishlistItems());
      
    }
  }
  toFixed(num: number) {
    return num.toFixed(2);
  }
}
