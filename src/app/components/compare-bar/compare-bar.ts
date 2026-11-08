import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MAX_COMPARE, TechShopStore } from '../../tech-shop-store';

@Component({
  selector: 'app-compare-bar',
  imports: [RouterLink],
  template: `
    @if (store.compareItems().length > 0) {
      <div class="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 shadow-lg backdrop-blur">
        <div class="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3 lg:px-8">
          <p class="text-sm font-bold text-slate-900">Compare ({{ store.compareItems().length }}/{{ maxCompare }})</p>
          <div class="flex flex-1 items-center gap-2">
            @for (p of store.compareItems(); track p.id) {
              <div class="relative">
                <img [src]="p.imageUrls[0]" [alt]="p.name" class="h-10 w-10 rounded-lg border border-slate-200 object-cover" />
                <button type="button" (click)="store.removeFromCompare(p.id)" [attr.aria-label]="'Remove ' + p.name + ' from compare'"
                  class="absolute -right-1.5 -top-1.5 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-slate-900 text-[10px] leading-none text-white">×</button>
              </div>
            }
          </div>
          <button type="button" (click)="store.clearCompare()" class="cursor-pointer text-sm font-semibold text-slate-500 hover:text-slate-700">Clear</button>
          <a routerLink="/compare"
            class="rounded-2xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-500"
            [class.pointer-events-none]="store.compareItems().length < 2"
            [class.opacity-50]="store.compareItems().length < 2">Compare now</a>
        </div>
      </div>
    }
  `,
})
export class CompareBar {
  store = inject(TechShopStore);
  maxCompare = MAX_COMPARE;
}
