import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MAX_COMPARE, TechShopStore } from '../../tech-shop-store';
import { Product } from '../../models/product';

@Component({
  selector: 'app-compare',
  imports: [RouterLink],
  templateUrl: './compare.html',
})
export default class Compare {
  store = inject(TechShopStore);
  maxCompare = MAX_COMPARE;

  /** Every spec label that appears on at least one compared product, in first-seen order. */
  specLabels = computed(() => {
    const labels: string[] = [];
    for (const product of this.store.compareItems()) {
      for (const prop of product.moreProperties) {
        if (!labels.includes(prop.label)) labels.push(prop.label);
      }
    }
    return labels;
  });

  specValue(product: Product, label: string): string {
    return product.moreProperties.find(p => p.label === label)?.value ?? '—';
  }

  finalPrice(product: Product): number {
    return product.price - (product.discount / 100) * product.price;
  }
}
