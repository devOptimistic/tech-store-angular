import { Component, inject } from '@angular/core';
import { ShippingForm } from "./shipping-form/shipping-form";
import { ShippingMethod } from "./shipping-method/shipping-method";
import { PaymentForm } from "./payment-form/payment-form";
import { OrderNotesForm } from "./order-notes-form/order-notes-form";
import { SummarizeOrder } from "../../components/summarize-order/summarize-order";
import { TechShopStore } from '../../tech-shop-store';

@Component({
  selector: 'app-checkout',
  imports: [ShippingForm, ShippingMethod, PaymentForm, OrderNotesForm, SummarizeOrder],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export default class Checkout {
  store = inject(TechShopStore)
}
