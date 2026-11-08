import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <section class="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <p class="text-7xl font-black text-blue-600">404</p>
      <h1 class="mt-4 text-2xl font-black text-slate-950">Page not found</h1>
      <p class="mt-2 text-slate-600">The page you are looking for doesn't exist or has been moved.</p>
      <div class="mt-6 flex gap-3">
        <a routerLink="/" class="rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800">Go Home</a>
        <a routerLink="/products/all" class="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">Browse Products</a>
      </div>
    </section>
  `,
})
export default class NotFound {}
