import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreSignupComponent } from './store-signup.component';

describe('StoreSignupComponent', () => {
  let component: StoreSignupComponent;
  let fixture: ComponentFixture<StoreSignupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoreSignupComponent]
    });
    fixture = TestBed.createComponent(StoreSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
