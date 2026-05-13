import { Component, inject, signal } from '@angular/core';
import { TechShopStore } from '../../../tech-shop-store';
import { AddressForm } from "../../../components/address-form/address-form";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shipping-form',
  imports: [AddressForm, FormsModule],
  templateUrl: './shipping-form.html',
  styleUrl: './shipping-form.scss',
})
export class ShippingForm {
  store = inject(TechShopStore);
  showNewAddressForm = signal(false);
}
