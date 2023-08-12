import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersStoreComponent } from './orders-store.component';

describe('OrdersCustomerComponent', () => {
  let component: OrdersStoreComponent;
  let fixture: ComponentFixture<OrdersStoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrdersStoreComponent]
    });
    fixture = TestBed.createComponent(OrdersStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
