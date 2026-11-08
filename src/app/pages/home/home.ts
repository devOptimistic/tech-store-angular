import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TechShopStore } from '../../tech-shop-store';
import { Product } from '../../models/product';
import { ProductCard } from '../../components/product-card/product-card';
import { StarRating } from '../../components/star-rating/star-rating';
import { Toaster } from '../../services/toaster';

const CATEGORY_ICONS: Record<string, string> = {
  'Smartphones': '📱',
  'Laptops': '💻',
  'Gaming Laptops': '🖥️',
  'Headphones': '🎧',
  'Earbuds': '🎵',
  'Smartwatches': '⌚',
  'Tablets': '📲',
  'Gaming Consoles': '🎮',
  'Accessories': '🖱️',
  'Drones': '🚁',
  'Cameras': '📷',
};

/** One product from each of these categories is shown in the hero. */
const HERO_CATEGORIES = ['Laptops', 'Smartphones', 'Headphones', 'Smartwatches'];

const FEATURED_TABS = [
  { label: 'All', category: null },
  { label: 'Laptops', category: 'Laptops' },
  { label: 'Phones', category: 'Smartphones' },
  { label: 'Audio', category: 'Headphones' },
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const finalPrice = (p: Product) => p.price - (p.discount / 100) * p.price;

@Component({
  selector: 'app-home',
  imports: [RouterLink, ProductCard, StarRating],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export default class Home {
  store = inject(TechShopStore);
  #toaster = inject(Toaster);

  readonly featuredTabs = FEATURED_TABS;
  readonly finalPrice = finalPrice;

  private inStockByRating = computed(() =>
    this.store.products().filter(p => p.inStock).sort((a, b) => b.rating - a.rating)
  );

  heroProducts = computed(() => {
    const ranked = this.inStockByRating();
    const picks = HERO_CATEGORIES
      .map(category => ranked.find(p => p.category === category))
      .filter((p): p is Product => !!p);
    // top up if some category has no in-stock product
    for (const p of ranked) {
      if (picks.length >= 4) break;
      if (!picks.includes(p)) picks.push(p);
    }
    return picks.slice(0, 4);
  });

  categoryCards = computed(() =>
    this.store.categories().map(name => ({
      name,
      icon: CATEGORY_ICONS[name] ?? '🛒',
      count: this.store.products().filter(p => p.category === name).length,
    }))
  );

  saleProducts = computed(() =>
    this.store.products().filter(p => p.inStock && p.discount > 0).sort((a, b) => b.discount - a.discount).slice(0, 4)
  );

  /** The cheapest headphones in stock, shown in the "Headphone Week" card. */
  headphoneDeal = computed(() =>
    this.store.products()
      .filter(p => p.category === 'Headphones' && p.inStock)
      .sort((a, b) => finalPrice(a) - finalPrice(b))[0]
  );

  featuredCategory = signal<string | null>(null);
  featuredProducts = computed(() => {
    const category = this.featuredCategory();
    return this.inStockByRating()
      .filter(p => !category || p.category === category)
      .slice(0, 8);
  });

  brands = computed(() => {
    const counts = new Map<string, number>();
    for (const p of this.store.products()) counts.set(p.brand, (counts.get(p.brand) ?? 0) + 1);
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6).map(([name]) => name);
  });

  /** Best customer reviews from the catalog, used as testimonials. */
  testimonials = computed(() =>
    this.store.products()
      .flatMap(product => product.reviews.map(review => ({ review, product })))
      .filter(({ review }) => review.rating >= 4)
      .sort((a, b) => b.review.rating - a.review.rating || b.review.comment.length - a.review.comment.length)
      .slice(0, 3)
  );

  // newsletter
  email = signal('');
  emailTouched = signal(false);
  subscribed = signal(false);
  emailValid = computed(() => EMAIL_PATTERN.test(this.email().trim()));

  subscribe() {
    this.emailTouched.set(true);
    if (!this.emailValid()) return;
    this.subscribed.set(true);
    this.#toaster.success('Thanks for subscribing!');
  }

  toFixed(num: number) {
    return num.toFixed(2);
  }
}
