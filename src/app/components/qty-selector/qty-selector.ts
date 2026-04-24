import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-qty-selector',
  imports: [],
  templateUrl: './qty-selector.html',
  styleUrl: './qty-selector.scss',
})
export class QtySelector {
  quantity = input(0);
  removable = input(false);
  qtyUpdated = output<number>();
}
