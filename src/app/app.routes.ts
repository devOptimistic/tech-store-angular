import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '',
    },
    {
        path: '',
        loadComponent: () => import('../app/pages/home/home')
    },
    {
        path: 'products/:category',
        loadComponent: () => import('../app/pages/products-grid/products-grid')
    },
    {
        path: 'cart',
        loadComponent: () => import('./pages/view-cart/view-cart')
    },
    {
        path: 'product/:id',
        loadComponent: () => import('../app/pages/product-details/product-details')
    },
    {
        path: 'wishlist',
        loadComponent: () => import('../app/pages/wishlist/wishlist')
    },
];
