import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersCustomerComponent } from './orders-customer.component';

describe('OrdersCustomerComponent', () => {
  let component: OrdersCustomerComponent;
  let fixture: ComponentFixture<OrdersCustomerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrdersCustomerComponent]
    });
    fixture = TestBed.createComponent(OrdersCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
