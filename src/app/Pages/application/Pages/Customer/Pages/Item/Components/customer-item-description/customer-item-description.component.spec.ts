import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerItemDescriptionComponent } from './customer-item-description.component';

describe('CustomerItemDescriptionComponent', () => {
  let component: CustomerItemDescriptionComponent;
  let fixture: ComponentFixture<CustomerItemDescriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerItemDescriptionComponent]
    });
    fixture = TestBed.createComponent(CustomerItemDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
