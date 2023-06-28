import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMultiBoxComponent } from './select-multi-box.component';

describe('SelectMultiBoxComponent', () => {
  let component: SelectMultiBoxComponent;
  let fixture: ComponentFixture<SelectMultiBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectMultiBoxComponent]
    });
    fixture = TestBed.createComponent(SelectMultiBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
