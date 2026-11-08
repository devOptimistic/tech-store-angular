import { Component, computed, inject, input, linkedSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product';
import { TechShopStore } from '../../tech-shop-store';
import { QtySelector } from "../../components/qty-selector/qty-selector";
import { StarRating } from "../../components/star-rating/star-rating";
import { RecommendedProducts } from "../../components/recommended-products/recommended-products";
import { ViewReviews } from "./view-reviews/view-reviews";

const IDEAL_FOR: Record<string, string[]> = {
  'Smartphones': ['Everyday communication', 'Mobile photography', 'Gaming and streaming', 'Staying productive on the go'],
  'Laptops': ['Remote work and business use', 'University and daily study', 'Content creation and design', 'Travel-friendly productivity'],
  'Gaming Laptops': ['AAA and competitive gaming', 'Streaming and recording', '3D and video editing', 'LAN parties on the move'],
  'Headphones': ['Music and podcasts', 'Commuting and travel', 'Calls and meetings', 'Focused work and study'],
  'Earbuds': ['Workouts and running', 'Daily commuting', 'Calls on the go', 'Light, pocket-friendly listening'],
  'Smartwatches': ['Fitness and health tracking', 'Notifications at a glance', 'Sleep tracking', 'Outdoor activities'],
  'Tablets': ['Reading and note-taking', 'Streaming and browsing', 'Sketching and design', 'Learning and study'],
  'Gaming Consoles': ['Couch gaming with friends', 'Living-room entertainment', 'Online multiplayer', 'Streaming 4K media'],
  'Accessories': ['Upgrading your setup', 'Everyday convenience', 'Protecting your devices', 'Gifting'],
  'Drones': ['Aerial photography', 'Travel videos', 'Hobby flying', 'Content creation'],
  'Cameras': ['Travel photography', 'Vlogging and content creation', 'Events and portraits', 'Learning photography'],
};
const DEFAULT_IDEAL_FOR = ['Everyday use', 'Work and study', 'Entertainment', 'Gifting'];

const COLOR_HEX: [string, string][] = [
  ['black', '#0f172a'], ['white', '#f8fafc'], ['silver', '#cbd5e1'], ['gray', '#94a3b8'], ['grey', '#94a3b8'],
  ['titanium', '#78716c'], ['gold', '#f59e0b'], ['blue', '#3b82f6'], ['red', '#ef4444'], ['green', '#22c55e'],
  ['pink', '#f472b6'], ['purple', '#a855f7'], ['orange', '#f97316'], ['yellow', '#facc15'], ['graphite', '#475569'],
];

@Component({
  selector: 'app-product-details',
  imports: [QtySelector, StarRating, ViewReviews, RouterLink, RecommendedProducts],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export default class ProductDetails {

  store = inject(TechShopStore);
  id = input.required<number>();

  // follows the product, so navigating between products always starts on that product's first image
  activeImgUrl = linkedSignal(() => this.store.selectedProduct()?.imageUrls[0] ?? '');

  isInWishlist = computed(() => this.store.wishlistItems().some(p => p.id === this.store.selectedProduct()?.id));
  isCompared = computed(() => this.store.compareIds().includes(this.store.selectedProduct()?.id ?? -1));
  cartItem = computed(() => this.store.cartItems().find(p => p.product.id === this.store.selectedProduct()?.id));

  finalPrice = computed(() => {
    const product = this.store.selectedProduct();
    return product ? product.price - (product.discount / 100) * product.price : 0;
  });

  highlights = computed(() => (this.store.selectedProduct()?.moreProperties ?? []).slice(0, 4));
  idealFor = computed(() => IDEAL_FOR[this.store.selectedProduct()?.category ?? ''] ?? DEFAULT_IDEAL_FOR);
  colorHex = computed(() => {
    const color = (this.store.selectedProduct()?.color ?? '').toLowerCase();
    return COLOR_HEX.find(([name]) => color.includes(name))?.[1] ?? '#cbd5e1';
  });

  constructor() {
    this.store.setProductId(this.id);
  }

  setActiveImgUrl(imgUrl: string) {
    this.activeImgUrl.set(imgUrl);
  }

  toggleWishlist(product: Product) {
    if (this.isInWishlist()) {
      this.store.removeFromWishlist(product);
    } else {
      this.store.addToWishlist(product);
    }
  }

  buyNow(product: Product) {
    if (!this.cartItem()) {
      this.store.addToCart(product, 1);
    }
    this.store.proceedToCheckout();
  }

  toFixed(num: number) {
    return num.toFixed(2);
  }
}
