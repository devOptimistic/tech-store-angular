import { Component, computed, input, signal } from '@angular/core';
import { Product } from '../../models/product/product';
import { sampleProducts } from './products-sample';
import { TitleCasePipe } from '@angular/common';
import { ProductCard } from "../../components/product-card/product-card";

@Component({
  selector: 'app-products-grid',
  imports: [TitleCasePipe, ProductCard],
  templateUrl: './products-grid.html',
  styleUrl: './products-grid.scss',
})
export default class ProductsGrid {
  products = signal<Product[]>(sampleProducts);
  category = input<string>('all');
  filteredProducts = computed(
    ()=> {
      debugger;
      if (this.category() == 'all') 
        return this.products();
      return this.products().filter(p=> p.category.toLowerCase() == this.category().toLowerCase())
    }
  )
}
