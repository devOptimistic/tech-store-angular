import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import ProductsGrid from './products-grid';
import { TechShopStore } from '../../tech-shop-store';
import { finalPrice } from '../../utils/price';

describe('ProductsGrid', () => {
  let component: ProductsGrid;
  let fixture: ComponentFixture<ProductsGrid>;
  let store: InstanceType<typeof TechShopStore>;
  let navigate: ReturnType<typeof vi.spyOn>;

  /** Simulates the router binding query params / route params to the component inputs. */
  const setInputs = async (inputs: Record<string, string>) => {
    for (const [key, value] of Object.entries(inputs)) fixture.componentRef.setInput(key, value);
    await fixture.whenStable();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsGrid]
    })
    .compileComponents();

    store = TestBed.inject(TechShopStore);
    navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    fixture = TestBed.createComponent(ProductsGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('lists every product by default, 12 per page', () => {
    expect(component.filteredProducts().length).toBe(store.products().length);
    expect(component.pagedProducts().length).toBe(Math.min(12, store.products().length));
  });

  it('resolves the category from the path case-insensitively', async () => {
    await setInputs({ category: 'gaming%20laptops' });

    expect(component.mainCategory()).toBe('Gaming Laptops');
    expect(component.filteredProducts().every(p => p.category === 'Gaming Laptops')).toBe(true);
    expect(component.heading()).toBe('Gaming Laptops');
  });

  it('filters by brand (multiple) and shows chips for them', async () => {
    await setInputs({ brand: 'Apple,Samsung' });

    const result = component.filteredProducts();
    expect(result.length).toBeGreaterThan(0);
    expect(result.every(p => ['Apple', 'Samsung'].includes(p.brand))).toBe(true);
    expect(component.activeFilters().map(f => f.label)).toEqual(['Apple', 'Samsung']);
  });

  it('filters by price on the discounted price and swaps nothing silently', async () => {
    await setInputs({ min: '500', max: '1000' });

    const result = component.filteredProducts();
    expect(result.length).toBeGreaterThan(0);
    expect(result.every(p => finalPrice(p) >= 500 && finalPrice(p) <= 1000)).toBe(true);
  });

  it('filters by rating, stock and sale', async () => {
    await setInputs({ rating: '4', stock: '1', sale: '1' });

    const result = component.filteredProducts();
    expect(result.every(p => p.rating >= 4 && p.inStock && p.discount > 0)).toBe(true);
  });

  it('searches name, brand and category', async () => {
    await setInputs({ q: 'apple' });

    const result = component.filteredProducts();
    expect(result.length).toBeGreaterThan(0);
    expect(result.every(p => `${p.name} ${p.brand} ${p.category} ${p.shortDescription}`.toLowerCase().includes('apple'))).toBe(true);
  });

  it('sorts by price and by discount', async () => {
    await setInputs({ sort: '1' });
    const asc = component.filteredProducts().map(finalPrice);
    expect(asc).toEqual([...asc].sort((a, b) => a - b));

    await setInputs({ sort: '3' });
    const discounts = component.filteredProducts().map(p => p.discount);
    expect(discounts).toEqual([...discounts].sort((a, b) => b - a));
  });

  it('falls back to the default sort for an unknown value', async () => {
    await setInputs({ sort: '99' });

    expect(component.sortType()).toBe(0);
  });

  it('keeps brand options selectable and counts them without their own filter', async () => {
    await setInputs({ brand: 'Samsung' });

    const options = component.brandOptions();
    expect(options.find(o => o.name === 'Samsung')?.checked).toBe(true);
    // other brands are still offered, so the user can add them to the selection
    expect(options.length).toBeGreaterThan(1);
  });

  it('paginates and clamps an out-of-range page', async () => {
    expect(component.totalPages()).toBe(Math.ceil(store.products().length / 12));

    await setInputs({ page: '999' });
    expect(component.currentPage()).toBe(component.totalPages());

    await setInputs({ page: 'abc' });
    expect(component.currentPage()).toBe(1);
  });

  it('writes filter changes to the query string and resets to page 1', () => {
    component.toggleBrand('Apple');

    expect(navigate).toHaveBeenCalledWith([], {
      queryParams: { page: null, brand: 'Apple' },
      queryParamsHandling: 'merge',
    });
  });

  it('swaps min and max when they are entered the wrong way round', async () => {
    await setInputs({ max: '300' });

    component.setPrice('min', { target: { value: '900' } } as unknown as Event);

    expect(navigate).toHaveBeenCalledWith([], {
      queryParams: { page: null, min: '300', max: '900' },
      queryParamsHandling: 'merge',
    });
  });

  it('clears every facet filter but keeps the search', () => {
    component.clearFilters();

    const { queryParams } = navigate.mock.calls[0][1] as { queryParams: Record<string, unknown> };
    expect(queryParams).toEqual({
      page: null, brand: null, cat: null, min: null, max: null, rating: null, stock: null, sale: null,
    });
    expect('q' in queryParams).toBe(false);
  });
});
