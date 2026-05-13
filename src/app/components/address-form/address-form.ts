import { Component, inject, output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { Toaster } from '../../services/toaster';
import { TechShopStore } from '../../tech-shop-store';
import { Address } from '../../models/user';

@Component({
  selector: 'app-address-form',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './address-form.html',
  styleUrl: './address-form.scss',
})
export class AddressForm {
  requestCancel = output();
  fb = inject(NonNullableFormBuilder);
  toaster = inject(Toaster);
  store = inject(TechShopStore);

  addressForm = this.fb.group({
    fullName: ['', Validators.required],
    phone: ['', Validators.required],
    streetAddress: ['', Validators.required],
    city: ['', Validators.required],
    postalCode: ['', Validators.required],
  })
  getRandomInt(min: number, max: number) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  }
  saveAddress() {
    if (!this.addressForm.valid) {
      this.toaster.error('Please fill all fields.')
      return;
    }
    const data: Address = { id: this.getRandomInt(2,1000), isMain: false, ...this.addressForm.getRawValue() };
    this.store.addAddress(data);
        console.log('addAddress called with:', data);

    // this.requestCancel.emit();
  }
}
