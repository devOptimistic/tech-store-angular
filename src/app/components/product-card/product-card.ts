import { Component, input } from '@angular/core';
import { Product } from '../../models/product/product';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  product = input<Product>();

  roundUp(number: number){
    return Math.ceil(number);
  }
}
