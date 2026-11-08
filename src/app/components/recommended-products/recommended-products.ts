import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TechShopStore } from '../../tech-shop-store';
import { ProductCard } from "../product-card/product-card";

@Component({
  selector: 'app-recommended-products',
  imports: [ProductCard, RouterLink],
  templateUrl: './recommended-products.html',
  styleUrl: './recommended-products.scss',
})
export class RecommendedProducts {
  readonly count = 4;

  store = inject(TechShopStore);
  category = input<string>();
  excludeId = input<number>();

  /** Same-category products first (never the current one), topped up with other categories. */
  randomProducts = computed(() => {
    const category = this.category();
    const candidates = this.store.products().filter(p => p.id !== this.excludeId());
    const sameCategory = this.shuffle(candidates.filter(p => p.category === category));
    if (sameCategory.length >= this.count) return sameCategory.slice(0, this.count);

    const others = this.shuffle(candidates.filter(p => p.category !== category));
    return [...sameCategory, ...others].slice(0, this.count);
  });

  private shuffle<T>(arr: T[]): T[] {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
}
