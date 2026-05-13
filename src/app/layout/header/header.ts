import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TechShopStore } from '../../tech-shop-store';
import { MatDialog } from '@angular/material/dialog';
import { SignInDialog } from '../../components/sign-in-dialog/sign-in-dialog';
import { SignUpDialog } from '../../components/sign-up-dialog/sign-up-dialog';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-header',
  imports: [RouterLink, MatIcon],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  store = inject(TechShopStore);
  navList = [
    { title: 'Home', link: '', active: false },
    { title: 'Products', link: '/products/all', active: false }
  ]
  dialog = inject(MatDialog);
  router = inject(Router);
  isMobileMenuOpen = signal(false);

  openSignInDialog() {
    this.dialog.open(SignInDialog, {
      disableClose: true,
      width: '450px',
    })
  }
  openSignUpDialog() {
    this.dialog.open(SignUpDialog, {
      disableClose: true,
      width: '450px',
    })
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
