import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MAX_COMPARE, TechShopStore } from './tech-shop-store';
import { Toaster } from './services/toaster';
import { AuthDialog } from './services/auth-dialog';
import { DEMO_ACCOUNT } from './data/demo-account';

const toaster = { success: vi.fn(), error: vi.fn(), warning: vi.fn(), info: vi.fn() };
const authDialog = { openSignIn: vi.fn(), openSignUp: vi.fn() };

describe('TechShopStore', () => {
  let store: InstanceType<typeof TechShopStore>;
  let router: Router;

  beforeEach(() => {
    localStorage.clear();
    Object.values(toaster).forEach(fn => fn.mockClear());
    Object.values(authDialog).forEach(fn => fn.mockClear());

    TestBed.configureTestingModule({
      providers: [
        { provide: Toaster, useValue: toaster },
        { provide: AuthDialog, useValue: authDialog },
      ],
    });
    store = TestBed.inject(TechShopStore);
    router = TestBed.inject(Router);
    vi.spyOn(router, 'navigate').mockResolvedValue(true);
  });

  const product = () => store.products()[0];
  const signInAsDemo = () =>
    store.signIn({ email: DEMO_ACCOUNT.email, password: DEMO_ACCOUNT.password });

  describe('cart', () => {
    it('adds a product and merges quantities for the same product', () => {
      store.addToCart(product(), 1);
      store.addToCart(product(), 2);

      expect(store.cartItems().length).toBe(1);
      expect(store.cartItems()[0].quantity).toBe(3);
      expect(store.cartItemsCount()).toBe(3);
    });

    it('removes a product', () => {
      store.addToCart(product());
      store.removeFromCart(product());

      expect(store.cartItems()).toEqual([]);
    });
  });

  describe('totals and promo codes', () => {
    beforeEach(() => store.addToCart(product(), 1));

    it('computes subtotal, item discount, tax and shipping', () => {
      const p = product();
      const t = store.totals();

      expect(t.subtotal).toBeCloseTo(p.price);
      expect(t.itemDiscount).toBeCloseTo((p.discount / 100) * p.price);
      expect(t.tax).toBeCloseTo(0.05 * p.price);
      expect(t.shipping).toBe(5.99); // standard delivery is the default
      expect(t.promoDiscount).toBe(0);
      expect(t.total).toBeCloseTo(t.subtotal + t.tax + t.shipping - t.itemDiscount);
    });

    it('applies a percent promo on the price after item discounts', () => {
      expect(store.applyPromo('save10')).toBe(true); // case-insensitive

      const t = store.totals();
      expect(t.promoDiscount).toBeCloseTo((t.subtotal - t.itemDiscount) * 0.1);
      expect(store.promo()?.code).toBe('SAVE10');
    });

    it('makes shipping free with FREESHIP', () => {
      store.applyPromo('FREESHIP');

      expect(store.totals().shipping).toBe(0);
    });

    it('rejects an invalid code and keeps totals unchanged', () => {
      const before = store.totals().total;

      expect(store.applyPromo('NOPE')).toBe(false);
      expect(toaster.error).toHaveBeenCalled();
      expect(store.totals().total).toBe(before);
    });

    it('removes an applied promo', () => {
      store.applyPromo('TECH20');
      store.removePromo();

      expect(store.promo()).toBeUndefined();
      expect(store.totals().promoDiscount).toBe(0);
    });
  });

  describe('authentication', () => {
    it('signs in with the demo account', () => {
      expect(signInAsDemo()).toBe(true);
      expect(store.user()?.email).toBe(DEMO_ACCOUNT.email);
      expect(store.user()).not.toHaveProperty('password');
    });

    it('rejects a wrong password', () => {
      const ok = store.signIn({ email: DEMO_ACCOUNT.email, password: 'wrong' });

      expect(ok).toBe(false);
      expect(store.user()).toBeUndefined();
      expect(toaster.error).toHaveBeenCalled();
    });

    it('rejects an unknown email', () => {
      expect(store.signIn({ email: 'nobody@example.com', password: 'secret1' })).toBe(false);
    });

    it('signs up a new user, then signs out and back in', () => {
      expect(store.signUp({ name: 'Ada', email: 'Ada@Example.com', password: 'secret1' })).toBe(true);
      expect(store.user()?.email).toBe('ada@example.com');
      expect(store.user()?.addresses).toEqual([]);

      store.signOut();
      expect(store.user()).toBeUndefined();

      expect(store.signIn({ email: 'ada@example.com', password: 'secret1' })).toBe(true);
    });

    it('rejects duplicate emails, including the demo account', () => {
      expect(store.signUp({ name: 'X', email: DEMO_ACCOUNT.email, password: 'secret1' })).toBe(false);

      store.signUp({ name: 'Ada', email: 'ada@example.com', password: 'secret1' });
      store.signOut();
      expect(store.signUp({ name: 'Ada 2', email: 'ada@example.com', password: 'secret2' })).toBe(false);
    });

    it('keeps address changes across sign-out / sign-in', () => {
      signInAsDemo();
      const countBefore = store.user()!.addresses.length;
      store.removeAddress(store.user()!.addresses[0].id);
      store.signOut();
      signInAsDemo();

      expect(store.user()!.addresses.length).toBe(countBefore - 1);
    });

    it('opens the sign-in dialog instead of checking out when signed out', () => {
      store.proceedToCheckout();

      expect(authDialog.openSignIn).toHaveBeenCalledWith(true);
      expect(router.navigate).not.toHaveBeenCalled();
    });
  });

  describe('addresses', () => {
    beforeEach(() => signInAsDemo());

    it('promotes another address to main when the main one is removed', () => {
      const main = store.user()!.addresses.find(a => a.isMain)!;
      store.removeAddress(main.id);

      const remaining = store.user()!.addresses;
      expect(remaining.some(a => a.id === main.id)).toBe(false);
      expect(remaining.filter(a => a.isMain).length).toBe(1);
    });
  });

  describe('placeOrder', () => {
    beforeEach(() => vi.useFakeTimers());
    afterEach(() => vi.useRealTimers());

    it('refuses to place an order when signed out', async () => {
      store.addToCart(product());
      await store.placeOrder();

      expect(store.orders()).toEqual([]);
      expect(toaster.error).toHaveBeenCalled();
    });

    it('saves the order with promo details, clears the cart and promo', async () => {
      signInAsDemo();
      store.addToCart(product(), 2);
      store.applyPromo('SAVE10');
      const expectedTotal = store.totals().total;

      const pending = store.placeOrder();
      await vi.advanceTimersByTimeAsync(1000);
      await pending;

      expect(store.orders().length).toBe(1);
      const order = store.orders()[0];
      expect(order.total).toBeCloseTo(expectedTotal);
      expect(order.promoCode).toBe('SAVE10');
      expect(order.promoDiscount).toBeGreaterThan(0);
      expect(order.userId).toBe(DEMO_ACCOUNT.id);
      expect(store.lastOrder()?.id).toBe(order.id);
      expect(store.userOrders().length).toBe(1);
      expect(store.cartItems()).toEqual([]);
      expect(store.promo()).toBeUndefined();
      expect(router.navigate).toHaveBeenCalledWith(['order-success']);
    });

    it('only lists orders belonging to the signed-in user', async () => {
      signInAsDemo();
      store.addToCart(product());
      const pending = store.placeOrder();
      await vi.advanceTimersByTimeAsync(1000);
      await pending;
      store.signOut();

      store.signUp({ name: 'Ada', email: 'ada@example.com', password: 'secret1' });

      expect(store.orders().length).toBe(1);
      expect(store.userOrders()).toEqual([]);
    });
  });

  describe('compare', () => {
    it('toggles products and caps the list', () => {
      const products = store.products();
      for (let i = 0; i < MAX_COMPARE; i++) store.toggleCompare(products[i]);
      expect(store.compareItems().length).toBe(MAX_COMPARE);

      store.toggleCompare(products[MAX_COMPARE]);
      expect(store.compareItems().length).toBe(MAX_COMPARE);
      expect(toaster.warning).toHaveBeenCalled();

      store.toggleCompare(products[0]);
      expect(store.compareItems().some(p => p.id === products[0].id)).toBe(false);

      store.clearCompare();
      expect(store.compareItems()).toEqual([]);
    });
  });

  describe('reviews', () => {
    it('requires a signed-in user', () => {
      const ok = store.addReview(product().id, { rating: 5, title: 'Great', comment: 'Love it' });

      expect(ok).toBe(false);
      expect(authDialog.openSignIn).toHaveBeenCalled();
      expect(store.userReviews()).toEqual([]);
    });

    it('adds the review to the product and recomputes rating and count', () => {
      signInAsDemo();
      const before = product();
      const sumBefore = before.rating * before.reviewCount;

      expect(store.addReview(before.id, { rating: 5, title: ' Great ', comment: ' Love it ' })).toBe(true);

      const after = store.products().find(p => p.id === before.id)!;
      expect(after.reviewCount).toBe(before.reviewCount + 1);
      expect(after.reviews.length).toBe(before.reviews.length + 1);
      expect(after.rating).toBeCloseTo((sumBefore + 5) / (before.reviewCount + 1), 1);

      const mine = after.reviews[after.reviews.length - 1];
      expect(mine.title).toBe('Great');
      expect(mine.userName).toBe(DEMO_ACCOUNT.name);
      expect(mine.reviewDate).toBeInstanceOf(Date);
    });

    it('does not touch other products', () => {
      signInAsDemo();
      store.addReview(product().id, { rating: 1, title: 'Meh', comment: 'Not great' });

      const other = store.products()[1];
      expect(other).toBe(store.baseProducts()[1]);
    });
  });

  describe('wishlist', () => {
    it('adds and removes products', () => {
      store.addToWishlist(product());
      expect(store.wishlistItemsCount()).toBe(1);

      store.removeFromWishlist(product());
      expect(store.wishlistItemsCount()).toBe(0);
    });
  });
});
