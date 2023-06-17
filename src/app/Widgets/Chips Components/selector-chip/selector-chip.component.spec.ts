import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorChipComponent } from './selector-chip.component';

describe('SelectorChipComponent', () => {
  let component: SelectorChipComponent;
  let fixture: ComponentFixture<SelectorChipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectorChipComponent]
    });
    fixture = TestBed.createComponent(SelectorChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
