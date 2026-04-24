import { Component, computed, inject, input } from '@angular/core';
import { TechShopStore } from '../../tech-shop-store';
import { ProductCard } from "../product-card/product-card";
import { Product } from '../../models/product';

@Component({
  selector: 'app-recommended-products',
  imports: [ProductCard],
  templateUrl: './recommended-products.html',
  styleUrl: './recommended-products.scss',
})
export class RecommendedProducts {
  store = inject(TechShopStore);
  category = input<string>();
  products = computed(() => {
    const currentCategory = this.category();
    const allProducts = this.store.products();
    
    return allProducts.filter(p => p.category === currentCategory);
  });
  
  randomProducts = computed(() => {
    const filteredProducts = this.products();
    return this.getRandomItems(filteredProducts, 4);
  });
  
  private getRandomItems<T>(arr: T[], count: number): T[] {
    if (count >= arr.length) return [...arr];
    
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled.slice(0, count);
  }
}
