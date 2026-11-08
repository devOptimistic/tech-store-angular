import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TechShopStore } from '../tech-shop-store';
import { AuthDialog } from '../services/auth-dialog';

/** Allows the route only for signed-in users; otherwise opens the sign-in dialog. */
export const authGuard: CanActivateFn = (_route, state) => {
  const store = inject(TechShopStore);
  if (store.user()) return true;

  inject(AuthDialog).openSignIn(state.url.startsWith('/checkout'));
  return inject(Router).createUrlTree(['/']);
};

/** Checkout needs a signed-in user and a non-empty cart. */
export const checkoutGuard: CanActivateFn = (route, state) => {
  const store = inject(TechShopStore);
  const auth = authGuard(route, state);
  if (auth !== true) return auth;
  return store.cartItems().length > 0 ? true : inject(Router).createUrlTree(['/cart']);
};
