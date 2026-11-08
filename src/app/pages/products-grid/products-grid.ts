import { Component, computed, inject, input, signal } from '@angular/core';
import { Product } from '../../models/product';
import { TitleCasePipe } from '@angular/common';
import { ProductCard } from "../../components/product-card/product-card";
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TechShopStore } from '../../tech-shop-store';

@Component({
  selector: 'app-products-grid',
  imports: [
    TitleCasePipe,
    ProductCard,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './products-grid.html',
  styleUrl: './products-grid.scss',
})
export default class ProductsGrid {
  store = inject(TechShopStore);
  category = input<string>('all');
  q = input<string>();
  selectedPrice = signal<number | null>(null);
  selectedCategories = signal<string[]>([]);
  selectedSort = signal<number | null>(0);
  private applyFilters(products: Product[]): Product[] {
    let result = [...products];

    result = this.filterBySearch(result);
    result = this.filterByMainCategory(result);
    result = this.filterBySelectedCategories(result);
    result = this.filterByMaxPrice(result);
    result = this.applySorting(result);

    return result;
  }

  filteredProducts = computed(() => this.applyFilters(this.store.products()));

  private filterBySearch(products: Product[]): Product[] {
    const q = this.q()?.trim().toLowerCase();
    if (!q) return products;
    return products.filter(p =>
      [p.name, p.brand, p.category, p.shortDescription].some(v => v?.toLowerCase().includes(q))
    );
  }

  private filterByMainCategory(products: Product[]): Product[] {
    if (this.category() === 'all') return products;
    return products.filter(
      p => p.category.toLowerCase() === this.category().toLowerCase()
    );
  }

  private filterBySelectedCategories(products: Product[]): Product[] {
    const selected = this.selectedCategories();
    if (selected.length === 0) return products;
    return products.filter(p => selected.includes(p.category));
  }

  private filterByMaxPrice(products: Product[]): Product[] {
    const maxPrice = this.selectedPrice();
    if (!maxPrice) return products;
    return products.filter(p => p.price <= maxPrice);
  }

  private applySorting(products: Product[]): Product[] {
    const sortType = Number(this.selectedSort());

    const sortFunctions = {
      0: (a: Product, b: Product) => b.rating - a.rating,
      1: (a: Product, b: Product) => a.price - b.price,
      2: (a: Product, b: Product) => b.price - a.price
    };

    const sortFn = sortFunctions[sortType as keyof typeof sortFunctions];
    return sortFn ? [...products].sort(sortFn) : products;
  }
  toggleCategory(category: string, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const current = this.selectedCategories();

    if (checkbox.checked) {
      this.selectedCategories.set([...current, category]);
    } else {
      this.selectedCategories.set(current.filter(c => c !== category));
    }
  }
}
