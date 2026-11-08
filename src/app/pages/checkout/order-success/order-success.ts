import { Component, inject } from '@angular/core';
import { TechShopStore } from '../../../tech-shop-store';
import { DatePipe } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-order-success',
  imports: [RouterLink, DatePipe],
  templateUrl: './order-success.html',
  styleUrl: './order-success.scss',
})
export default class OrderSuccess {
  store = inject(TechShopStore)
}
