import { Component, input } from '@angular/core';
import { StarRating } from "../../../../components/star-rating/star-rating";
import { UserReview } from '../../../../models/user-review';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-review-item',
  imports: [StarRating, DatePipe],
  templateUrl: './view-review-item.html',
  styleUrl: './view-review-item.scss',
})
export class ViewReviewItem {
  review = input.required<UserReview>();
}
