import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderNotesForm } from './order-notes-form';

describe('OrderNotesForm', () => {
  let component: OrderNotesForm;
  let fixture: ComponentFixture<OrderNotesForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderNotesForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderNotesForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
