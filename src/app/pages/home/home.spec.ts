import { ComponentFixture, TestBed } from '@angular/core/testing';

import Home from './home';
import { TechShopStore } from '../../tech-shop-store';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;
  let store: InstanceType<typeof TechShopStore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home]
    })
    .compileComponents();

    store = TestBed.inject(TechShopStore);
    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows four distinct in-stock hero products', () => {
    const hero = component.heroProducts();

    expect(hero.length).toBe(4);
    expect(new Set(hero.map(p => p.id)).size).toBe(4);
    expect(hero.every(p => p.inStock)).toBe(true);
  });

  it('builds a card for every category with its product count', () => {
    const cards = component.categoryCards();

    expect(cards.length).toBe(store.categories().length);
    expect(cards.reduce((sum, c) => sum + c.count, 0)).toBe(store.products().length);
  });

  it('filters featured products by the selected tab and caps the list', () => {
    expect(component.featuredProducts().length).toBeLessThanOrEqual(8);

    component.featuredCategory.set('Headphones');

    const featured = component.featuredProducts();
    expect(featured.length).toBeGreaterThan(0);
    expect(featured.every(p => p.category === 'Headphones')).toBe(true);
  });

  it('lists the biggest discounts first in the sale section', () => {
    const sale = component.saleProducts();

    expect(sale.every(p => p.discount > 0 && p.inStock)).toBe(true);
    expect(sale.map(p => p.discount)).toEqual([...sale.map(p => p.discount)].sort((a, b) => b - a));
  });

  it('only uses highly rated reviews as testimonials', () => {
    const testimonials = component.testimonials();

    expect(testimonials.length).toBeLessThanOrEqual(3);
    expect(testimonials.every(t => t.review.rating >= 4)).toBe(true);
  });

  describe('newsletter', () => {
    it('rejects an invalid email', () => {
      component.email.set('not-an-email');
      component.subscribe();

      expect(component.subscribed()).toBe(false);
      expect(component.emailTouched()).toBe(true);
    });

    it('accepts a valid email', () => {
      component.email.set('ada@example.com');
      component.subscribe();

      expect(component.subscribed()).toBe(true);
    });
  });
});
