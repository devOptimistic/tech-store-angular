import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TechShopStore } from '../../tech-shop-store';

@Component({
  selector: 'app-orders',
  imports: [RouterLink, DatePipe, CurrencyPipe],
  templateUrl: './orders.html',
})
export default class Orders {
  store = inject(TechShopStore);
}
