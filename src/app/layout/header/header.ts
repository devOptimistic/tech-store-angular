import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TechShopStore } from '../../tech-shop-store';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  store = inject(TechShopStore);
  navList = [
    { title: 'Home', link: '', active: false },
    { title: 'Products', link: '/products/all', active: false }
  ]
}
