import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TechShopStore } from '../../tech-shop-store';
import { AuthDialog } from '../../services/auth-dialog';
import { MatIcon } from "@angular/material/icon";
import { SearchBox } from '../../components/search-box/search-box';

@Component({
  selector: 'app-header',
  imports: [RouterLink, MatIcon, SearchBox],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  store = inject(TechShopStore);
  navList = [
    { title: 'Home', link: '', active: false },
    { title: 'Products', link: '/products/all', active: false }
  ]
  authDialog = inject(AuthDialog);
  router = inject(Router);
  isMobileMenuOpen = signal(false);

  openSignInDialog() {
    this.authDialog.openSignIn();
  }
  openSignUpDialog() {
    this.authDialog.openSignUp();
  }
  
  toggleMobileMenu() {
    this.isMobileMenuOpen.update(value => !value);
    if (this.isMobileMenuOpen()) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
    document.body.style.overflow = '';
  }

  getInitials(name: string): string {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }
}
