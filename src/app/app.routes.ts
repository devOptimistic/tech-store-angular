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
        path: 'products',
        loadComponent: () => import('../app/pages/products-grid/products-grid')
    },
    {
        path: 'cart',
        loadComponent: () => import('../app/pages/cart/cart')
    }
];
