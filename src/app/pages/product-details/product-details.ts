import { AfterViewInit, Component, computed, inject, input, signal } from '@angular/core';
import { Product } from '../../models/product';
import { TechShopStore } from '../../tech-shop-store';
import { QtySelector } from "../../components/qty-selector/qty-selector";
import { Rating } from "../../components/rating/rating";

@Component({
  selector: 'app-product-details',
  imports: [QtySelector, Rating],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export default class ProductDetails implements AfterViewInit{

  store = inject(TechShopStore);
  id = input<number>();
  product = computed(() => this.store.products().find(p => p.id == this.id()));
  activeImgUrl = signal<string>('')
  isInWishlist = computed(()=> this.store.wishlistItems().find(p=> p.id === this.product()?.id));
  cartItem = computed(()=> this.store.cartItems().find(p=> p.product.id === this.product()?.id));
  finalPrice = computed(() => this.product()?.price! - (this.product()?.discount! / 100 * this.product()?.price!))

  ngAfterViewInit(){
    this.activeImgUrl.set(this.product()?.imageUrls[0]!);
  }

  setActiveImgUrl(imgUrl: string) {
    this.activeImgUrl.set(imgUrl);
  }

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
