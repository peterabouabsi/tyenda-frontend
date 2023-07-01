import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCustomerBasicCardComponent } from './store-customer-basic-card.component';

describe('StoreCustomerBasicCardComponent', () => {
  let component: StoreCustomerBasicCardComponent;
  let fixture: ComponentFixture<StoreCustomerBasicCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoreCustomerBasicCardComponent]
    });
    fixture = TestBed.createComponent(StoreCustomerBasicCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
