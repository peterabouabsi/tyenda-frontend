import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerItemCommentsComponent } from './customer-item-comments.component';

describe('CustomerItemCommentsComponent', () => {
  let component: CustomerItemCommentsComponent;
  let fixture: ComponentFixture<CustomerItemCommentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerItemCommentsComponent]
    });
    fixture = TestBed.createComponent(CustomerItemCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
