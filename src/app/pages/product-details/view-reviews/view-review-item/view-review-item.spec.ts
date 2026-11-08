import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PRODUCTS } from '../../../../data/products.data';

import { ViewReviewItem } from './view-review-item';

describe('ViewReviewItem', () => {
  let component: ViewReviewItem;
  let fixture: ComponentFixture<ViewReviewItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewReviewItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewReviewItem);

    fixture.componentRef.setInput('review', PRODUCTS[0].reviews[0]);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
