import { Component, computed, inject, input, signal } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { Product } from '../../models/product';
import { ProductCard } from "../../components/product-card/product-card";
import { TechShopStore } from '../../tech-shop-store';
import { finalPrice } from '../../utils/price';

/** Query-string keys that make up the filter state (kept in the URL so views are shareable). */
type QueryKey = 'q' | 'brand' | 'cat' | 'min' | 'max' | 'rating' | 'stock' | 'sale' | 'sort' | 'page';
type Facet = 'brand' | 'cat';

const BRANDS_COLLAPSED = 6;

const parseList = (value: string | undefined) => (value ? value.split(',').filter(Boolean) : []);
const parseNumber = (value: string | undefined) => {
  const n = Number(value);
  return value !== undefined && value !== '' && Number.isFinite(n) && n >= 0 ? n : null;
};

@Component({
  selector: 'app-products-grid',
  imports: [ProductCard, RouterLink],
  templateUrl: './products-grid.html',
  styleUrl: './products-grid.scss',
})
export default class ProductsGrid {
  store = inject(TechShopStore);
  #router = inject(Router);

  // route / query params (bound through withComponentInputBinding)
  category = input<string>('all');
  q = input<string>();
  brand = input<string>();
  cat = input<string>();
  min = input<string>();
  max = input<string>();
  rating = input<string>();
  stock = input<string>();
  sale = input<string>();
  sort = input<string>();
  page = input<string>();

  readonly pageSize = 12;
  readonly ratingOptions = [4, 3];
  filtersOpen = signal(false);
  showAllBrands = signal(false);

  // ---- parsed filter state ----
  selectedBrands = computed(() => parseList(this.brand()));
  selectedCategories = computed(() => parseList(this.cat()));
  minPrice = computed(() => parseNumber(this.min()));
  maxPrice = computed(() => parseNumber(this.max()));
  minRating = computed(() => parseNumber(this.rating()) ?? 0);
  inStockOnly = computed(() => this.stock() === '1');
  onSale = computed(() => this.sale() === '1');
  sortType = computed(() => {
    const n = Number(this.sort());
    return this.store.sortTypes().some(s => s.value === n) ? n : 0;
  });
  searchText = computed(() => this.q()?.trim() ?? '');

  /** The category from the path, resolved to its real name (the URL is case-insensitive). */
  mainCategory = computed(() => {
    const raw = decodeURIComponent(this.category());
    if (raw.toLowerCase() === 'all') return null;
    return this.store.categories().find(c => c.toLowerCase() === raw.toLowerCase()) ?? raw;
  });

  // ---- filtering ----
  private matches(p: Product, skip?: Facet): boolean {
    const q = this.searchText().toLowerCase();
    if (q && ![p.name, p.brand, p.category, p.shortDescription].some(v => v?.toLowerCase().includes(q))) return false;

    const main = this.mainCategory();
    if (main && p.category !== main) return false;

    const cats = this.selectedCategories();
    if (skip !== 'cat' && cats.length && !cats.includes(p.category)) return false;

    const brands = this.selectedBrands();
    if (skip !== 'brand' && brands.length && !brands.includes(p.brand)) return false;

    const price = finalPrice(p);
    const min = this.minPrice();
    const max = this.maxPrice();
    if (min !== null && price < min) return false;
    if (max !== null && price > max) return false;

    if (p.rating < this.minRating()) return false;
    if (this.inStockOnly() && !p.inStock) return false;
    if (this.onSale() && p.discount <= 0) return false;
    return true;
  }

  private sorted(products: Product[]): Product[] {
    const byRating = (a: Product, b: Product) => b.rating - a.rating || b.reviewCount - a.reviewCount;
    const sorts: Record<number, (a: Product, b: Product) => number> = {
      0: byRating,
      1: (a, b) => finalPrice(a) - finalPrice(b),
      2: (a, b) => finalPrice(b) - finalPrice(a),
      3: (a, b) => b.discount - a.discount || byRating(a, b),
      4: (a, b) => a.name.localeCompare(b.name),
    };
    return [...products].sort(sorts[this.sortType()] ?? byRating);
  }

  filteredProducts = computed(() => this.sorted(this.store.products().filter(p => this.matches(p))));

