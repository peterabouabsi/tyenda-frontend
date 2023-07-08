import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemEntryCardComponent } from './item-entry-card.component';

describe('ItemEntryCardComponent', () => {
  let component: ItemEntryCardComponent;
  let fixture: ComponentFixture<ItemEntryCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemEntryCardComponent]
    });
    fixture = TestBed.createComponent(ItemEntryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
