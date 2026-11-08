import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PRODUCTS } from '../../data/products.data';

import { ProductCard } from './product-card';

describe('ProductCard', () => {
  let component: ProductCard;
  let fixture: ComponentFixture<ProductCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCard);

    fixture.componentRef.setInput('product', PRODUCTS[0]);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('only sets a view-transition-name on the card that was clicked', async () => {
    const img = (fixture.nativeElement as HTMLElement).querySelector('img')!;
    expect(img.style.getPropertyValue('view-transition-name')).toBe('');

    component.markTransition();
    fixture.detectChanges();

    expect(img.style.getPropertyValue('view-transition-name')).toBe('product-image-' + PRODUCTS[0].id);
  });
});
