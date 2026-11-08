import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { TechShopStore } from './tech-shop-store';
import { authGuard, checkoutGuard } from './guards/auth-guard';

const productTitle = (route: ActivatedRouteSnapshot) => {
    const product = inject(TechShopStore).products().find(p => p.id === Number(route.params['id']));
    return product ? `${product.name} | Tech Role` : 'Product not found | Tech Role';
};

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        title: 'Tech Role | Digital Store',
        loadComponent: () => import('./pages/home/home')
    },
    {
        path: 'products/:category',
        title: 'Products | Tech Role',
        loadComponent: () => import('./pages/products-grid/products-grid')
    },
    {
        path: 'cart',
        title: 'Cart | Tech Role',
        loadComponent: () => import('./pages/view-cart/view-cart')
    },
    {
        path: 'product/:id',
        title: productTitle,
        loadComponent: () => import('./pages/product-details/product-details')
    },
    {
        path: 'wishlist',
        title: 'Wishlist | Tech Role',
        loadComponent: () => import('./pages/wishlist/wishlist')
    },
    {
        path: 'compare',
        title: 'Compare Products | Tech Role',
        loadComponent: () => import('./pages/compare/compare')
    },
    {
        path: 'checkout',
        title: 'Checkout | Tech Role',
        canActivate: [checkoutGuard],
        loadComponent: () => import('./pages/checkout/checkout')
    },
    {
        path: 'order-success',
        title: 'Order Confirmed | Tech Role',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/checkout/order-success/order-success')
    },
    {
        path: 'profile',
        title: 'My Profile | Tech Role',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/profile/profile')
    },
    {
        path: 'orders',
        title: 'My Orders | Tech Role',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/orders/orders')
    },
    {
        path: '**',
        title: 'Page not found | Tech Role',
        loadComponent: () => import('./pages/not-found/not-found')
    }
];
