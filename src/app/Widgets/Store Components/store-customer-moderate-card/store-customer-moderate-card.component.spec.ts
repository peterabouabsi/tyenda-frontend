import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCustomerModerateCardComponent } from './store-customer-moderate-card.component';

describe('StoreModerateCardComponent', () => {
  let component: StoreCustomerModerateCardComponent;
  let fixture: ComponentFixture<StoreCustomerModerateCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoreCustomerModerateCardComponent]
    });
    fixture = TestBed.createComponent(StoreCustomerModerateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
