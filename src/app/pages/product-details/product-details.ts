import { Component, computed, input, signal } from '@angular/core';
import { Product } from '../../models/product/product';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export default class ProductDetails {
  id = input.required<number>();
  product = signal<Product>({
    id: 0,
    name: '',
    description: '',
    shortDescription: '',
    price: 0,
    imageUrls: [],
    rating: 0,
    reviewCount: 0,
    inStock: false,
    category: '',
    brand: '',
    moreProperties: []
  });
  getProduct(){
    // let p = PRODUCTS.find(p=> p.id == this.id);
    // this.product.set(p)
  }
}
