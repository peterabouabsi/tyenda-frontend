import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PriceRangeSelectComponent } from './price-range-select.component';

describe('PriceRangeSelectComponent', () => {
  let component: PriceRangeSelectComponent;
  let fixture: ComponentFixture<PriceRangeSelectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceRangeSelectComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(PriceRangeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
