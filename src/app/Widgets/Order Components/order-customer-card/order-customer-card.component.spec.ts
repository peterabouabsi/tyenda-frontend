import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCustomerCardComponent } from './order-customer-card.component';

describe('OrderCustomerCardComponent', () => {
  let component: OrderCustomerCardComponent;
  let fixture: ComponentFixture<OrderCustomerCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderCustomerCardComponent]
    });
    fixture = TestBed.createComponent(OrderCustomerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
