import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCustomerBasicCardComponent } from './item-customer-basic-card.component';

describe('ItemCustomerBasicCardComponent', () => {
  let component: ItemCustomerBasicCardComponent;
  let fixture: ComponentFixture<ItemCustomerBasicCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemCustomerBasicCardComponent]
    });
    fixture = TestBed.createComponent(ItemCustomerBasicCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
