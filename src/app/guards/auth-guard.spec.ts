import { TestBed } from '@angular/core/testing';
import { provideRouter, Router, RouterStateSnapshot, ActivatedRouteSnapshot, UrlTree } from '@angular/router';
import { authGuard, checkoutGuard } from './auth-guard';
import { TechShopStore } from '../tech-shop-store';
import { AuthDialog } from '../services/auth-dialog';
import { Toaster } from '../services/toaster';
import { DEMO_ACCOUNT } from '../data/demo-account';

describe('route guards', () => {
  const authDialog = { openSignIn: vi.fn(), openSignUp: vi.fn() };
  const route = {} as ActivatedRouteSnapshot;
  const stateFor = (url: string) => ({ url }) as RouterStateSnapshot;

  let store: InstanceType<typeof TechShopStore>;

  beforeEach(() => {
    localStorage.clear();
    authDialog.openSignIn.mockClear();

    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: AuthDialog, useValue: authDialog },
        { provide: Toaster, useValue: { success: vi.fn(), error: vi.fn(), warning: vi.fn(), info: vi.fn() } },
      ],
    });
    store = TestBed.inject(TechShopStore);
  });

  const run = (guard: typeof authGuard, url: string) =>
    TestBed.runInInjectionContext(() => guard(route, stateFor(url)));

  it('redirects home and opens the sign-in dialog when signed out', () => {
    const result = run(authGuard, '/orders');

    expect(result).toBeInstanceOf(UrlTree);
    expect(TestBed.inject(Router).serializeUrl(result as UrlTree)).toBe('/');
    expect(authDialog.openSignIn).toHaveBeenCalledWith(false);
  });

  it('asks the dialog to continue to checkout after signing in', () => {
    run(authGuard, '/checkout');

    expect(authDialog.openSignIn).toHaveBeenCalledWith(true);
  });

  it('lets signed-in users through', () => {
    store.signIn({ email: DEMO_ACCOUNT.email, password: DEMO_ACCOUNT.password });

    expect(run(authGuard, '/orders')).toBe(true);
    expect(authDialog.openSignIn).not.toHaveBeenCalled();
  });

  it('sends signed-in users with an empty cart from checkout to the cart', () => {
    store.signIn({ email: DEMO_ACCOUNT.email, password: DEMO_ACCOUNT.password });

    const result = run(checkoutGuard, '/checkout');

    expect(TestBed.inject(Router).serializeUrl(result as UrlTree)).toBe('/cart');
  });

  it('allows checkout with a signed-in user and a non-empty cart', () => {
    store.signIn({ email: DEMO_ACCOUNT.email, password: DEMO_ACCOUNT.password });
    store.addToCart(store.products()[0]);

    expect(run(checkoutGuard, '/checkout')).toBe(true);
  });
});
