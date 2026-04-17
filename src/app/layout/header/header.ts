import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  navList = [
    { title: 'Home', link: '', active: false },
    { title: 'Products', link: '/products', active: false }
  ]
}
