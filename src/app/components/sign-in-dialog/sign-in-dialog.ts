import { Component, inject, input, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from "@angular/material/icon"
import { MatIconButton } from "@angular/material/button"
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { TechShopStore } from '../../tech-shop-store';
import { SignInParams } from '../../models/user';
import { SignUpDialog } from '../sign-up-dialog/sign-up-dialog';

@Component({
  selector: 'app-sign-in-dialog',
  imports: [ReactiveFormsModule, MatIcon, MatIconButton, MatDialogClose],
  templateUrl: './sign-in-dialog.html',
  styleUrl: './sign-in-dialog.scss',
})
export class SignInDialog {
  fb = inject(NonNullableFormBuilder);
  store = inject(TechShopStore);
  passwordVisible = signal(false);

  data = inject<{ checkout: boolean }>(MAT_DIALOG_DATA);

  #dialogRef = inject(MatDialogRef);

  dialog = inject(MatDialog);

  signInForm = this.fb.group({
    email: ['Mohammad@test.com', Validators.required],
    password: ['test123', Validators.required]
  })

  signIn() {
    if (!this.signInForm.valid) {
      this.signInForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.signInForm.value as SignInParams;
    this.store.signIn({ email, password, checkout: this.data?.checkout, dialogId: this.#dialogRef.id });
  }

  openSignUpDialog() {
    this.#dialogRef.close();
    this.dialog.open(SignUpDialog, {
      disableClose: true,
      width: '450px',
      data: {
        checkout:  this.data?.checkout? this.data?.checkout : false
      }
    })
  }
}
