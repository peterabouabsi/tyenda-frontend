import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerItemOrdersComponent } from './customer-item-orders.component';

describe('CustomerItemOrdersComponent', () => {
  let component: CustomerItemOrdersComponent;
  let fixture: ComponentFixture<CustomerItemOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerItemOrdersComponent]
    });
    fixture = TestBed.createComponent(CustomerItemOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
