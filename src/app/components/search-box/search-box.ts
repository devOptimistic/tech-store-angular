import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TechShopStore } from '../../tech-shop-store';

@Component({
  selector: 'app-search-box',
  imports: [],
  templateUrl: './search-box.html',
})
export class SearchBox {
  #store = inject(TechShopStore);
  #router = inject(Router);

  query = signal('');
  open = signal(false);

  suggestions = computed(() => {
    const q = this.query().trim().toLowerCase();
    if (!q) return [];
    return this.#store
      .products()
      .filter(p => [p.name, p.brand, p.category].some(v => v.toLowerCase().includes(q)))
      .slice(0, 5);
  });

  onInput(event: Event) {
    this.query.set((event.target as HTMLInputElement).value);
    this.open.set(true);
  }

  close() {
    // delay so a click on a suggestion registers before the list disappears
    setTimeout(() => this.open.set(false), 150);
  }

  search() {
    const q = this.query().trim();
    this.open.set(false);
    this.#router.navigate(['/products', 'all'], { queryParams: { q: q || null } });
  }

  openProduct(id: number) {
    this.open.set(false);
    this.query.set('');
    this.#router.navigate(['/product', id]);
  }
}