  // ---- facets (counts ignore the facet's own selection so options stay selectable) ----
  private facetCounts(facet: Facet) {
    const counts = new Map<string, number>();
    for (const p of this.store.products()) {
      if (!this.matches(p, facet)) continue;
      const key = facet === 'brand' ? p.brand : p.category;
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    return counts;
  }

  private options(facet: Facet, all: string[], selected: string[]) {
    const counts = this.facetCounts(facet);
    return all
      .map(name => ({ name, count: counts.get(name) ?? 0, checked: selected.includes(name) }))
      .filter(o => o.count > 0 || o.checked)
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  }

  brandOptions = computed(() =>
    this.options('brand', [...new Set(this.store.products().map(p => p.brand))], this.selectedBrands())
  );
  visibleBrandOptions = computed(() =>
    this.showAllBrands() ? this.brandOptions() : this.brandOptions().slice(0, BRANDS_COLLAPSED)
  );
  categoryOptions = computed(() => this.options('cat', this.store.categories(), this.selectedCategories()));

  priceBounds = computed(() => {
    const prices = this.store.products().map(finalPrice);
    return { min: Math.floor(Math.min(...prices)), max: Math.ceil(Math.max(...prices)) };
  });

  // ---- active filters (chips) ----
  activeFilters = computed(() => {
    const chips: { label: string; remove: () => void }[] = [];
    for (const b of this.selectedBrands()) chips.push({ label: b, remove: () => this.toggle('brand', b) });
    for (const c of this.selectedCategories()) chips.push({ label: c, remove: () => this.toggle('cat', c) });

    const min = this.minPrice();
    const max = this.maxPrice();
    if (min !== null || max !== null) {
      const label = min !== null && max !== null ? `$${min} – $${max}` : min !== null ? `From $${min}` : `Up to $${max}`;
      chips.push({ label, remove: () => this.update({ min: null, max: null }) });
    }
    if (this.minRating() > 0) chips.push({ label: `${this.minRating()}★ & up`, remove: () => this.update({ rating: null }) });
    if (this.inStockOnly()) chips.push({ label: 'In stock', remove: () => this.update({ stock: null }) });
    if (this.onSale()) chips.push({ label: 'On sale', remove: () => this.update({ sale: null }) });
    return chips;
  });

  // ---- pagination ----
  totalPages = computed(() => Math.max(1, Math.ceil(this.filteredProducts().length / this.pageSize)));
  currentPage = computed(() => Math.min(Math.max(1, Math.floor(parseNumber(this.page()) ?? 1)), this.totalPages()));
  pages = computed(() => Array.from({ length: this.totalPages() }, (_, i) => i + 1));
  pagedProducts = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filteredProducts().slice(start, start + this.pageSize);
  });
  rangeStart = computed(() => (this.filteredProducts().length ? (this.currentPage() - 1) * this.pageSize + 1 : 0));
  rangeEnd = computed(() => Math.min(this.currentPage() * this.pageSize, this.filteredProducts().length));

  heading = computed(() => (this.searchText() ? `Results for “${this.searchText()}”` : this.mainCategory() ?? 'All Products'));

  // ---- actions (all state lives in the URL) ----
  /** Merges into the current query string. Any filter change goes back to page 1. */
  private update(patch: Partial<Record<QueryKey, string | null>>) {
    this.#router.navigate([], {
      queryParams: { page: null, ...patch },
      queryParamsHandling: 'merge',
    });
  }

  private toggle(facet: Facet, value: string) {
    const current = facet === 'brand' ? this.selectedBrands() : this.selectedCategories();
    const next = current.includes(value) ? current.filter(v => v !== value) : [...current, value];
    this.update({ [facet]: next.length ? next.join(',') : null });
  }

  toggleBrand(name: string) { this.toggle('brand', name); }
  toggleCategory(name: string) { this.toggle('cat', name); }

  setPrice(which: 'min' | 'max', event: Event) {
    const raw = (event.target as HTMLInputElement).value.trim();
    const value = parseNumber(raw);
    let min = which === 'min' ? value : this.minPrice();
    let max = which === 'max' ? value : this.maxPrice();
    if (min !== null && max !== null && min > max) [min, max] = [max, min];
    this.update({ min: min === null ? null : String(min), max: max === null ? null : String(max) });
  }

  setRating(rating: number) { this.update({ rating: rating ? String(rating) : null }); }
  setFlag(key: 'stock' | 'sale', checked: boolean) { this.update({ [key]: checked ? '1' : null }); }
  setSort(value: string) { this.update({ sort: value === '0' ? null : value }); }
  clearSearch() { this.update({ q: null }); }

  clearFilters() {
    this.update({ brand: null, cat: null, min: null, max: null, rating: null, stock: null, sale: null });
  }

  goToPage(page: number) {
    const next = Math.min(Math.max(1, page), this.totalPages());
    this.#router.navigate([], { queryParams: { page: next === 1 ? null : String(next) }, queryParamsHandling: 'merge' });
    document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  openFilters() { this.filtersOpen.set(true); }
  closeFilters() { this.filtersOpen.set(false); }
}
