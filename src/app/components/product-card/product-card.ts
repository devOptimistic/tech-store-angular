import { Component, computed, inject, input, signal } from '@angular/core';
import { Product } from '../../models/product/product';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TechShopStore } from '../../tech-shop-store';

@Component({
  selector: 'app-product-card',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  product = input.required<Product>();
  store = inject(TechShopStore);
  isInWishlist = computed(()=> this.store.wishlistItems().find(p=> p.id === this.product().id));
  roundUp(number: number){
    return Math.ceil(number);
  }
  toggleWishlist(product: Product){
    if (this.isInWishlist()){
      this.store.removeFromWishlist(product);
    }else{
      this.store.addToWishlist(product)
      console.log(this.store.wishlistItems());
      
    }
  }
}
