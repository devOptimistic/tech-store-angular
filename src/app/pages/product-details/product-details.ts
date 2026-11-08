import { AfterViewInit, Component, computed, inject, input, signal } from '@angular/core';
import { Product } from '../../models/product';
import { TechShopStore } from '../../tech-shop-store';
import { QtySelector } from "../../components/qty-selector/qty-selector";
import { StarRating } from "../../components/star-rating/star-rating";
import { ViewReviews } from "./view-reviews/view-reviews";

@Component({
  selector: 'app-product-details',
  imports: [QtySelector, StarRating, ViewReviews],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export default class ProductDetails implements AfterViewInit{

  store = inject(TechShopStore);
  id = input.required<number>();
  activeImgUrl = signal<string>('')
  isInWishlist = computed(()=> this.store.wishlistItems().find(p=> p.id === this.store.selectedProduct()?.id));
  cartItem = computed(()=> this.store.cartItems().find(p=> p.product.id === this.store.selectedProduct()?.id));
  finalPrice = computed(() => this.store.selectedProduct()?.price! - (this.store.selectedProduct()?.discount! / 100 * this.store.selectedProduct()?.price!))

  constructor(){
    this.store.setProductId(this.id)
  }

  ngAfterViewInit(){
    this.activeImgUrl.set(this.store.selectedProduct()?.imageUrls[0]!);
  }

  setActiveImgUrl(imgUrl: string) {
    this.activeImgUrl.set(imgUrl);
  }

  toggleWishlist(product: Product){
    if (this.isInWishlist()){
      this.store.removeFromWishlist(product);
    }else{
      this.store.addToWishlist(product)
      
    }
  }
  toFixed(num: number) {
    return num.toFixed(2);
  }
}
