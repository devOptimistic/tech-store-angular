import { Component, input } from '@angular/core';
import { Product } from '../../../../models/product';
import { StarRating } from "../../../../components/star-rating/star-rating";

@Component({
  selector: 'app-rating-summary',
  imports: [StarRating],
  templateUrl: './rating-summary.html',
  styleUrl: './rating-summary.scss',
})
export class RatingSummary {
  product = input.required<Product>();
}
