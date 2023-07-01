import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCustomerModerateCardComponent } from './item-customer-moderate-card.component';

describe('ItemCustomerModerateCardComponent', () => {
  let component: ItemCustomerModerateCardComponent;
  let fixture: ComponentFixture<ItemCustomerModerateCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemCustomerModerateCardComponent]
    });
    fixture = TestBed.createComponent(ItemCustomerModerateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
