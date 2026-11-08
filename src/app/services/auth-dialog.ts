import { inject, Injectable, Injector } from '@angular/core';

/**
 * Opens the sign-in / sign-up dialogs. The dialog code (and Angular Material's dialog)
 * is loaded on demand so it stays out of the initial bundle.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthDialog {
  #injector = inject(Injector);

  async openSignIn(checkout = false) {
    const [{ MatDialog }, { SignInDialog }] = await Promise.all([
      import('@angular/material/dialog'),
      import('../components/sign-in-dialog/sign-in-dialog'),
    ]);
    this.#injector.get(MatDialog).open(SignInDialog, {
      disableClose: true,
      width: '450px',
      data: { checkout },
    });
  }

  async openSignUp(checkout = false) {
    const [{ MatDialog }, { SignUpDialog }] = await Promise.all([
      import('@angular/material/dialog'),
      import('../components/sign-up-dialog/sign-up-dialog'),
    ]);
    this.#injector.get(MatDialog).open(SignUpDialog, {
      disableClose: true,
      width: '450px',
      data: { checkout },
    });
  }
}
