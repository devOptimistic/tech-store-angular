import { Routes } from '@angular/router';
import { authGuard, checkoutGuard } from './guards/auth-guard';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./pages/home/home')
    },
    {
        path: 'products/:category',
        loadComponent: () => import('./pages/products-grid/products-grid')
    },
    {
        path: 'cart',
        loadComponent: () => import('./pages/view-cart/view-cart')
    },
    {
        path: 'product/:id',
        loadComponent: () => import('./pages/product-details/product-details')
    },
    {
        path: 'wishlist',
        loadComponent: () => import('./pages/wishlist/wishlist')
    },
    {
        path: 'checkout',
        canActivate: [checkoutGuard],
        loadComponent: () => import('./pages/checkout/checkout')
    },
    {
        path: 'order-success',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/checkout/order-success/order-success')
    },
    {
        path: 'orders',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/orders/orders')
    },
    {
        path: '**',
        loadComponent: () => import('./pages/not-found/not-found')
    }
];
