import { Component, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatIcon } from "@angular/material/icon";
import { MatIconButton } from '@angular/material/button';
import { SignInDialog } from '../sign-in-dialog/sign-in-dialog';
import { SignUpParams } from '../../models/user';
import { TechShopStore } from '../../tech-shop-store';

@Component({
  selector: 'app-sign-up-dialog',
  imports: [ReactiveFormsModule, MatIcon, MatIconButton, MatDialogClose],
  templateUrl: './sign-up-dialog.html',
  styleUrl: './sign-up-dialog.scss',
})
export class SignUpDialog {
  fb = inject(NonNullableFormBuilder);
  data = inject<{ checkout: boolean }>(MAT_DIALOG_DATA);
  passwordVisible = signal(false);
  store = inject(TechShopStore);
  #dialogRef = inject(MatDialogRef);

  dialog = inject(MatDialog);

  signUpForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  })

  signUp() {
    if (!this.signUpForm.valid) {
      this.signUpForm.markAllAsTouched();
      return;
    }

    const { name, email, password } = this.signUpForm.value as SignUpParams;
    this.store.signUp({ name, email, password, checkout: this.data?.checkout, dialogId: this.#dialogRef.id } as SignUpParams);
  }
  openSignUpDialog() {
    this.#dialogRef.close();
    this.dialog.open(SignInDialog, {
      disableClose: true,
      width: '450px',
      data: {
        checkout: this.data?.checkout ? this.data?.checkout : false
      }
    })
  }
}
