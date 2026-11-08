import { Component, computed, inject, input, signal } from '@angular/core';
import { Product } from '../../../models/product';
import { TechShopStore } from '../../../tech-shop-store';
import { AuthDialog } from '../../../services/auth-dialog';
import { RatingSummary } from "./rating-summary/rating-summary";
import { ViewReviewItem } from "./view-review-item/view-review-item";

@Component({
  selector: 'app-view-reviews',
  imports: [RatingSummary, ViewReviewItem],
  templateUrl: './view-reviews.html',
  styleUrl: './view-reviews.scss',
})
export class ViewReviews {
  #store = inject(TechShopStore);
  #authDialog = inject(AuthDialog);

  product = input.required<Product>();
  sortedReviews = computed(() => {
    return [...this.product().reviews].sort((a, b) => new Date(b.reviewDate).getTime() - new Date(a.reviewDate).getTime())
  })

  readonly stars = [1, 2, 3, 4, 5];
  showForm = signal(false);
  rating = signal(0);
  title = signal('');
  comment = signal('');
  submitted = signal(false);

  canSubmit = computed(() => this.rating() > 0 && !!this.title().trim() && !!this.comment().trim());

  openForm() {
    if (!this.#store.user()) {
      this.#authDialog.openSignIn();
      return;
    }
    this.showForm.set(true);
  }

  cancel() {
    this.showForm.set(false);
    this.reset();
  }

  submit() {
    this.submitted.set(true);
    if (!this.canSubmit()) return;

    const ok = this.#store.addReview(this.product().id, {
      rating: this.rating(),
      title: this.title(),
      comment: this.comment(),
    });
    if (ok) {
      this.showForm.set(false);
      this.reset();
    }
  }

  private reset() {
    this.rating.set(0);
    this.title.set('');
    this.comment.set('');
    this.submitted.set(false);
  }
}
