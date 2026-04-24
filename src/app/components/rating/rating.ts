import { Component, input } from '@angular/core';

@Component({
  selector: 'app-rating',
  imports: [],
  templateUrl: './rating.html',
  styleUrl: './rating.scss',
})
export class Rating {
  rating = input.required<number>();
  roundUp(number: number){
      return Math.ceil(number);
    }
}
