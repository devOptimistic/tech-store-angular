import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TechShopStore } from '../../tech-shop-store';
import { AddressForm } from '../../components/address-form/address-form';

@Component({
  selector: 'app-profile',
  imports: [RouterLink, AddressForm],
  templateUrl: './profile.html',
})
export default class Profile {
  store = inject(TechShopStore);
  showNewAddressForm = signal(false);
}
