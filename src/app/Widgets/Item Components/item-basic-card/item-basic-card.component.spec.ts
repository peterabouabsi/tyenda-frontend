import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemBasicCardComponent } from './item-basic-card.component';

describe('ItemBasicCardComponent', () => {
  let component: ItemBasicCardComponent;
  let fixture: ComponentFixture<ItemBasicCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemBasicCardComponent]
    });
    fixture = TestBed.createComponent(ItemBasicCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
