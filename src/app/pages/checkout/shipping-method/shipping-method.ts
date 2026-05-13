import { Component, inject } from '@angular/core';
import { TechShopStore } from '../../../tech-shop-store';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shipping-method',
  imports: [FormsModule, CommonModule],
  templateUrl: './shipping-method.html',
  styleUrl: './shipping-method.scss',
})
export class ShippingMethod {
  store = inject(TechShopStore);

}
