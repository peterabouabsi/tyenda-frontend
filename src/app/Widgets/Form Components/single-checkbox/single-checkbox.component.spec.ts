import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCheckboxComponent } from './single-checkbox.component';

describe('SingleCheckboxComponent', () => {
  let component: SingleCheckboxComponent;
  let fixture: ComponentFixture<SingleCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleCheckboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
